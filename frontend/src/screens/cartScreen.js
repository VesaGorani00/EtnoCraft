import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Image, Form, Button, Card, ListGroupItem } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import Message from '../components/Message.js';
import { addToCart, removeFromCart } from '../slices/cartSlice.js';

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = async (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = async (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping');
  };

  return (
    <Row className="my-4">
      <Col md={8}>
        <Card className="shadow-sm p-4 rounded-4">
          <h2 className="fw-bold mb-4">Shopping Cart</h2>
          {cartItems.length === 0 ? (
            <Message>
              Your cart is empty <Link to="/">Go Back</Link>
            </Message>
          ) : (
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <ListGroupItem key={item._id} className="border-0">
                  <Row className="align-items-center">
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={4}>
                      <Link to={`/product/${item._id}`} className="fw-semibold">
                        {item.name}
                      </Link>
                    </Col>
                    <Col md={2}>${item.price}</Col>
                    <Col md={2}>
                      <Form.Control
                        as="select"
                        value={item.qty}
                        onChange={(e) => addToCartHandler(item, Number(e.target.value))}
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col md={2}>
                      <Button
                        type="button"
                        variant="light"
                        className="text-danger border-0"
                        onClick={() => removeFromCartHandler(item._id)}
                      >
                        <FaTrash />
                      </Button>
                    </Col>
                  </Row>
                </ListGroupItem>
              ))}
            </ListGroup>
          )}
        </Card>
      </Col>

      <Col md={4}>
        <Card className="shadow-sm p-4 rounded-4">
          <ListGroup variant="flush">
            <ListGroupItem className="border-0">
              <h4 className="fw-bold">
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
              </h4>
              <p className="fs-5 fw-semibold text-success">
                ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
              </p>
            </ListGroupItem>
            <ListGroupItem className="border-0">
              <Button
                type="button"
                className="btn-block w-100 btn-primary rounded-pill fw-semibold"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed to Checkout
              </Button>
            </ListGroupItem>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
