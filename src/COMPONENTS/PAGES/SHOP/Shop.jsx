// src/pages/ShopPage.jsx - Updated with video tutorials (YouTube embeds), wishlist feature (add/view/manage), enhanced zoom with slider
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, Modal, Form, Alert, InputGroup, Carousel, ListGroup, Image } from 'react-bootstrap';
import { FaShoppingCart, FaCreditCard, FaPlus, FaMinus, FaHeart, FaVideo, FaSearch, FaTimes, FaStar } from 'react-icons/fa';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'; // For zoom/pan
import ReactPlayer from 'react-player'; // Install: npm i react-player (for video embeds)
import { Elements, CardElement } from '@stripe/react-stripe-js'; // Import Elements and CardElement from Stripe
import { loadStripe } from '@stripe/stripe-js'; // Import Stripe loader
import './Shop.css'; // Custom styles
import { auth, db } from '../../../firebase';
import { 
  collection, onSnapshot, doc, updateDoc, arrayUnion, 
  setDoc 
} from 'firebase/firestore';




// Initialize Stripe - Replace with your actual publishable key
const stripePromise = loadStripe('pk_test_YOUR_PUBLISHABLE_KEY');

const Shop = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState([]); // Dynamic cart state
  const [wishlist, setWishlist] = useState([]); // Dynamic wishlist state
  const [products, setProducts] = useState([]); // Products from Firestore
  const [showCheckout, setShowCheckout] = useState(false); // Checkout modal
  const [showViewer, setShowViewer] = useState(false); // Image viewer modal
  const [showVideo, setShowVideo] = useState(false); // Video tutorial modal
  const [selectedProduct, setSelectedProduct] = useState(null); // Selected product for viewer/video
  //const [videoPlaying, setVideoPlaying] = useState(false); // Video player state
  //const videoPlayerRef = React.useRef(null); // Ref for video player
  const [formData, setFormData] = useState({ name: '', email: '', address: '', card: '' });
  const [submitStatus, setSubmitStatus] = useState({ loading: false, success: false, error: '' });
  const [quantities, setQuantities] = useState({}); // Quantity per product (before add)
  const [reviewForm, setReviewForm] = useState({ rating: 0, comment: '' }); // Review form state
  const [reviews, setReviews] = useState({}); // Dynamic reviews per product ID

 // 🔥 REAL-TIME PRODUCTS FROM FIRESTORE
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'products'), (snapshot) => {
      const prods = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(prods);
    });
    return () => unsubscribe();
  }, []);

  // 🔥 REAL-TIME USER CART & WISHLIST (from user document)
  useEffect(() => {
    if (!auth.currentUser) return;
    const userRef = doc(db, 'users', auth.currentUser.uid);
    
    const unsub = onSnapshot(userRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setCart(data.cart || []);
        setWishlist(data.wishlist || []);
      }
    });
    return () => unsub();
  }, []);

  // 🔥 REAL-TIME REVIEWS PER PRODUCT
  useEffect(() => {
    products.forEach(prod => {
      const reviewsRef = collection(db, 'products', prod.id, 'reviews');
      onSnapshot(reviewsRef, (snap) => {
        setReviews(prev => ({
          ...prev,
          [prod.id]: snap.docs.map(d => d.data())
        }));
      });
    });
  }, [products]);

  // Add to Cart (save to Firestore)
  const addToCart = async (product) => {
    if (!auth.currentUser) return alert("Please log in first");
    const userRef = doc(db, 'users', auth.currentUser.uid);
    await updateDoc(userRef, {
      cart: arrayUnion({ ...product, quantity: quantities[product.id] || 1 })
    });
  };

  // Update Cart Quantity
  const updateCartQuantity = async (productId, newQty) => {
    const userRef = doc(db, 'users', auth.currentUser.uid);
    const currentCart = cart.map(item => 
      item.id === productId ? { ...item, quantity: newQty } : item
    );
    await updateDoc(userRef, { cart: currentCart });
  };

  const removeFromCart = async (productId) => {
    const userRef = doc(db, 'users', auth.currentUser.uid);
    const updatedCart = cart.filter(item => item.id !== productId);
    await updateDoc(userRef, { cart: updatedCart });
  };

  // Wishlist
  const addToWishlist = async (product) => {
    if (!auth.currentUser) return;
    const userRef = doc(db, 'users', auth.currentUser.uid);
    await updateDoc(userRef, { wishlist: arrayUnion(product) });
  };

  const removeFromWishlist = async (id) => {
    const userRef = doc(db, 'users', auth.currentUser.uid);
    const updatedWishlist = wishlist.filter(item => item.id !== id);
    await updateDoc(userRef, { wishlist: updatedWishlist });
  };

  // Add Review (Firestore subcollection)
  const addReview = async (productId, review) => {
    if (!auth.currentUser) return;
    const reviewRef = doc(collection(db, 'products', productId, 'reviews'), auth.currentUser.uid);
    await setDoc(reviewRef, {
      rating: review.rating,
      comment: review.comment,
      userId: auth.currentUser.uid,
      timestamp: new Date()
    });
    setReviewForm({ rating: 0, comment: '' });
  };

  const getAverageRating = (id) => {
    const revs = reviews[id] || [];
    return revs.length ? (revs.reduce((sum, r) => sum + r.rating, 0) / revs.length).toFixed(1) : 'No reviews';
  };

  const filteredProducts = products.filter(p => 
    p && p.name && p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const cartTotal = cart.reduce((sum, item) => sum + (item.discountedPrice || item.price) * (item.quantity || 1), 0);

  // Open image viewer modal
  const openViewer = (product) => {
    setSelectedProduct(product);
    setShowViewer(true);
  };

  // Open video tutorial modal
  const openVideo = (product) => {
    setSelectedProduct(product);
    setShowVideo(true);
  };

  // Update product quantity before adding to cart
  const updateQuantity = (productId, newQty) => {
    const qty = parseInt(newQty) || 1;
    setQuantities(prev => ({ ...prev, [productId]: Math.max(1, qty) }));
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle checkout form submission
  const handleCheckoutSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus({ loading: true, success: false, error: '' });
    try {
      // Stripe payment processing would go here
      // For now, just show success message
      setSubmitStatus({ loading: false, success: true, error: '' });
      setCart([]); // Clear cart after successful payment
      setShowCheckout(false); // Close modal
      setFormData({ name: '', email: '', address: '', card: '' }); // Reset form
    } catch (err) {
      setSubmitStatus({ loading: false, success: false, error: err.message });
    }
  };

  return (
    <Container fluid className="py-5">
      {/* Search Bar */}
      <Row className="mb-4 animate-slide-up">
        <Col md={6} className="mx-auto">
          <Form className="d-flex">
            <Form.Control type="search" placeholder="Search products..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="me-2" />
            <Button variant="primary"><FaSearch /></Button>
          </Form>
        </Col>
        <Col md={2} className="text-end">
          <Button variant="outline-primary" onClick={() => setShowCheckout(true)} disabled={cart.length === 0} className="animate-bounce-in">
            <FaShoppingCart /> Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})
          </Button>
        </Col>
      </Row>

      {/* Product Grid */}
      <Row>
        {filteredProducts.map((prod, idx) => (
          <Col md={4} key={idx} className="mb-4 animate-zoom-in" style={{ animationDelay: `${0.2 * idx}s` }}>
            <Card className="shadow text-center">
              <Card.Img variant="top" src={prod.image} alt={prod.name} className="product-image cursor-pointer" onClick={() => openViewer(prod)} />
              <Card.Body>
                <h4 className="fw-bold text-primary">{prod.name}</h4>
                {prod.discountedPrice ? (
                  <p className="text-muted"><del>GH&#8373;{prod.originalPrice}</del> GH&#8373;{prod.discountedPrice} (Save {prod.save}%)</p>
                ) : (
                  <p className="text-muted">GH&#8373;{prod.price} </p>
                )}
                {prod.soldOut || prod.stock <= 0 ? (
                  <Badge bg="danger" className="mb-3">Sold Out</Badge>
                ) : (
                  <InputGroup className="mb-3 justify-content-center">
                    <Button variant="outline-secondary" onClick={() => updateQuantity(prod.id, (quantities[prod.id] || 1) - 1)} disabled={(quantities[prod.id] || 1) <= 1}><FaMinus /></Button>
                    <Form.Control value={quantities[prod.id] || 1} onChange={(e) => updateQuantity(prod.id, e.target.value)} className="text-center qty-input" type="number" min="1" max={prod.stock} />
                    <Button variant="outline-secondary" onClick={() => updateQuantity(prod.id, (quantities[prod.id] || 1) + 1)} disabled={(quantities[prod.id] || 1) >= prod.stock}><FaPlus /></Button>
                  </InputGroup>
                )}
                <Button variant={prod.soldOut || prod.stock <= 0 ? "secondary" : "primary"} disabled={prod.soldOut || prod.stock <= 0} onClick={() => addToCart(prod)} className="animate-bounce-in">
                  {prod.soldOut || prod.stock <= 0 ? 'Sold Out' : 'Add to Cart'}
                </Button>
                <Button variant="outline-secondary" className="ms-2" onClick={() => openVideo(prod)}><FaVideo /> Tutorial</Button>
                <Button variant="outline-danger" className="ms-2" onClick={() => addToWishlist(prod)}><FaHeart /></Button>
                {/* Reviews Section */}
                <div className="mt-3">
                  <h6>Reviews ({(reviews[prod.id] || []).length})</h6>
                  <Badge bg="warning" className="mb-2"><FaStar /> {getAverageRating(prod.id)}</Badge>
                  <ListGroup variant="flush" className="mb-3">
                    {(reviews[prod.id] || []).slice(0, 3).map((rev, rIdx) => (
                      <ListGroup.Item key={rIdx} className="p-1 small">
                        <Badge bg="secondary" className="me-2">{rev.rating} <FaStar /></Badge> {rev.comment}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                  <Form onSubmit={(e) => { e.preventDefault(); addReview(prod.id, reviewForm); }}>
                    <InputGroup className="mb-2">
                      <Form.Select value={reviewForm.rating} onChange={(e) => setReviewForm({ ...reviewForm, rating: parseInt(e.target.value) })}>
                        <option>Rate</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </Form.Select>
                      <Form.Control placeholder="Comment" value={reviewForm.comment} onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })} />
                      <Button type="submit" variant="primary" disabled={reviewForm.rating === 0 || !reviewForm.comment}>Submit</Button>
                    </InputGroup>
                  </Form>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>


      {/* Wishlist Section */}
      {wishlist.length > 0 && (
        <div className="mt-5 p-4 bg-light rounded">
          <h3 className="mb-4 text-primary">My Wishlist ({wishlist.length})</h3>
          <Row>
            {wishlist.map((item, idx) => (
              <Col md={4} key={idx} className="mb-3">
                <Card className="shadow-sm text-center">
                  <Card.Img variant="top" src={item.image} alt={item.name} className="product-image" />
                  <Card.Body>
                    <h5>{item.name}</h5>
                    <p className="text-muted">
                      {item.discountedPrice ? (
                        <>
                          <del>GH&#8373;{item.originalPrice}</del> GH&#8373;{item.discountedPrice}
                        </>
                      ) : (
                        `GH&#8373;${item.price}`
                      )}
                    </p>
                    <Button 
                      variant="outline-danger" 
                      size="sm"
                      onClick={() => removeFromWishlist(item.id)}
                      className="me-2"
                    >
                      <FaHeart /> Remove
                    </Button>
                    <Button 
                      variant="primary" 
                      size="sm"
                      onClick={() => addToCart(item)}
                      disabled={item.soldOut || item.stock <= 0}
                    >
                      Add to Cart
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      )}
      

      {/* Image Viewer Modal - Interactive Carousel with Zoom/Pan */}
      <Modal show={showViewer} onHide={() => setShowViewer(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedProduct?.name} - 360 View</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProduct && (
            <Carousel interval={null} className="angle-carousel" indicators={true} controls={true} onSelect={() => {}} keyboard={true} touch={true} pause="hover">
              {selectedProduct.angles.map((angle, idx) => (
                <Carousel.Item key={idx}>
                  <TransformWrapper initialScale={1} initialPositionX={0} initialPositionY={0} doubleClick={{ mode: "reset" }}>
                    {({ zoomIn, zoomOut, resetTransform, zoomToElement }) => (
                      <>
                        <div className="tools mb-2 text-center">
                          <Button variant="outline-secondary" size="sm" onClick={zoomIn} className="me-2"><FaPlus /></Button>
                          <Button variant="outline-secondary" size="sm" onClick={zoomOut} className="me-2"><FaMinus /></Button>
                          <Button variant="outline-secondary" size="sm" onClick={resetTransform} className="me-2"><FaTimes /></Button>
                          <input 
                            type="range" 
                            min="1" 
                            max="3" 
                            step="0.1" 
                            defaultValue="1" 
                            onChange={(e) => zoomToElement('img', { scale: parseFloat(e.target.value) })} 
                            className="d-inline-block w-25 ms-2" 
                            style={{ cursor: 'pointer' }}
                          /> {/* Zoom slider */}
                        </div>
                        <TransformComponent>
                          <Image src={angle} alt={`${selectedProduct.name} - Angle ${idx + 1}`} fluid className="d-block mx-auto animate-zoom-in" id="img" />
                        </TransformComponent>
                      </>
                    )}
                  </TransformWrapper>
                  <Carousel.Caption>
                    <p>Angle: {['360°', '190°', '180°', '270°', '280°'][idx]}</p>
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
            </Carousel>
          )}
        </Modal.Body>
      </Modal>

{/* Video Tutorial Modal */}
      <Modal show={showVideo} onHide={() => setShowVideo(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedProduct?.name} - Tutorial Video</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProduct && (
            <ReactPlayer url={selectedProduct.video} width="100%" height="400px" controls className="animate-fade-in" />
          )}
        </Modal.Body>
      </Modal>

      {/* Checkout Modal */}
      <Modal show={showCheckout} onHide={() => setShowCheckout(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Your Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {cart.length === 0 ? (
            <p className="text-center text-muted">Your cart is empty.</p>
          ) : (
            <>
              <ListGroup className="mb-4">
                {cart.map((item, idx) => (
                  <ListGroup.Item key={idx} className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6>{item.name}</h6>
                      <InputGroup size="sm" className="w-50">
                        <Button variant="outline-secondary" onClick={() => updateCartQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}><FaMinus /></Button>
                        <Form.Control value={item.quantity} onChange={(e) => updateCartQuantity(item.id, e.target.value)} className="text-center" type="number" min="1" max={item.stock + item.quantity} />
                        <Button variant="outline-secondary" onClick={() => updateCartQuantity(item.id, item.quantity + 1)} disabled={item.quantity >= item.stock + item.quantity}><FaPlus /></Button>
                      </InputGroup>
                    </div>
                    <div>
                      <Badge bg="primary">GH&#8373;{(item.discountedPrice || item.price) * item.quantity}</Badge>
                      <Button variant="link" className="text-danger ms-2" onClick={() => removeFromCart(item.id)}>Remove</Button>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <h5 className="text-end">Total: GH&#8373;{cartTotal}</h5>
              <Elements stripe={stripePromise}>
                <Form onSubmit={handleCheckoutSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control name="name" value={formData.name} onChange={handleChange} required />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Address</Form.Label>
                    <Form.Control name="address" value={formData.address} onChange={handleChange} required />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Card Details</Form.Label>
                    <CardElement className="p-3 border rounded" />
                  </Form.Group>
                  <Button variant="primary" type="submit" disabled={submitStatus.loading} className="w-100 animate-bounce-in">
                    <FaCreditCard className="me-2" /> {submitStatus.loading ? 'Processing...' : 'Pay Now'}
                  </Button>
                  {submitStatus.success && <Alert variant="success" className="mt-3">Payment successful! Thank you.</Alert>}
                  {submitStatus.error && <Alert variant="danger" className="mt-3">{submitStatus.error}</Alert>}
                </Form>
              </Elements>
            </>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Shop;