import axios from "axios";
import * as React from "react";
import * as ReactToast from "react-toastify";

export default function UserRequest() {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/not-appoved`
      );
      setData(response.data);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };
  React.useEffect(() => {
    fetchUsers();
  }, []);

  const handleAccept = async (userId) => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/accept-user`,
        { userId }
      );
      if (res.data) {
        ReactToast.toast.success("User approved successfully");
        fetchUsers();
      }
    } catch (error) {
      console.error("Error during approval:", error);
      ReactToast.toast.error("Failed to approve user");
    }
  };

  const handleCancel = async (userId) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/cancel-user/${userId}`
      );
      if ((res.data.message = "Cancel succesfully")) {
        ReactToast.toast.success("User canceled successfully");
        fetchUsers();
      }
    } catch (error) {
      console.error(
        "Error during cancellation:",
        error.response ? error.response.data : error.message
      );
      ReactToast.toast.error("Failed to cancel user");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="max-w-full mx-auto p-6 bg-gray-100 rounded-lg shadow-md mt-5 mr-5">
      <h1 className="text-3xl font-bold text-center mb-6">User Not Approved</h1>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Username</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((user) => (
              <tr key={user.id}>
                <td className="py-2 px-4 border-b text-center">
                  {user.username}
                </td>
                <td className="py-2 px-4 border-b text-center">{user.email}</td>
                <td className="py-2 px-4 border-b text-center">
                  <div className="flex space-x-4 justify-center ">
                    <button
                      onClick={() => handleAccept(user.id)}
                      className="bg-green-500 text-white py-1 px-3 rounded"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleCancel(user.id)}
                      className="bg-red-500 text-white py-1 px-3 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="py-2 px-4 text-center">
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <ReactToast.ToastContainer
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
