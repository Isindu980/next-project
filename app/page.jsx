"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setToken } from "../store/authSlice";

export default function LoginPage() {
  const [email, setEmail] = useState("isindu980@gmail.com");
  const [password, setPassword] = useState("isindu980");
  const [error, setError] = useState("");
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const loginData = { email, password };

    try {
      const response = await axios.post("http://localhost:5000/api/login", loginData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const token = response.data.token;
        dispatch(setToken(token));

        if (isClient) {
          router.push("/Home");
        }
      }
    } catch (error) {
     // console.error("Error during login:", error);
      setError(error?.response?.data?.message || "Error occurred during login. Please try again.");
    }
  };

  return (
    <div 
      style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '100vh', 
        backgroundColor: '#f3f4f6' 
      }}
    >
      <div 
        style={{ 
          width: '100%', 
          maxWidth: '400px', 
          padding: '32px', 
          backgroundColor: '#ffffff', 
          borderRadius: '8px', 
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' 
        }}
      >
        <h2 
          style={{ 
            fontSize: '24px', 
            fontWeight: 'bold', 
            textAlign: 'center', 
            color: '#4a5568' 
          }}
        >
          Login
        </h2>

        {error && (
          <div 
            style={{ 
              color: 'red', 
              textAlign: 'center', 
              marginBottom: '16px' 
            }}
          >
            {error}
          </div>
        )}

        <form style={{ marginTop: '24px' }} onSubmit={handleLogin}>
          <div style={{ marginBottom: '16px' }}>
            <label
              htmlFor="email"
              style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#4a5568',
              }}
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '8px',
                marginTop: '4px',
                border: '1px solid #cbd5e0',
                borderRadius: '4px',
                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                outline: 'none',
                transition: 'border-color 0.2s',
              }}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label
              htmlFor="password"
              style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#4a5568',
              }}
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '8px',
                marginTop: '4px',
                border: '1px solid #cbd5e0',
                borderRadius: '4px',
                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                outline: 'none',
                transition: 'border-color 0.2s',
              }}
            />
          </div>

          <div>
            <button
              type="submit"
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '16px',
                fontWeight: '500',
                color: '#ffffff',
                backgroundColor: '#5a67d8',
                borderRadius: '4px',
                transition: 'background-color 0.2s',
              }}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}