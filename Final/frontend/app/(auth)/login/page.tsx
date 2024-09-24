"use client";

import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Toaster, toast } from 'react-hot-toast';

interface FormData {
  username: string;
  password: string;
}

export default function Signin() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    username: '',
    password: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Validate input
    if (!formData.username || !formData.password) {
      toast.error('Please fill out all fields');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/auth/login', formData);
      console.log(response.data);

      const token = response.data.access_token; // JWT token
      const userRole = response.data.user.role; // User role from the response
      console.log(token);
      
      // Store token and username in local storage
      localStorage.setItem('token', token);
      localStorage.setItem('username', formData.username);

      toast.success('Sign in successful');

      // Role-based redirection
      switch (userRole) {
        case 'Volunteer':
          router.push('/volunteer-dashboard');
          break;
        case 'Event_Manager':
          router.push('/manager');
          break;
        case 'Sponsor':
          router.push('/sponsor-dashboard');
          break;
        default:
          toast.error('User role not recognized.'); // Handle unexpected roles
      }
      
    } catch (error) {
      console.error('Error signing in:', error);
      toast.error('Sign in failed. Please check your credentials.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-12 bg-gray-50 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <Toaster />
          <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">Sign In</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="username" className="sr-only">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
