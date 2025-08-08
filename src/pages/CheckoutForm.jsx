import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";

export default function CheckoutForm() {
  const stripe = useStripe();
  const { user } = useAuth();
  const navigate = useNavigate();
  const elements = useElements();
  const [errorMsg, setErrorMsg] = useState("");
  const { id } = useParams(); // Get package ID from URL

  // Fetch package data with TanStack Query
  const {
    data: pkg,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["package", id],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://travelserver-three.vercel.app/package/${id}`
      );
      return data;
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setErrorMsg(error.message);
      return;
    }

    setErrorMsg("");
    console.log("[PaymentMethod Created]", paymentMethod);

    try {
      // You should replace with user's real email & bookingId
      const email = user.email; // You may get from auth context
      const bookingId = pkg._id; // Assuming package ID is your booking ID
      const price = pkg.price * 100;

      const response = await axios.post(
        "https://travelserver-three.vercel.app/create-checkout-session",
        {
          price: price,
          email,
          bookingId,
        }
      );

      const sessionId = response.data.id;
      console.log(sessionId);
      const clientSecret = response.data.clientSecret;
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: user.displayName,
            email: user.email,
          },
        },
      });

      if (result.error) {
        setErrorMsg(result.error.message);
      } else {
        setErrorMsg("");
        if (result.paymentIntent.status === "succeeded") {
          console.log("Payment succeeded!");
          const transactionId = result.paymentIntent.id;
          const paymentData = {
            bookingId,
            email: user.email,
            price,
            transactionId: transactionId,
            paymentMethod: result.paymentIntent.payment_method_types,
          };

          const paymentRes = await axios.post(
            "https://travelserver-three.vercel.app/payments",
            paymentData
          );
          if (paymentRes.data.insertedId) {
            // ✅ Show SweetAlert with transaction ID
            await Swal.fire({
              icon: "success",
              title: "Payment Successful!",
              html: `<strong>Transaction ID:</strong> <code>${transactionId}</code>`,
              confirmButtonText: "Go to My Parcels",
            });
            await axios.put(
              `https://travelserver-three.vercel.app/bookings/${bookingId}`,
              {
                paymentStatus: "paid",
                status: "In Review",
              }
            );

            // ✅ Redirect to /myParcels
            navigate("/Dashboard/my-bookings");
          }
        }
      }
    } catch (err) {
      setErrorMsg("Payment initialization failed. Try again.");
      console.error(err);
    }
  };

  if (isLoading) {
    return (
      <div className="text-center text-xl py-10 font-semibold">
        Loading Package Info...
      </div>
    );
  }

  if (error || !pkg) {
    return (
      <div className="text-center text-red-600 py-10">
        Failed to load package. Please try again.
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-[300px] p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Payment Details
        </h2>

        {/* Show package info */}
        <div className="text-center space-y-1">
          <p className="text-lg font-medium">{pkg.tripTitle}</p>
          <p className="text-gray-600">Price: ${pkg.price}</p>
        </div>

        <div className="border border-gray-300 p-4 rounded-md shadow-inner bg-gray-50">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#111827",
                  "::placeholder": {
                    color: "#9ca3af",
                  },
                },
                invalid: {
                  color: "#dc2626",
                },
              },
            }}
          />
        </div>

        <button
          className="w-full btn bg-gradient-to-r from-black to-gray-900 text-white hover:scale-105 transition-transform"
          type="submit"
          disabled={!stripe}
        >
          Pay Now
        </button>

        {errorMsg && (
          <p className="text-sm text-red-600 text-center mt-2">{errorMsg}</p>
        )}
      </form>
    </div>
  );
}
