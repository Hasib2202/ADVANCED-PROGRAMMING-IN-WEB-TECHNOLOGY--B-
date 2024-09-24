// File: /app/manager/update-user/[id]/page.tsx
"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function UpdateUser({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { id } = params; // Get the user ID from the URL params
  const [userData, setUserData] = useState<any>(null);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    if (id) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/user/${id}`);
          setUserData(response.data);
          setName(response.data.name);
          setUsername(response.data.username);
          setUserEmail(response.data.userEmail);
          setPhoneNumber(response.data.phoneNumber);
          setRole(response.data.role);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchUserData();
    }
  }, [id]);

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:3000/user/${id}`, {
        name,
        username,
        userEmail,
        phoneNumber,
        role,
      });
      // Navigate back to show data after update
      router.push("/manager");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  // if (!userData) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-2xl font-bold text-center text-gray-800">
          Update User
        </h2>

        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="User name"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            placeholder="Email"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Phone Number</label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Phone Number"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Role</label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Role"
          />
        </div>

        <button
          className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
          onClick={handleUpdate}
        >
          Update User
        </button>
      </div>
    </div>
  );
}
