import useAxiosSecure from "../../hooks/useAxiosSecure";

const UserTable = ({ data, refetch }) => {
  const axiosSecure = useAxiosSecure();

  const handleStatus = (id) => {
    axiosSecure.patch(`/status/${id}`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        // toast.success("Status Successfully Updated!");
        alert("Status Successfully Updated!");
        refetch();
      }
    });
  };
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-center">ID</th>
            <th className="py-3 px-6 text-center">Name</th>
            <th className="py-3 px-6 text-center">Email</th>
            <th className="py-3 px-6 text-center">Phone</th>
            <th className="py-3 px-6 text-center">Account Type</th>
            <th className="py-3 px-6 text-center">Status</th>
            <th className="py-3 px-6 text-center">Action</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm">
          {data.map((user, index) => (
            <tr
              key={user._id}
              className="border-b border-gray-200 hover:bg-gray-100"
            >
              <td className="py-3 px-6 text-center whitespace-nowrap">
                {index + 1}
              </td>
              <td className="py-3 px-6 text-center capitalize">{user.name}</td>
              <td className="py-3 px-6 text-center">{user.email}</td>
              <td className="py-3 px-6 text-center">{user.phone}</td>
              <td className="py-3 px-6 text-center">
                <span
                  className={`px-6 py-1 rounded-full ${
                    user.accountType === "Admin"
                      ? "bg-green-100 text-green-500"
                      : user.accountType === "Agent"
                      ? "bg-blue-100 text-blue-500"
                      : user.accountType === "Consumer"
                      ? "bg-purple-100 text-purple-500"
                      : ""
                  }`}
                >
                  {user.accountType}
                </span>
              </td>
              <td className="py-3 px-6 text-center">
                {" "}
                <span
                  className={`px-6 py-1 rounded-full ${
                    user.status === "pending"
                      ? "bg-yellow-100 text-yellow-500"
                      : user.status === "active"
                      ? "bg-green-100 text-green-500"
                      : user.status === "blocked"
                      ? "bg-red-100 text-red-500"
                      : ""
                  }`}
                >
                  {user.status}
                </span>
              </td>
              <td className="py-3 px-6 text-center">
                <button
                  onClick={() => handleStatus(user._id)}
                  className={`px-5 py-2 rounded-md min-w-28 text-xs ${
                    user.status === "active"
                      ? "bg-red-500 text-white hover:bg-red-700"
                      : "bg-green-500 text-white hover:bg-green-700"
                  }`}
                >
                  {user.status === "pending" ? "Activated" : "Blocked"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
