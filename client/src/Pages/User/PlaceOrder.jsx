import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import QRCode from "react-qr-code";
import { useAuth } from "../../lib/context/AuthContext";

function PlaceOrder() {
  const navigate = useNavigate();
  const params = useParams();

  const { user } = useAuth();

  const userId = user.id;
  // Convert amount from URL params to number safely
  const totalAmount = Number(params.amount) || 0;

  const [enteredAmount, setEnteredAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const upiId = "sahilthakur14691@okaxis"; // Replace with actual UPI ID
  const payeeName = "Sahil Thakur"; // Replace with actual Payee Name

  const handlePlaceOrder = async () => {
    const inputAmount = Number(enteredAmount);

    if (!enteredAmount || isNaN(inputAmount) || inputAmount <= 0) {
      toast.error("Please enter a valid amount.");
      return;
    }

    // Use precision-safe comparison
    if (Math.abs(inputAmount - totalAmount) > 0.01) {
      toast.error("The entered amount does not match the total amount.");
      return;
    }

    try {
      setIsLoading(true);

      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      if (!backendUrl) {
        toast.error("Backend URL is not configured.");
        return;
      }

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/orderpage`,
        {
          user,
          totalAmount,
        }
      );

      toast.success("Order placed successfully!");
      console.log("Order response:", res.data);

      setTimeout(() => {
        navigate(`/order-card`, { state: { totalAmount } });
      }, 2000);
    } catch (error) {
      console.error("Order error:", error);
      toast.error("Error placing the order.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex max-w-screen min-h-screen justify-center items-center bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-4 text-center">
          Confirm Your Order
        </h1>

        <div className="mb-4 text-center">
          <p className="text-lg mb-2">Scan QR Code to Pay:</p>
          <QRCode
            value={`upi://pay?pa=${upiId}&pn=${payeeName}&am=${totalAmount.toFixed(
              2
            )}&cu=INR`}
            size={192}
            className="ml-20"
          />
        </div>

        <div className="mb-4 text-center">
          <p className="text-xl">
            Total Payable Amount:{" "}
            <span className="font-bold text-green-600">
              ₹{totalAmount.toFixed(2)}
            </span>
          </p>
        </div>

        <div className="mb-4">
          <label htmlFor="totalAmount" className="block text-lg mb-1">
            Enter Total Amount:
          </label>
          <input
            type="number"
            id="totalAmount"
            className="border rounded-md w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
            min="0"
            step="0.01"
            value={enteredAmount}
            onChange={(e) => setEnteredAmount(e.target.value)}
          />
        </div>

        <button
          onClick={handlePlaceOrder}
          disabled={isLoading}
          className={`w-full py-2 px-4 rounded font-bold transition duration-200 ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          {isLoading ? "Placing Order..." : "Confirm Order"}
        </button>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default PlaceOrder;
