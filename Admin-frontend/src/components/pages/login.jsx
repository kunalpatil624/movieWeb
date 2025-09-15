import React, { useState } from "react";
import axios from "axios";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import store from "../redux/store";
import { toast } from 'sonner'
import {SUPER_ADMIN_API_AND_POINT} from '../utills/constand.js'
import { setCredentials } from "../redux/authSlice.js";


export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch()

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((p) => ({ ...p, [id]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const res = await axios.post(
      `${SUPER_ADMIN_API_AND_POINT}/login`,
      {
        email: form.email,
        password: form.password
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    if(res.data.success){
      dispatch(setCredentials({ user: res.data.user, token: res.data.token }));
      toast.success(res.data.message);
      navigate("/admin");
    }else{
      toast.error(res.data.message || "Invalid credentials");
    }

  } catch (error) {
    console.error("Login error:", error);
    toast.error(error.response?.data?.message || "Login failed");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-amber-600 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-black p-6 rounded-2xl shadow-md"
      >
        <h2 className="text-2xl font-semibold mb-4">Admin Login</h2>

        {error && (
          <div className="bg-red-50 text-red-700 text-sm p-2 rounded mb-4">{error}</div>
        )}

        <div className="mb-4">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="mt-2"
            autoComplete="username"
          />
        </div>

        <div className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="mt-2"
            autoComplete="current-password"
          />
        </div>

        <Button type="submit" className="w-full mt-2" disabled={loading}>
          {loading ? "Signing in..." : "Sign in"}
        </Button>

        <p className="text-xs text-gray-500 mt-3">
          Don't have an account? Ask super-admin to create one.
        </p>
      </form>
    </div>
  );
}
