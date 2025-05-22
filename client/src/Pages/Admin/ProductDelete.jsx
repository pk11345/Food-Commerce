import axios from "axios";
import * as React from "react";
import * as Router from "react-router-dom";
import * as Toast from "react-toastify";

export default function ProductDelete() {
  const [data, setData] = React.useState({});
  const navigate = Router.useNavigate();
  const params = Router.useParams();

  const fetchProduct = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/productinfo/${params.id}`
      );
      if (res.data) {
        setData(res.data);
      } else {
        setData({});
        Toast.toast.error("No product found"); // Show error if no product is found
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/deleteproduct/${
          params.id
        }`
      );
      if (res.data && res.data.success) {
        // Check for the new success property
        Toast.toast.success(`${data.name} has been removed`);
        setTimeout(() => {
          navigate("/admin/updateproduct");
        }, 2000);
      } else {
        Toast.toast.error("Unable to delete the product");
      }
    } catch (error) {
      console.error("Unable to connect:", error);
      Toast.toast.error("An error occurred while trying to delete the product");
    }
  };

  React.useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div className="flex items-center justify-center p-5 m-5">
      <div className="w-full max-w-6xl">
        <h1 className="m-3 text-3xl font-bold text-center">Product List</h1>
        <table className="min-w-full border border-gray-300 bg-gray-200">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2 border-b border-gray-300 text-center">
                Id
              </th>
              <th className="px-4 py-2 border-b border-gray-300 text-center">
                Name
              </th>
              <th className="px-4 py-2 border-b border-gray-300 text-center">
                Price
              </th>
              <th className="px-4 py-2 border-b border-gray-300 text-center">
                Description
              </th>
              <th className="px-4 py-2 border-b border-gray-300 text-center">
                Category
              </th>
              <th className="px-4 py-2 border-b border-gray-300 text-center">
                Photo
              </th>
              <th className="px-4 py-2 border-b border-gray-300 text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-2 border-b border-gray-300 text-center">
                {data.id}
              </td>
              <td className="px-4 py-2 border-b border-gray-300 text-center">
                {data.name}
              </td>
              <td className="px-4 py-2 border-b border-gray-300 text-center">
                {data.price}
              </td>
              <td className="px-4 py-2 border-b border-gray-300 text-center">
                {data.description}
              </td>
              <td className="px-4 py-2 border-b border-gray-300 text-center">
                {data.category}
              </td>
              <td className="px-4 py-2 border-b border-gray-300 text-center center">
                <img
                  className="w-24 h-24 object-cover mx-auto"
                  src={`${import.meta.env.VITE_BACKEND_URL}/${data.photo}`}
                  alt="none"
                />
              </td>
              <td className="px-4 py-2 border-b border-gray-300 text-center">
                <button
                  onClick={handleDelete}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <Toast.ToastContainer
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
