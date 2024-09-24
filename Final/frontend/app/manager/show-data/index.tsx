// /pages/show-data/index.tsx

import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const ShowData = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/user/allUsers");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  const filteredData = data.filter((user: any) =>
    user.id.toString().includes(searchTerm)
  );

  const handleUpdate = (userId: number) => {
    router.push(`/update-user/${userId}`);
  };

  return (
    <div className="flex items-center justify-center flex-auto min-h-screen p-4 bg-gray-100">
      <div className="w-full p-6 bg-white rounded-lg shadow-lg max-w-7xl">
        <h2 className="mb-4 text-2xl font-bold text-center text-gray-800">
          Show all users
        </h2>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by user ID..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-4 py-2 text-left text-white">ID</th>
                <th className="px-4 py-2 text-left text-white">Name</th>
                <th className="px-4 py-2 text-left text-white">Username</th>
                <th className="px-4 py-2 text-left text-white">User Email</th>
                <th className="px-4 py-2 text-left text-white">Phone Number</th>
                <th className="px-4 py-2 text-left text-white">Role</th>
                <th className="w-32 py-2 text-left text-white">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((user: any, index: number) => (
                  <tr
                    key={user.id}
                    className={`${
                      index % 2 === 0 ? "bg-gray-100" : "bg-white"
                    } border-b`}
                  >
                    <td className="px-4 py-2 text-gray-700">{user.id}</td>
                    <td className="px-4 py-2 text-gray-700">{user.name}</td>
                    <td className="px-4 py-2 text-gray-700">{user.username}</td>
                    <td className="px-4 py-2 text-gray-700">{user.userEmail}</td>
                    <td className="px-4 py-2 text-gray-700">{user.phoneNumber}</td>
                    <td className="px-4 py-2 text-gray-700">{user.role}</td>
                    <td className="px-4 py-2 text-gray-700">
                      <button
                        className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={() => handleUpdate(user.id)}
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-4 py-2 text-center text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ShowData;
