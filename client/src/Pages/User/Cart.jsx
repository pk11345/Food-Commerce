import * as React from "react";
import axios from "axios";
import { data, Link, useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Cart() {
  const [cartItems, setCartItems] = React.useState([]);
  const [totalBeforeDiscount, setTotalBeforeDiscount] = React.useState(0);
  const [totalAfterDiscount, setTotalAfterDiscount] = React.useState(0);
  const [selectedState, setSelectedState] = React.useState("Uttar Pradesh");
  const navigate = useNavigate();
  const params = useParams();

  React.useEffect(() => {
    fetchCart();
  }, [params.id]); // Dependency on params.id

  const fetchCart = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/cart-info/${params.id}`
      );

      if (res.data.cartInfo && res.data.cartInfo.length > 0) {
        const data = res.data.cartInfo;
        setCartItems(data);
        calculateTotals(data);
      } else {
        setCartItems([]);
        setTotalBeforeDiscount(0);
        setTotalAfterDiscount(0);
      }
    } catch (error) {
      console.error({ error: "Not connected to database" });
    }
  };

  const add = async (productId) => {
    const userId = params.id;
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/cart/increment`,
        {
          userId,
          productId,
        }
      );
      if (res.data.message === "Increase successfully") {
        fetchCart();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const sub = async (productId) => {
    const userId = params.id;
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/cart/decrement`,
        {
          userId,
          productId,
        }
      );
      if (res.data.message === "Decrease successfully") {
        fetchCart();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const calculateGST = () => {
    return selectedState === "Uttar Pradesh"
      ? totalAfterDiscount * 0.12
      : totalAfterDiscount * 0.18;
  };

  const totalAmount = parseFloat(
    (Number(totalAfterDiscount) + Number(calculateGST())).toFixed(2)
  );

  const calculateTotals = (items) => {
    let totalBefore = 0;
    let totalAfter = 0;

    items.forEach((product) => {
      const price = product.price;
      const discount = parseInt(product.discount);
      const discountedPrice = price - (price * discount) / 100;

      totalBefore += product.quantity * price;
      totalAfter += product.quantity * discountedPrice;
    });

    setTotalBeforeDiscount(totalBefore);
    setTotalAfterDiscount(totalAfter);
  };

  const placeOrder = () => {
    navigate(`/place-order/${totalAmount}`, {
      state: { totalAmount },
    });
  };

  const redirecttotreackorder = () => {
    navigate(`/order-card`, {
      state: { totalAmount },
    });
  };

  const redirecttopurchasehistory = () => {
    navigate(`/purchase-history`);
  };

  return (
    <>
      <ToastContainer />
      <div className="container mx-auto p-6">
        {cartItems.length > 0 ? (
          <>
            <div className="flex justify-between mb-4">
              <h2 className="text-2xl font-bold">Your Cart</h2>
              <div>
                <button
                  onClick={redirecttotreackorder}
                  className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                >
                  Track Product
                </button>
                <button
                  onClick={redirecttopurchasehistory}
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Purchase History
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-center">
                    <th className="px-4 py-2 text-md font-medium text-gray-700 border">
                      Product
                    </th>
                    <th className="px-4 py-2 text-md font-medium text-gray-700 border">
                      Price
                    </th>
                    <th className="px-4 py-2 text-md font-medium text-gray-700 border">
                      Discount
                    </th>
                    <th className="px-4 py-2 text-md font-medium text-gray-700 border">
                      Quantity
                    </th>
                    <th className="px-4 py-2 text-md font-medium text-gray-700 border">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems
                    .sort((a, b) => a.id - b.id) // Sort by product id in ascending order
                    .map((product) => (
                      <tr key={product.id}>
                        <td className="px-4 py-2 border">
                          <img
                            src={`${import.meta.env.VITE_BACKEND_URL}/${
                              product.photo
                            }`}
                            alt={product.name}
                            className="w-20 h-20 object-cover rounded-lg mx-auto"
                          />
                        </td>
                        <td className="px-4 py-2 border text-center">
                          &#8377;
                          {parseFloat(product.price).toFixed(2) || "0.00"}
                        </td>
                        <td className="px-4 py-2 border text-center">
                          {parseFloat(product.discount)}%
                        </td>
                        <td className="px-4 py-2 border text-center">
                          <button
                            onClick={() =>
                              sub(product.id, product.quantity, product.name)
                            }
                            className="w-4 mx-3 px-2 items-center"
                          >
                            -
                          </button>
                          {product.quantity}
                          <button
                            onClick={() => add(product.id)}
                            className="w-4 mx-3 px-2 items-center"
                          >
                            +
                          </button>
                        </td>
                        <td className="px-4 py-2 border text-center">
                          &#8377;
                          {(
                            product.quantity *
                            (product.price -
                              (product.price * product.discount) / 100)
                          ).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-between items-center mt-6 p-4 border-t">
              <div className="w-1/3">
                <label htmlFor="state" className="block font-medium mb-2">
                  Select State:
                </label>
                <select
                  id="state"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                >
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="text-right">
                <h2 className="text-xl font-bold mb-2">
                  Total Before Discount: &#8377;{totalBeforeDiscount.toFixed(2)}
                </h2>
                <h2 className="text-xl font-bold mb-2">
                  Food Cost After Discount: &#8377;
                  {totalAfterDiscount.toFixed(2)}
                </h2>
                <h2 className="text-xl font-bold mb-4">
                  GST: &#8377;{calculateGST().toFixed(2)}
                </h2>
                <h2 className="text-2xl font-bold text-red-600">
                  Total Payable Amount: &#8377;{totalAmount.toFixed(2)}
                </h2>
              </div>
            </div>
            <div className="text-right mt-4">
              <button
                onClick={placeOrder}
                className="bg-blue-600 text-white px-6 py-2 rounded-md shadow hover:bg-blue-700 transition"
              >
                Place Order
              </button>
            </div>
          </>
        ) : (
          <div className="text-center text-xl font-medium">
            <div className="flex justify-between mb-4">
              <h2 className="text-2xl font-bold">Your Cart</h2>
              <div>
                <button
                  onClick={redirecttotreackorder}
                  className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                >
                  Track Product
                </button>
                <button
                  onClick={redirecttopurchasehistory}
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Purchase History
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
