import { useState, useContext } from "react";
import { loginUser } from "../utils/api";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let hasError = false;
    const newErrors = { email: "", password: "" };

    if (!form.email) {
      newErrors.email = "Email is required.";
      hasError = true;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address.";
      hasError = true;
    }

    if (!form.password) {
      newErrors.password = "Password is required.";
      hasError = true;
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    try {
      const res = await loginUser(form);
      if (res.data.status === "ok") {
        const token = res.data.data;
        localStorage.setItem("token", token);

        // Fetch user data with token
        const userRes = await fetch(
          "http://localhost:5000/api/auth/userData",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token }),
          }
        );

        const userData = await userRes.json();

        if (userData.status === "ok") {
          setUser(userData.data); 
          navigate("/home");
        } else {
          alert(userData.error || "Failed to fetch user data");
        }
      } else {
        alert(res.data.error);
      }
    } catch (error) {
      alert("Something went wrong. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white/40 p-8 sm:p-10 rounded-2xl shadow-2xl"
      >
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Sign In
        </h1>

        <div className="mb-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          {errors.email && (
            <p className="text-sm text-red-600 mt-1">{errors.email}</p>
          )}
        </div>

        <div className="mb-6">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          {errors.password && (
            <p className="text-sm text-red-600 mt-1">{errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          className="relative group inline-flex max-w-2xl items-center justify-center px-6 py-3 text-base font-bold text-white transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-500 to-pink-500 rounded-full transition-all duration-300 group-hover:scale-110 animate-gradient"></div>

          <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-50 transition-opacity duration-300 bg-white blur-xl"></div>

          <div className="absolute inset-0 overflow-hidden rounded-full">
            <div className="glitter-container">
              <div className="glitter"></div>
              <div className="glitter"></div>
              <div className="glitter"></div>
            </div>
          </div>

          <div className="absolute inset-0 rounded-full border-2 border-white opacity-20 group-hover:opacity-40 group-hover:scale-105 transition-all duration-300"></div>

          <div className="absolute inset-0 rounded-full overflow-hidden">
            <div className="wave"></div>
          </div>

          <span className="relative z-10 flex items-center gap-2">
            <span className="tracking-wider">Login</span>
            <svg
              viewBox="0 0 24 24"
              stroke="currentColor"
              fill="none"
              className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1"
            >
              <path
                d="M13 7l5 5m0 0l-5 5m5-5H6"
                strokeWidth="2"
                strokeLinejoin="round"
                strokeLinecap="round"
              ></path>
            </svg>
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </span>
        </button>
      </form>
    </div>
  );
};

export default Login;
