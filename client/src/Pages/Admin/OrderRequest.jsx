import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../lib/context/AuthContext";

export default function OrderRequest() {
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/all-order-request`
      );
      if (res.data.data) {
        setOrders(res.data.data.orderData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Group orders by order_id
  const groupOrdersById = (orders) => {
    return orders.reduce((acc, order) => {
      (acc[order.order_id] = acc[order.order_id] || []).push(order);
      return acc;
    }, {});
  };

  const accept = async (orderId) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/accept-order`,
        { orderId, user }
      );
      console.log(res);
      toast.success(`Order ID ${orderId} has been accepted`);
      setOrders((prev) => prev.filter((order) => order.order_id !== orderId));
    } catch (error) {
      console.error(error);
      toast.error("Failed to accept the order.");
    }
  };

  const cancel = async (orderId) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/cancel-order`,
        { orderId, user }
      );
      console.log(res);
      toast.success(`Order ID ${orderId} has been canceled`);
      setOrders((prev) => prev.filter((order) => order.order_id !== orderId));
    } catch (error) {
      console.error(error);
      toast.error("Failed to cancel the order.");
    }
  };

  const groupedOrders = groupOrdersById(orders);

  return (
    <div className="max-w-full mx-auto bg-white shadow-lg rounded-lg p-6">
      <ToastContainer position="top-right" autoClose={1000} closeOnClick />
      {Object.keys(groupedOrders).length > 0 ? (
        Object.entries(groupedOrders).map(([orderId, items]) => (
          <div key={orderId} className="mb-6">
            <h2 className="text-2xl font-bold mb-4">Order ID: {orderId}</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Image
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantity
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {items.map((item) => (
                    <tr key={item.product_id} className="hover:bg-gray-100">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <img
                          src={`${import.meta.env.VITE_BACKEND_URL}/${
                            item.photo
                          }`}
                          alt={item.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="font-semibold">{item.name}</p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="text-gray-500">
                          ₹{parseFloat(item.price).toFixed(2)}
                        </p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <p className="font-semibold">{item.quantity}</p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={() => accept(orderId)}
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
              >
                Accept this Order
              </button>
              <button
                onClick={() => cancel(orderId)}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
              >
                Cancel this Order
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-gray-600 mt-6">No orders found</div>
      )}
    </div>
  );
}
