// src/pages/ShopPage.jsx - Updated to handle axios errors gracefully (no crash on add to cart), local stock management if backend fails
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, Modal, Form, Alert, InputGroup, ListGroup } from 'react-bootstrap';
import { FaShoppingCart, FaCreditCard, FaPlus, FaMinus, FaSearch } from 'react-icons/fa';
import { loadStripe } from '@stripe/stripe-js'; // Install: npm i @stripe/stripe-js @stripe/react-stripe-js
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios'; // For backend calls (payment intent, stock update)
import './Shop.css'; // Custom styles
import TB from '../../Images/bestcoach-pictures/IMG_2906.png'

const stripePromise = loadStripe('your-publishable-key'); // Replace with your Stripe PK

const Shop = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState([]); // Dynamic cart state
  const [showCheckout, setShowCheckout] = useState(false); // Checkout modal
  const [formData, setFormData] = useState({ name: '', email: '', address: '', card: '' });
  const [submitStatus, setSubmitStatus] = useState({ loading: false, success: false, error: '' });
  const [quantities, setQuantities] = useState({}); // Quantity per product (before add)
  const [products, setProducts] = useState([ // Dynamic products with stock
    { id: 1, name: 'The Bestcoachmusics Digital Deal', image: TB, originalPrice: 1205, discountedPrice: 240, save: 80, stock: 0, soldOut: true },
    { id: 2, name: 'The Singers Sanctuary  Deal', image: TB, originalPrice: 389, discountedPrice: 240, save: 38, stock: 5, soldOut: false },
    { id: 3, name: 'The Music Mentorship Experience Deal', image: TB, originalPrice: 489, discountedPrice: 240, save: 51, stock: 10, soldOut: false },
    { id: 4, name: '30-Day Independence', image: TB, price: 127, stock: 0, soldOut: true },
    // Add more products with images/stock
  ]);

  // Load products/cart from backend (dynamic stock)
  useEffect(() => {
    axios.get('/api/products').then(res => setProducts(res.data)).catch(() => {}); // Fetch real stock
    // Load cart similarly
  }, []);

  const updateQuantity = (id, value) => {
    const prod = products.find(p => p.id === id);
    const qty = Math.max(1, Math.min(parseInt(value) || 1, prod.stock)); // Validate: integer, 1 <= qty <= stock
    setQuantities((prev) => ({ ...prev, [id]: qty }));
  };

  const addToCart = async (product) => {
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

      // Update stock on backend with error handling
      try {
        await axios.post('/api/update-stock', { id: product.id, qty });
      } catch (err) {
        console.error('Stock update failed:', err); // Log error, but continue
        // Optional: Alert user or fallback to local update only
      } finally {
        setProducts((prev) => prev.map(p => p.id === product.id ? { ...p, stock: p.stock - qty } : p)); // Local update always
      }
    }
  };

  const updateCartQuantity = async (id, value) => {
    const prod = products.find(p => p.id === id);
    const qty = Math.max(1, Math.min(parseInt(value) || 1, prod.stock + (cart.find(item => item.id === id)?.quantity || 0))); // Validate with available stock
    const diff = qty - (cart.find(item => item.id === id)?.quantity || 0);

    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: qty } : item
      )
    );

    // Update stock on backend with error handling
    try {
      await axios.post('/api/update-stock', { id, qty: -diff });
    } catch (err) {
      console.error('Stock update failed:', err);
    } finally {
      setProducts((prev) => prev.map(p => p.id === id ? { ...p, stock: p.stock - diff } : p)); // Local update always
    }
  };

  const removeFromCart = async (id) => {
    const item = cart.find(i => i.id === id);
    if (item) {
      try {
        await axios.post('/api/update-stock', { id, qty: item.quantity }); // Restore stock
      } catch (err) {
        console.error('Stock restore failed:', err);
      } finally {
        setProducts((prev) => prev.map(p => p.id === id ? { ...p, stock: p.stock + item.quantity } : p)); // Local restore
        setCart((prev) => prev.filter((item) => item.id !== id));
      }
    }
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
              <Card.Img variant="top" src={prod.image} alt={prod.name} className="product-image" />
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
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Checkout Modal with Stripe */}
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
                <CheckoutForm formData={formData} handleChange={handleChange} submitStatus={submitStatus} setSubmitStatus={setSubmitStatus} cartTotal={cartTotal} setCart={setCart} setShowCheckout={setShowCheckout} />
              </Elements>
            </>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

// Separate CheckoutForm component for Stripe
const CheckoutForm = ({ formData, handleChange, submitStatus, setSubmitStatus, cartTotal, setCart, setShowCheckout }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus({ loading: true, success: false, error: '' });
    try {
      const { data: { clientSecret } } = await axios.post('/api/create-payment-intent', { amount: cartTotal * 100 }); // Amount in cents
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: formData.name,
            email: formData.email,
            address: { line1: formData.address },
          },
        },
      });
      if (result.error) {
        setSubmitStatus({ loading: false, success: false, error: result.error.message });
      } else if (result.paymentIntent.status === 'succeeded') {
        setSubmitStatus({ loading: false, success: true, error: '' });
        setCart([]); // Clear cart
        setTimeout(() => setShowCheckout(false), 2000);
      }
    } catch (err) {
      setSubmitStatus({ loading: false, success: false, error: 'Payment failed' });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
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
        {submitStatus.loading ? 'Processing...' : 'Pay Now'}
      </Button>
      {submitStatus.success && <Alert variant="success" className="mt-3">Payment successful! Thank you.</Alert>}
      {submitStatus.error && <Alert variant="danger" className="mt-3">{submitStatus.error}</Alert>}
    </Form>
  );
};

export default Shop;