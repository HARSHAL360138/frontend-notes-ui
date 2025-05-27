import { useState } from "react";
import { registerUser } from "../utils/api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const validateForm = () => {
    const { fname, lname, email, password } = form;

    if (!fname || !lname || !email || !password) {
      alert("All fields are required.");
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert("Invalid email format.");
      return false;
    }

    if (password.length < 6 || password.length > 20) {
      alert("Password must be between 6 and 20 characters.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const res = await registerUser(form);
      if (res.data.status === "ok") {
        navigate("/login");
      } else {
        alert(res.data.error);
      }
    } catch (error) {
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
      <div className="w-full max-w-md bg-white/30 rounded-2xl shadow-xl p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Register
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="fname"
            placeholder="First Name"
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="text"
            name="lname"
            placeholder="Last Name"
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <button
            type="submit"
            className="w-32 relative group inline-flex items-center justify-center px-6 py-3 text-base font-bold text-white transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95"
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
              <span className="tracking-wider">Register</span>
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
    </div>
  );
};

export default Register;
