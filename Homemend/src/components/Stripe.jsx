import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './Stripe.css';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate, useLocation } from 'react-router-dom';

const stripePromise = loadStripe('pk_test_51QK2TUENY7Kl45JDOBJqlVoFKCMpiXT9VEkpkmuC9Lgux21yOlMPSLVtJ9qH1xAIm7n0rrPlP8r2VCZ5O6LJHCuA00NJa09m8B');

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: '16px',
      color: '#424770',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#9e2146',
    },
  },
  hidePostalCode: true,
};

const CheckoutForm = ({ work_id, budget }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [amount, setAmount] = useState(budget);
  // const [userId, setUserId] = useState('');
  // const API_BASE_URL = 'http://localhost:5173';

  // useEffect(() => {
  //   const userId = localStorage.getItem('userEmail');
  //   setUserId(userId);
  //   setAmount(budget);
  // }, [budget]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      console.error("Stripe.js hasn't loaded yet.");
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      console.error("Card Element not found.");
      return;
    }

    const { error } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      console.error("Error creating payment method:", error.message);
      alert(`Payment error: ${error.message}`);
      return;
    }

    const paymentData = {
      work_id,
      transaction_type: "card",
      amount,
    };

    try {
      const response = await fetch(`http://127.0.0.1:5000/work_queries/${work_id}/pay`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });

      const result = await response.json();
      if (response.ok && result.status === 'Paid') {
        alert('Payment successfully!');
      } else {
        alert(result.message || 'Failed to update payment status.');
      }

      navigate('/addedRequests'); // Redirect after payment
    } catch (error) {
      console.error('Error updating payment status:', error);
      alert('An error occurred while updating payment status. Please try again.');
    }
  };

  return (
    <div style={{ paddingTop: '50px' }}>
      <div className="payment-form-container" style={{ padding: '20px', maxWidth: '500px', margin: 'auto', border: '1px solid #dcdcdc', borderRadius: '8px', backgroundColor: '#ffffff' }}>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="amount">
                <Form.Label>Amount</Form.Label>
                <Form.Control
                  type="number"
                  value={amount || 0}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Group controlId="cardDetails">
                <Form.Label>Card Details</Form.Label>
                <div style={{ padding: '10px', border: '1px solid #dcdcdc', borderRadius: '5px' }}>
                  <CardElement options={CARD_ELEMENT_OPTIONS} />
                </div>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Group controlId="country">
                <Form.Label>Country</Form.Label>
                <Form.Select>
                  <option>India</option>
                  <option>United States</option>
                  <option>United Kingdom</option>
                  <option>Canada</option>
                  <option>Australia</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Button variant="success" type="submit" style={{ width: '100%', marginTop: '20px' }}>
            Pay now
          </Button>
        </Form>
      </div>
    </div>
  );
};

CheckoutForm.propTypes = {
  work_id: PropTypes.number.isRequired,
  budget: PropTypes.number.isRequired,
};

const Stripe = () => {
  const location = useLocation();
  const { work_id, budget } = location.state || {};

  if (!work_id || !budget) {
    return <div>Missing data, please try again.</div>;
  }

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm work_id={work_id} budget={budget} />
    </Elements>
  );
};

export default Stripe;
