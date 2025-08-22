import React, { useEffect } from 'react';

const PayNowButton = ({ requestId, budget, onPaymentSuccess }) => {
    useEffect(() => {
        // Check if the PayPal script is already loaded
        if (!document.getElementById('paypal-sdk')) {
            const script = document.createElement('script');
            script.src = `https://www.paypal.com/sdk/js?client-id=YOUR_PAYPAL_CLIENT_ID&currency=USD`;
            script.id = 'paypal-sdk';
            script.onload = () => initializePayPalButton();
            document.body.appendChild(script);
        } else {
            initializePayPalButton(); // Initialize if script already loaded
        }
    }, []);

    const initializePayPalButton = () => {
        if (window.paypal) {
            window.paypal.Buttons({
                createOrder: (data, actions) => {
                    return actions.order.create({
                        purchase_units: [{
                            amount: { value: budget.toString() },
                            description: `Payment for work request ${requestId}`
                        }]
                    });
                },
                onApprove: async (data, actions) => {
                    const order = await actions.order.capture();
                    // Call the backend to mark the request as 'Paid'
                    fetch(`http://127.0.0.1:5000/work_queries/${requestId}/pay`, {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ status: 'Paid' })
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (data.status === 'Paid') {
                            onPaymentSuccess(); // Call callback if payment was successful
                        } else {
                            alert(data.message || 'Failed to update payment status.');
                        }
                    })
                    .catch(error => {
                        console.error('Error updating payment status:', error);
                        alert('An error occurred while updating payment status.');
                    });
                },
                onError: (err) => {
                    console.error('Payment error:', err);
                    alert('Payment failed. Please try again.');
                }
            }).render('#paypal-button-container');
        }
    };

    return <div id="paypal-button-container"></div>;
};

export default PayNowButton;
