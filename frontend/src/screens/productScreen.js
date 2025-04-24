import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Form, Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Meta from '../components/Meta';
import { useGetProductDetailsQuery, useCreateReviewMutation } from '../slices/productsApiSlice';
import { addToCart } from '../slices/cartSlice';

const ProductScreen = () => {
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const { data: product, isLoading, error, refetch } = useGetProductDetailsQuery(productId);
  const [createReview, { isLoading: loadingProductReview }] = useCreateReviewMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate('/cart');
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createReview({ productId, rating, comment }).unwrap();
      refetch();
      toast.success('Review submitted');
      setRating(0);
      setComment('');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <Link className='btn btn-outline-primary my-3 rounded-pill' to='/'>
        &larr; Back to Products
      </Link>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error?.data?.message || error.error}</Message>
      ) : (
        <>
          <Meta title={product.name} />

          {/* Product Main Area */}
          <Row className='g-4'>
            {/* Product Image */}
            <Col lg={6} sm={12}>
              <Card className='border-0 shadow-sm rounded'>
                <Image src={product.image} alt={product.name} fluid className='rounded-top' />
              </Card>
            </Col>

            {/* Product Info */}
            <Col lg={6} sm={12}>
              <Card className='border-0 shadow-sm rounded p-4'>
                <Card.Body>
                  <h1 className='fw-bold'>{product.name}</h1>

                  <div className='my-3'>
                    <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                  </div>

                  <h4 className='text-success fw-semibold my-2'>${product.price}</h4>

                  <ListGroup variant='flush' className='my-3'>
                    <ListGroup.Item className='py-2'>
                      <strong>Category:</strong> {product.category}
                    </ListGroup.Item>
                    <ListGroup.Item className='py-2'>
                      <strong>Brand:</strong> {product.brand}
                    </ListGroup.Item>
                    <ListGroup.Item className='py-2'>
                      <strong>Status:</strong>{' '}
                      <span className={`badge ${product.countInStock > 0 ? 'bg-success' : 'bg-danger'}`}>
                        {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </ListGroup.Item>
                  </ListGroup>

                  {product.countInStock > 0 && (
                    <ListGroup className='mb-3'>
                      <ListGroup.Item className='py-2'>
                        <Row className='align-items-center'>
                          <Col>Qty</Col>
                          <Col>
                            <Form.Control
                              as='select'
                              value={qty}
                              onChange={(e) => setQty(Number(e.target.value))}
                            >
                              {[...Array(product.countInStock).keys()].map((x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              ))}
                            </Form.Control>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    </ListGroup>
                  )}

                  <Button
                    className='btn-primary rounded-pill w-100'
                    type='button'
                    disabled={product.countInStock === 0}
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Description */}
          <Row className='g-4 mt-4'>
            <Col md={12}>
              <Card className='border-0 shadow-sm rounded p-4'>
                <h3>Description</h3>
                <p className='mt-3'>{product.description}</p>
              </Card>
            </Col>
          </Row>

          {/* Reviews */}
          <Row className='g-4 mt-4'>
            <Col md={12}>
              <Card className='border-0 shadow-sm rounded p-4'>
                <h3>Customer Reviews</h3>

                {product.reviews.length === 0 && <Message>No reviews yet</Message>}

                <ListGroup variant='flush' className='my-1'>
                  {product.reviews.map((review) => (
                    <ListGroup.Item key={review._id} className='mb-1'>
                      <strong>{review.name}</strong>
                      <Rating value={review.rating} />
                      <p className='text-muted'>{review.createdAt.substring(0, 10)}</p>
                      <p>{review.comment}</p>
                    </ListGroup.Item>
                  ))}

                  <ListGroup.Item>
                    <h4 >Write a Review</h4>
                    {loadingProductReview && <Loader />}

                    {userInfo ? (
                      <Form onSubmit={submitHandler}>
                        <Form.Group controlId='rating' className='my-1'>
                          <Form.Label>Rating</Form.Label>
                          <Form.Control
                            as='select'
                            value={rating}
                            onChange={(e) => setRating(Number(e.target.value))}
                          >
                            <option value=''>Select...</option>
                            <option value='1'>1 - Poor</option>
                            <option value='2'>2 - Fair</option>
                            <option value='3'>3 - Good</option>
                            <option value='4'>4 - Very Good</option>
                            <option value='5'>5 - Excellent</option>
                          </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='comment' className='my-2'>
                          <Form.Label>Comment</Form.Label>
                          <Form.Control
                            as='textarea'
                            rows='3'
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          ></Form.Control>
                        </Form.Group>

                        <Button
                          disabled={loadingProductReview}
                          type='submit'
                          variant='primary'
                          className='rounded-pill mt-3'
                        >
                          Submit Review
                        </Button>
                      </Form>
                    ) : (
                      <Message>
                        Please <Link to='/login'>sign in</Link> to write a review
                      </Message>
                    )}
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;
