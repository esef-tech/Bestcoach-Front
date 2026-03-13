// src/pages/ShopPage.jsx - Updated with video tutorials (YouTube embeds), wishlist feature (add/view/manage), enhanced zoom with slider
import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Badge, Modal, Form, Alert, InputGroup, Carousel, ListGroup, Image } from 'react-bootstrap';
import { FaShoppingCart, FaCreditCard, FaPlus, FaMinus, FaHeart, FaVideo, FaSearch, FaTimes } from 'react-icons/fa';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'; // For zoom/pan
import ReactPlayer from 'react-player'; // Install: npm i react-player (for video embeds)
import { Elements, CardElement } from '@stripe/react-stripe-js'; // Import Elements and CardElement from Stripe
import { loadStripe } from '@stripe/stripe-js'; // Import Stripe loader
import './Shop.css'; // Custom styles
import JP from '../../Images/bestcoach-pictures/IMG_2906.png'
import MV from '../../Images/bestcoach-pictures/mov_bbb.mp4'

// Initialize Stripe - Replace with your actual publishable key
const stripePromise = loadStripe('pk_test_YOUR_PUBLISHABLE_KEY');

const Shop = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState([]); // Dynamic cart state
  const [wishlist, setWishlist] = useState([]); // Dynamic wishlist state
  const [showCheckout, setShowCheckout] = useState(false); // Checkout modal
  const [showViewer, setShowViewer] = useState(false); // Image viewer modal
  const [showVideo, setShowVideo] = useState(false); // Video tutorial modal
  const [selectedProduct, setSelectedProduct] = useState(null); // Selected product for viewer/video
  const [videoPlaying, setVideoPlaying] = useState(false); // Video player state
  const videoPlayerRef = React.useRef(null); // Ref for video player
  const [formData, setFormData] = useState({ name: '', email: '', address: '', card: '' });
  const [submitStatus, setSubmitStatus] = useState({ loading: false, success: false, error: '' });
  const [quantities, setQuantities] = useState({}); // Quantity per product (before add)
  const [products, setProducts] = useState([ // Dynamic products with state management
    { 
      id: 1, 
      name: 'The Bestcoach Music Digital Deal', 
      image: JP, // Main image
      angles: [
        JP,
        JP,
        JP,
        JP,
        JP,
      ],
      video: MV, // YouTube URL (not embed)
      originalPrice: 1205, 
      discountedPrice: 240, 
      save: 80, 
      stock: 0, 
      soldOut: true 
    },
    { 
      id: 2, 
      name: 'The Singers Sanctuary Deal', 
      image: JP,
      angles: [
        JP,
        JP,
        JP,
        JP,
        JP,
      ],
      video: MV,
      originalPrice: 389, 
      discountedPrice: 240, 
      save: 38, 
      stock: 5, 
      soldOut: false 
    },
    { 
      id: 3, 
      name: 'The Music Mentorship Experience', 
      image: JP,
      angles: [
       JP,
        JP,
        JP,
        JP,
        JP,
      ],
      video: MV,
      originalPrice: 489, 
      discountedPrice: 240, 
      save: 51, 
      stock: 10, 
      soldOut: false 
    },
    { 
      id: 4, 
      name: '30-Day Independence', 
      image:  JP,
      angles: [
        JP,
        JP,
        JP,
        JP,
        JP,
      ],
      video: MV,
      price: 127, 
      stock: 0, 
      soldOut: true 
    },
    // Add more products with angles/video
  ]);

  const updateQuantity = (id, value) => {
    const prod = products.find(p => p.id === id);
    const qty = Math.max(1, Math.min(parseInt(value) || 1, prod.stock)); // Validate: integer, 1 <= qty <= stock
    setQuantities((prev) => ({ ...prev, [id]: qty }));
  };

  const addToCart = (product) => {
    if (!product.soldOut && product.stock > 0) {
      const qty = quantities[product.id] || 1;
      if (qty > product.stock) return; // Validation

      setCart((prev) => {
        const existing = prev.find((item) => item.id === product.id);
        if (existing) {
          return prev.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + qty } : item
          );
        }
        return [...prev, { ...product, quantity: qty }];
      });
      setQuantities((prev) => ({ ...prev, [product.id]: 1 })); // Reset
      setProducts((prev) => prev.map(p => p.id === product.id ? { ...p, stock: p.stock - qty } : p)); // Local stock update
    }
  };

  const updateCartQuantity = (id, value) => {
    const prod = products.find(p => p.id === id);
    const qty = Math.max(1, Math.min(parseInt(value) || 1, prod.stock + (cart.find(item => item.id === id)?.quantity || 0))); // Validate with available stock
    const diff = qty - (cart.find(item => item.id === id)?.quantity || 0);

    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: qty } : item
      )
    );
    setProducts((prev) => prev.map(p => p.id === id ? { ...p, stock: p.stock - diff } : p)); // Local stock update
  };

  const removeFromCart = (id) => {
    const item = cart.find(i => i.id === id);
    if (item) {
      setProducts((prev) => prev.map(p => p.id === id ? { ...p, stock: p.stock + item.quantity } : p)); // Restore stock
      setCart((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const addToWishlist = (product) => {
    if (!wishlist.find(item => item.id === product.id)) {
      setWishlist((prev) => [...prev, product]);
    }
  };

  const removeFromWishlist = (id) => {
    setWishlist((prev) => prev.filter(item => item.id !== id));
  };

  const openViewer = (product) => {
    setSelectedProduct(product);
    setShowViewer(true);
  };

  const openVideo = (product) => {
    setSelectedProduct(product);
    setVideoPlaying(false); // Reset first
    setShowVideo(true);
    // Delay to allow modal to render first
    setTimeout(() => setVideoPlaying(true), 300);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckoutSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus({ loading: true, success: false, error: '' });
    // Mock payment - replace with Stripe/PayPal API
    setTimeout(() => {
      setSubmitStatus({ loading: false, success: true, error: '' });
      setCart([]); // Clear cart on success
      setTimeout(() => setShowCheckout(false), 2000);
    }, 1500);
  };

  // Filter products based on search
  const filteredProducts = products.filter(prod => prod.name.toLowerCase().includes(searchQuery.toLowerCase()));

  // Cart total
  const cartTotal = cart.reduce((sum, item) => sum + (item.discountedPrice || item.price) * item.quantity, 0);

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
      <Modal show={showVideo} onHide={() => {
        setShowVideo(false);
        setVideoPlaying(false);
        setSelectedProduct(null);
      }} size="lg" centered backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>{selectedProduct?.name} - Tutorial Video</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex justify-content-center bg-dark p-0" style={{ minHeight: '450px' }}>
          {selectedProduct && showVideo && (
            <div className="video-container w-100" style={{ maxWidth: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ReactPlayer
                ref={videoPlayerRef}
                url={selectedProduct.video}
                playing={videoPlaying}
                controls={true}
                width="100%"
                height="400px"
                onStart={() => console.log('Video started playing')}
                onPlay={() => console.log('Video is playing')}
                onError={(error) => {
                  console.error('Video error:', error);
                }}
                config={{
                  file: {
                    attributes: {
                      controlsList: 'nodownload',
                      crossOrigin: 'anonymous'
                    }
                  }
                }}
              />
            </div>
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