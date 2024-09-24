"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

interface FormData {
  name: string;
  username: string;
  userEmail: string;
  password: string;
  role: string;
  phoneNumber: string;
}

export default function Signup() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    username: "",
    userEmail: "",
    password: "",
    role: "Admin", // Default role
    phoneNumber: "",
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  // Handle input change
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // Clear errors on change
  };

  // Form validation function
  const validateForm = (formData: FormData): Partial<FormData> => {
    const validationErrors: Partial<FormData> = {};

    // Validate name
  if (!formData.name) {
    validationErrors.name = "Name is required";
  }

  // Validate username (must contain a special character and a number)
  if (!formData.username) {
    validationErrors.username = "Username is required";
  } else if (!/(?=.*[0-9])(?=.*[!@#$%^&*])/.test(formData.username)) {
    validationErrors.username = "Username must contain at least one number and one special character";
  }

  // Validate email
  if (!formData.userEmail) {
    validationErrors.userEmail = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(formData.userEmail)) {
    validationErrors.userEmail = "Invalid email format";
  }

  // Validate password (must contain at least one uppercase letter, one number, one special character, and be at least 8 characters long)
  if (!formData.password) {
    validationErrors.password = "Password is required";
  } else if (
    !/(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(formData.password) ||
    formData.password.length < 8
  ) {
    validationErrors.password = "Password must contain at least one uppercase letter, one number, one special character, and be at least 8 characters long";
  }

  // Validate phone number (must be 10-15 digits)
  if (!formData.phoneNumber) {
    validationErrors.phoneNumber = "Phone number is required";
  } else if (!/^\d{10,15}$/.test(formData.phoneNumber)) {
    validationErrors.phoneNumber = "Invalid phone number";
  }

  return validationErrors;
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate the form
    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length === 0) {
      try {
        // Send a POST request to the backend
        const response = await axios.post("http://localhost:3000/auth/register", formData);

        if (response.status === 201) {
          toast.success("User added successful!");
          // Redirect the user to a specific page, e.g., login
          router.push("/login");
        }
      } catch (error: any) {
        if (error.response && error.response.status === 409) {
          // Handle conflict error (e.g., user already exists)
          toast.error(error.response.data.message); // Show error message from backend
        } else {
          // Handle any other errors
          toast.error("Registration failed. Please try again.");
        }
      }
    } else {
      // Set validation errors
      setErrors(validationErrors);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md">
        <h1 className="mb-4 text-2xl font-bold text-center">Add User</h1>
        <Toaster />
        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2 font-bold text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              placeholder="Name"
            />
            {errors.name && (
              <p className="text-xs italic text-red-500">{errors.name}</p>
            )}
          </div>

          {/* Username Field */}
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block mb-2 font-bold text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              placeholder="Username"
            />
            {errors.username && (
              <p className="text-xs italic text-red-500">{errors.username}</p>
            )}
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label
              htmlFor="userEmail"
              className="block mb-2 font-bold text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="userEmail"
              name="userEmail"
              value={formData.userEmail}
              onChange={handleInputChange}
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              placeholder="Email"            
            />
            {errors.userEmail && (
              <p className="text-xs italic text-red-500">{errors.userEmail}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block mb-2 font-bold text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              placeholder="Password"            
            />
            {errors.password && (
              <p className="text-xs italic text-red-500">{errors.password}</p>
            )}
          </div>

          {/* Phone Number Field */}
          <div className="mb-4">
            <label
              htmlFor="phoneNumber"
              className="block mb-2 font-bold text-gray-700"
            >
              Phone Number
            </label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              placeholder="Phone Number"
            />
            {errors.phoneNumber && (
              <p className="text-xs italic text-red-500">
                {errors.phoneNumber}
              </p>
            )}
          </div>

          {/* Role Selection */}
          <div className="mb-4">
            <label htmlFor="role" className="block mb-2 font-bold text-gray-700">
              Role
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            >
              <option value="Admin">Admin</option>
              <option value="Event_Manager">Event Manager</option>
              <option value="Volunteer">Volunteer</option>
              <option value="Sponsor">Sponsor</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
