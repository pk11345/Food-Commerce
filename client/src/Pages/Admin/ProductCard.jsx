import * as React from "react";

export default function ProductCard() {
  const [data, setData] = React.useState({});

  const handleSubmit = (e) => {
    e && e.preventDefault();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="flex items-center justify-center mx-6 px-4 py-0">
      <div className="bg-white p-10 shadow-xl rounded-lg w-full max-w-md mt-0">
        <h1 className="text-3xl font-semibold text-center mb-4 text-gray-800">
          Update Product
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Product Name
            </label>
            <input
              type="text"
              value={(data && data?.name) || ""}
              placeholder="Enter your Product name"
              onChange={(e) => handleChange(e)}
              className="w-full border border-gray-300 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Price
            </label>
            <input
              type="number"
              value={(data && data?.price) || ""}
              placeholder="Enter your product price"
              onChange={(e) => handleChange(e)}
              className="w-full border border-gray-300 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Upload Product Image
            </label>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full border border-gray-300 rounded-md p-1 focus:outline-none"
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Category
            </label>
            <select
              value={(data && data?.category) || ""}
              className="w-full border border-gray-300 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => handleChange(e)}
            >
              <option value="">Select a category</option>
              <option value="appetizers">Appetizers</option>
              <option value="main course">Main Course</option>
              <option value="entress">Entress</option>
              <option value="desert">Desert</option>
              <option value="beverages">Beverages</option>
              <option value="kids">Kid's menu</option>
              <option value="healthy">Healthy Option</option>
              <option value="seasonal">Seasonal Special</option>
            </select>
          </div>
          <div className="mb-2">
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Description
            </label>
            <textarea
              value={(data && data?.description) || ""}
              onChange={(e) => handleChange(e)}
              className="w-full border border-gray-300 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Discount
            </label>
            <input
              type="number"
              value={(data && data?.discount) || ""}
              placeholder="Enter the discount percentage"
              onChange={(e) => handleChange(e)}
              className="w-full border border-gray-300 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-green-500 font-semibold py-3 rounded-md hover:opacity-90 transition duration-200"
            >
              Update the Product
            </button>
          </div>
        </form>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
