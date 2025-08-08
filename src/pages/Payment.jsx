import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react'
import CheckoutForm from './CheckoutForm';
const stripePromise = loadStripe('pk_test_51Ro2bJRtTYL8fDnUXfd3Dt6X3x5N0qH2doAHUn1D03ulSKnvWsAKCKNHlG47IfDVkMXL7eVkn3GHvw3xTTbuf41D00FahI5EYT');
export default function Payment() {
  return (
     <Elements stripe={stripePromise}>
      <CheckoutForm></CheckoutForm>
    </Elements>
  )
}
