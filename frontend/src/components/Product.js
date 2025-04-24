import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const Product = ({ product }) => {
  return (
    <Card className='my-3 p-3 rounded product-card shadow-lg'>
      {/* Product Image with Link */}
      <Link to={`/product/${product._id}`}>
        <Card.Img
          src={product.image}
          variant='top'
          className='product-image'
          alt={product.name}
        />
      </Link>

      <Card.Body className='d-flex flex-column'>
        {/* Product Title */}
        <Link to={`/product/${product._id}`} className='text-decoration-none'>
          <Card.Title as='div' className='product-title mb-2'>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        {/* Product Rating */}
        <Card.Text as='div' className='product-rating mb-2'>
          <Rating value={product.rating} text={`${product.numReviews} reviews`} />
        </Card.Text>

        {/* Price */}
        <Card.Text as='h3' className='product-price mb-3'>
          ${product.price}
        </Card.Text>

        {/* Category */}
        <Card.Text className='product-category text-muted mb-4'>
          <strong>Category:</strong> {product.category}
        </Card.Text>

        {/* Call-to-Action Button */}
        <Link
          to={`/product/${product._id}`}
          className='btn btn-primary w-100 rounded-pill mt-auto'
        >
          View Details
        </Link>
      </Card.Body>
    </Card>
  );
};

export default Product;
