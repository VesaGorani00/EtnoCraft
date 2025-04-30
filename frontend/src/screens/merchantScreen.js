import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from '../components/Loader'; // Assuming you have a Loader component
import Message from '../components/Message'; // Assuming you have a Message component

const MerchantScreen = () => {
  const navigate = useNavigate();
  const [merchants, setMerchants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMerchants = async () => {
      try {
        const response = await axios.get('/api/users/merchants', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming JWT token stored in localStorage
          },
        });
        setMerchants(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load merchants');
        setLoading(false);
      }
    };

    fetchMerchants();
  }, []);

  const handleMerchantClick = (id) => {
    navigate(`/merchant/${id}`); // Redirect to merchant's detailed page
  };

  return (
    <div>
      <h1>Merchants</h1>
      {loading ? (
        <Loader /> // Show loading spinner while fetching merchants
      ) : error ? (
        <Message variant='danger'>{error}</Message> // Display error if any
      ) : (
        <div className='merchant-cards-container'>
          {merchants.length === 0 ? (
            <Message variant='info'>No merchants available</Message>
          ) : (
            merchants.map((merchant) => (
              <Card key={merchant._id} className='my-3 p-3 rounded product-card shadow-lg'>
                <Card.Body className='d-flex flex-column'>
                  <Card.Title as='div' className='mb-2'>
                    <strong>{merchant.name}</strong>
                  </Card.Title>
                  <Card.Text as='div' className='mb-3'>
                    Merchant ID: {merchant._id}
                  </Card.Text>
                  <Button
                    variant='primary'
                    onClick={() => handleMerchantClick(merchant._id)}
                  >
                    View Details
                  </Button>
                </Card.Body>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default MerchantScreen;
