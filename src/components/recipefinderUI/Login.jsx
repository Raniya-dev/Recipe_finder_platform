import { use, useState } from "react";
import AXIOS_API from "../../api/api";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

export default function Login() {

    const state = {
    theme: { isLight: true }
  }

  const isLight = useSelector((state) => {
    console.log(state);
    return state.theme.isLight
  })


  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();


  const [error, setError] = useState("");
  const [showForgotModal, setShowForgotModal] = useState(false);
const [showOtpModal, setShowOtpModal] = useState(false);

const [forgotEmail, setForgotEmail] = useState("");
const [otp, setOtp] = useState("");
const [newPassword, setNewPassword] = useState("");

const [otpMessage, setOtpMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlelogin = async () => {
    try {
      console.log("started");
      const response = await AXIOS_API.post("/api/auth/login", {
        email: formData.email,
        password: formData.password
      });

    } catch (error) {

    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("All fields are required");
      return;
    }

    try {
      const res = await AXIOS_API.post("/api/auth/login", formData);
     

      if (res.status === 200) {
        console.log("login successfull", res.data);
        navigate("/",{replace:true})

      }

      console.log("Login success:", res.data);

      localStorage.setItem("token", res?.data?.token);
      setError("");

    } catch (err) {
      setError(err.response?.data?.errMsg || "Login failed");
      if(err.response?.status === 500){
        setError("Server error , please try again later")
      }
    }
  };

  const handleSendOtp = async () => {

    if(!forgotEmail){
      setOtpMessage("Email is required!")
      return;
    }

    
  try {

    const response = await AXIOS_API.post("/api/auth/sendotp", {
      email: forgotEmail
    });

    console.log(response.data);

    setOtpMessage("OTP sent successfully");

    setShowForgotModal(false);
    setShowOtpModal(true);

  } catch (error) {

    console.log(error.response?.data);

    setOtpMessage(
      error.response?.data?.errMsg || "Failed to send OTP"
    );
  }
};

const handleVerifyOtp = async () => {

  if(!otp || !newPassword){
    setOtpMessage("All fields are required!");
    return;
  }
  try {

    const response = await AXIOS_API.post("/api/auth/verifyotp", {
      email: forgotEmail,
      otp,
      newPassword
    });

    console.log(response.data);

    setOtpMessage("Password reset successful");

    setShowOtpModal(false);

  } catch (error) {

    console.log(error.response?.data);

    setOtpMessage(
      error.response?.data?.errMsg || "OTP verification failed"
    );
  }
};

  return (
    <div className={`min-h-screen flex items-center justify-center ${isLight ? "bg-orange-100" : "bg-gray-900"}`}>
      <div className={`w-full max-w-md ${isLight ? "bg-white" : "bg-gray-800"} shadow-lg rounded-2xl p-8`}>

        <h2 className="text-2xl font-bold text-center font-poppins text-orange-600 mb-6">
          Welcome Back!
        </h2>
          <span className="text-orange-500 font-poppins mb-4">Ready to discover your next favourite recipe!</span>

        {error && (
          <p className="text-yellow-400 text-sm mb-4 text-center">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition duration-300"
          >
            Sign In
          </button>
        </form>

        <Link to="/signup">
          <p className="text-sm text-gray-500 text-center mt-6">
            Don't have an account?{" "}
            <span className="text-orange-500 cursor-pointer hover:underline">
              Sign up
            </span>
          </p>
        </Link>

        <div className="flex justify-center mt-2">
  <p
    className="text-sm text-orange-500  cursor-pointer hover:underline"
    onClick={() => setShowForgotModal(true)}
  >
    Forgot Password?
  </p>
</div>
{
  showForgotModal && (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      <div className="bg-white w-96 text-center rounded-xl p-6 shadow-xl">

        <h2 className="text-2xl font-bold text-center mb-4 text-orange-500">
          Forgot Password
        </h2>

        {
          otpMessage && (
            <p className="text-green-500 text-center">{otpMessage}</p>
          )
        }

        <input
          type="email"
          placeholder="Enter your email"
          value={forgotEmail}
          onChange={(e) => setForgotEmail(e.target.value)}
          className="w-full border px-4 py-2 rounded-lg mb-4 focus:outline-none"
        />

        <button
          onClick={handleSendOtp}
          className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600"
        >
          Send OTP
        </button>
       

        <button
          onClick={() => setShowForgotModal(false)}
          className="w-full mt-3 text-red-500"
        >
          Close
        </button>

      </div>

    </div>
  )
}


{
  showOtpModal && (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      <div className="bg-white w-96 rounded-xl p-6 shadow-xl">

        <h2 className="text-2xl font-bold text-center mb-4 text-orange-500">
          Verify OTP
        </h2>

        {
          otpMessage && (
            <p className="text-green-500 text-center">{otpMessage}</p>
          )
        }

        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full border px-4 py-2 rounded-lg mb-3"
        />

        <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full border px-4 py-2 rounded-lg mb-4"
        />

        <button
          onClick={handleVerifyOtp}
          className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
        >
          Verify OTP
        </button>

        <button
          onClick={() => setShowOtpModal(false)}
          className="w-full mt-3 text-red-500"
        >
          Close
        </button>

      </div>

    </div>
  )
}

      </div>
    </div>
  );
}
