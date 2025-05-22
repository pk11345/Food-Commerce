import axios from "axios";
import * as React from "react";
import * as Router from "react-router-dom";

export default function AllProduct() {
  const [data, setData] = React.useState({});
  const navigate = Router.useNavigate();

  React.useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/admin/allproduct`
        );

        setData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const handlerating = (id) => {
    navigate(`/rating/${id}`);
  };

  const handleupdate = (id) => {
    navigate(`/update-product/${id}`);
  };

  const handledelete = (id) => {
    navigate(`/delete-product/${id}`);
  };

  return (
    <div className="flex items-center justify-center m-1">
      <div className="w-full max-w-6xl">
        <h1 className="m-3 text-3xl font-bold text-center">Product List</h1>
        <table className="min-w-full border border-gray-300 bg-gray-200">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2 border-b border-gray-300 text-center w-1/12">
                Product Id
              </th>
              <th className="px-4 py-2 border-b border-gray-300 text-center w-2/12">
                Name
              </th>
              <th className="px-4 py-2 border-b border-gray-300 text-center w-2/12">
                Price
              </th>
              <th className="px-4 py-2 border-b border-gray-300 text-center w-3/12">
                Description
              </th>
              <th className="px-4 py-2 border-b border-gray-300 text-center w-2/12">
                Category
              </th>
              <th className="px-4 py-2 border-b border-gray-300 text-center w-2/12">
                Photo
              </th>
              <th className="px-4 py-2 border-b border-gray-300 text-center w-2/12">
                Rating
              </th>
            </tr>
          </thead>

          <tbody className="bg-gray-100">
            {data.length > 0 ? (
              data.map((product, index) => (
                <tr
                  key={product.id}
                  className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                >
                  <td className="px-4 py-2 border-b border-gray-300 text-center">
                    {product.id}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300 text-center">
                    {product.name}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300 text-center">
                    &#8377;{product.price}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300 text-center">
                    {product.description}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300 text-center">
                    {product.category}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300 text-center">
                    <img
                      src={`${import.meta.env.VITE_BACKEND_URL}/${
                        product.photo
                      }`}
                      alt={product.name}
                      className="w-24 h-24 object-cover mx-auto"
                    />
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300 text-center space-x-2 ">
                    <div className="flex ">
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex-1 mx-2"
                        onClick={() => handleupdate(product.id)}
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handledelete(product.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 flex-1 mx-2"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => handlerating(product.id)}
                        className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        Rating
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No products available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
