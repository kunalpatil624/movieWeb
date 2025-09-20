import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const PaymentButton = ({ amount, seats, showId, userId }) => {
  const navigate = useNavigate();

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    if (!amount || amount <= 0) return toast.error("Invalid amount");

    const res = await loadRazorpayScript();
    if (!res) return toast.error("Razorpay SDK failed to load");

    try {
      const orderRes = await axios.post(
        "http://localhost:3000/api/payment/create-order",
        { amount }
      );
      const order = orderRes.data;

      const options = {
        key: "rzp_test_RJmVB2KHwgmeZj", // Test Key
        amount: order.amount,
        currency: order.currency,
        name: "Movie Booking App",
        description: `Booking ${seats.length} seat(s)`,
        order_id: order.id,
        handler: async function (response) {
          try {
            // Save booking to backend
            await axios.post("http://localhost:3000/api/payment/save-booking", {
              user: userId, // ✅ schema field ke naam ke saath
              show: showId, // ✅
              bookedSeats: seats, // ✅
              amount, // ✅
              paymentLink: response.razorpay_payment_id,
            });

            toast.success("Payment and Booking Successful!");
            navigate("/my-bookings"); // Redirect to history page
          } catch (err) {
            console.error(err);
            toast.error("Booking save failed");
          }
        },
        prefill: {
          name: "Kunal Patil",
          email: "kunal@example.com",
          contact: "9191919191",
        },
        theme: {
          color: "#F84565",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

    } catch (err) {
      console.error(err);
      toast.error("Failed to create order");
    }
  };

  return (
    <button
      className="bg-red-600 text-white px-4 py-2 rounded mt-4 hover:bg-red-800"
      onClick={handlePayment}
    >
      Pay ₹{amount}
    </button>
  );
};

export default PaymentButton;
