import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Row, Col, Card, Button, Spinner, Container } from 'react-bootstrap';
import { toast } from 'react-toastify';

const MerchantProductScreen = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMerchantProducts = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/api/products/merchant/${id}`);
        setProducts(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error('Failed to fetch products');
      }
    };

    fetchMerchantProducts();
  }, [id]);

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <h2 className="text-center mb-4">Merchant Products</h2>
      <Row className="g-4">
        {products.length > 0 ? (
          products.map((product) => (
            <Col sm={12} md={6} lg={4} key={product._id}>
              <Card className="my-3 p-3 rounded product-card shadow-lg h-100">
                {/* Product Image */}
                <Link to={`/product/${product._id}`}>
                  <Card.Img
                    src={product.image || "/images/default-product.jpg"}
                    variant="top"
                    className="product-image"
                    alt={product.name}
                  />
                </Link>

                <Card.Body className="d-flex flex-column">
                  {/* Product Name */}
                  <Link to={`/product/${product._id}`} className="text-decoration-none">
                    <Card.Title as="div" className="product-title mb-2">
                      <strong>{product.name}</strong>
                    </Card.Title>
                  </Link>

                  {/* Price */}
                  <Card.Text as="h5" className="product-price mb-3">
                    ${product.price}
                  </Card.Text>

                  {/* Category (if available) */}
                  {product.category && (
                    <Card.Text className="text-muted small mb-4">
                      <strong>Category:</strong> {product.category}
                    </Card.Text>
                  )}

                  {/* Button */}
                  <Link
                    to={`/product/${product._id}`}
                    className="btn btn-primary w-100 rounded-pill mt-auto"
                  >
                    View Details
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <h5 className="text-muted text-center">No products found for this merchant</h5>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default MerchantProductScreen;
