import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import Product from '../components/Product.js'
import Loader from '../components/Loader.js'
import Message from '../components/Message.js'
import Paginate from '../components/Paginate.js'
// import ProductCarousel from '../components/ProductCarousel.js'
import { useGetProductsQuery } from '../slices/productsApiSlice.js'


const Home = () => {
  const { pageNumber, keyword } = useParams();

  const{ data, isLoading, error } = useGetProductsQuery({ keyword,pageNumber });
  return (
    <>
      {keyword && (
        <Link to='/' className='btn btn-light mb-4'>
          Go Back
        </Link>
      )}

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error?.data?.message || error.error}</Message>
      ) : (
        <>
          <h1 className='mt-5'>Latest Products</h1>
          <Row>
            {data.products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate pages={data.pages} page={data.page} keyword={keyword ? keyword : ""} />
        </>
      )}
    </>
  );

};

export default Home
