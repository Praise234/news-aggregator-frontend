import React, { useState } from "react";
import { forgotPassword } from "../utils/APIRoutes";
import Bannerbg from "../assets/Bannerbg.jpg";


const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch(forgotPassword, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        setIsLoading(false);
        throw new Error("Failed to send reset link.");
    }
    
    setMessage("Reset link sent. Please check your email.");
    setEmail("");
    setIsLoading(false);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="relative flex justify-center items-center h-screen bg-gray-100" style={{
        backgroundImage: `url(${Bannerbg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
        {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-80"></div>

      <form
        onSubmit={handleSubmit}
        className="p-6 bg-white shadow rounded w-80 absolute z-[60]"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          Forgot Password
        </h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {message && <p className="text-green-500 mb-4">{message}</p>}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full border border-gray-300 p-2 rounded"
            placeholder="Enter your email"
            required
          />
        </div>

        {!isLoading ? <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Send Reset Link
        </button>
        : 
        <div className="flex justify-center items-center ">
            <div className="animate-spin rounded-full h-5 w-5 border-t-4 border-blue-500"></div>
        </div>

      
        }
        
      </form>
    </div>
  );
};

export default ForgotPassword;
