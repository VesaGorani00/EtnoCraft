import React, { useState, useEffect } from "react";
import { Card, Button, Row, Col, Container } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";
import Message from "../components/Message";

const MerchantScreen = () => {
  const navigate = useNavigate();
  const [merchants, setMerchants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMerchants = async () => {
      try {
        const response = await axios.get("/api/users/merchants", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setMerchants(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load merchants");
        setLoading(false);
      }
    };

    fetchMerchants();
  }, []);

  return (
    <Container className="py-4">
      <h1 className="text-center mb-4">Merchants</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : merchants.length === 0 ? (
        <Message variant="info">No merchants available</Message>
      ) : (
        <Row className="g-4">
          {merchants.map((merchant) => (
            <Col key={merchant._id} sm={12} md={6} lg={4}>
              <Card className="my-3 p-3 rounded product-card shadow-lg h-100">
             

                <Card.Body className="d-flex flex-column">
              

                  {/* Merchant ID */}
                  <Card.Text className="text-muted small mb-2">
                    <strong>ID:</strong> {merchant._id}
                  </Card.Text>


                  {/* Call-to-Action */}
                  <Link
                    to={`/merchant/${merchant._id}/products`}
                    className="btn btn-primary w-100 rounded-pill mt-auto"
                  >
                    View Products
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default MerchantScreen;
