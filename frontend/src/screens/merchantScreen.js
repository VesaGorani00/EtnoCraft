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
import logo from "../assets/logo.png"


const MerchantScreen = () => {
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
 <Card className='my-3 p-3 rounded product-card shadow-lg'>
  {/* Static Product Image */}
  <Link to='/product/static-product-id'>
    <Card.Img
      src='https://via.placeholder.com/300x200.png?text=Static+Product'
      variant='top'
      className='product-image'
      alt='Static Product Name'
    />
  </Link>

  <Card.Body className='d-flex flex-column'>
    {/* Static Product Title */}
    <Link to='/product/static-product-id' className='text-decoration-none'>
      <Card.Title as='div' className='product-title mb-2'>
        <strong>Static Product Name</strong>
      </Card.Title>
    </Link>

    {/* Static Product Rating */}
    <Card.Text as='div' className='product-rating mb-2'>
      <Rating value={4} text='12 reviews' />
    </Card.Text>

    {/* Static Product Price */}
    <Card.Text as='h3' className='product-price mb-3'>
      $49.99
    </Card.Text>

    {/* Static Product Category */}
    <Card.Text className='product-category text-muted mb-4'>
      <strong>Category:</strong> Accessories
    </Card.Text>

    {/* Static Call-to-Action */}
    <Link to='/product/static-product-id' className='btn btn-primary w-100 rounded-pill mt-auto'>
      View Details
    </Link>
  </Card.Body>
</Card>




    </>
  );
};

export default MerchantScreen;
