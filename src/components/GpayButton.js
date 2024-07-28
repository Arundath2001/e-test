// src/GPayButton.js
import React, { useEffect } from 'react';
import axios from 'axios';

const GPayButton = () => {
  useEffect(() => {
    const paymentsClient = new window.google.payments.api.PaymentsClient({
      environment: 'TEST' // Change to 'PRODUCTION' for live environment
    });

    const baseRequest = {
      apiVersion: 2,
      apiVersionMinor: 0
    };

    const allowedPaymentMethods = [
      {
        type: 'CARD',
        parameters: {
          allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
          allowedCardNetworks: ['AMEX', 'DISCOVER', 'JCB', 'MASTERCARD', 'VISA']
        },
        tokenizationSpecification: {
          type: 'PAYMENT_GATEWAY',
          parameters: {
            gateway: 'example', // Update with your gateway
            gatewayMerchantId: 'exampleGatewayMerchantId' // Update with your gateway merchant ID
          }
        }
      }
    ];

    const isReadyToPayRequest = Object.assign({}, baseRequest, {
      allowedPaymentMethods: allowedPaymentMethods
    });

    paymentsClient.isReadyToPay(isReadyToPayRequest)
      .then(function(response) {
        if (response.result) {
          createAndAddButton();
        } else {
          console.error('Unable to pay using Google Pay');
        }
      })
      .catch(function(err) {
        console.error('Error checking readiness to use Google Pay: ', err);
      });

    function createAndAddButton() {
      const button = paymentsClient.createButton({
        onClick: onGooglePayButtonClicked
      });
      document.getElementById('gpay-button').appendChild(button);
    }

    function onGooglePayButtonClicked() {
      const paymentDataRequest = Object.assign({}, baseRequest, {
        allowedPaymentMethods: allowedPaymentMethods,
        transactionInfo: {
          totalPriceStatus: 'FINAL',
          totalPrice: '10.00', // Price of the product
          currencyCode: 'USD'
        },
        merchantInfo: {
          merchantName: 'Example Merchant'
        }
      });

      paymentsClient.loadPaymentData(paymentDataRequest)
        .then(function(paymentData) {
          processPayment(paymentData);
        })
        .catch(function(err) {
          console.error('Error loading payment data: ', err);
        });
    }

    function processPayment(paymentData) {
      axios.post('http://localhost:5000/api/payment', paymentData)
        .then(response => {
          console.log('Payment successful: ', response.data);
        })
        .catch(error => {
          console.error('Error processing payment: ', error);
        });
    }
  }, []);

  return <div id="gpay-button"></div>;
};

export default GPayButton;
