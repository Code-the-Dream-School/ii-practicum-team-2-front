import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import { useForgotPassword } from "../hooks/useForgotPassword";
import DOMPurify from "dompurify";
import toast from "react-hot-toast";
const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotMessage, setForgotMessage] = useState("");
  const [forgotError, setForgotError] = useState("");
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const { login, isLoading: loginLoading, error: loginError } = useLogin();
  const { requestReset, isRequestLoading } = useForgotPassword({
    onSuccess: (message) => {
      setForgotMessage(message);
      toast.success(message);
    },
    onError: (errorMessage) => {
      setForgotError(errorMessage);
      toast.error(errorMessage);
    },
  });
  const navigate = useNavigate();
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const sanitizedEmail = DOMPurify.sanitize(email.trim());
      const sanitizedPassword = DOMPurify.sanitize(password);
      localStorage.clear();
      await login({
        email: sanitizedEmail,
        password: sanitizedPassword,
      });
    } catch (error) {
      console.error("Login submission error:", error);
      toast.error(error.message || "Failed to sign in");
    }
  };
  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    setForgotMessage("");
    setForgotError("");
    const sanitizedEmail = DOMPurify.sanitize(forgotEmail);
    requestReset({ email: sanitizedEmail });
  };
  const handleResend = async (e) => {
    e.preventDefault();
    if (!forgotEmail) {
      setForgotError("Please enter your email.");
      toast.error("Please enter your email.");
      return;
    }
    handleForgotPasswordSubmit(e);
  };
  const switchToLogin = () => {
    setIsForgotPassword(false);
    setForgotEmail("");
    setForgotMessage("");
    setForgotError("");
  };
  if (isForgotPassword) {
    return (
      <div className="fixed inset-0 flex items-center justify-center p-4 bg-white z-10">
        <div className="bg-white rounded-[25px] border border-gray-300 shadow-lg p-6 pb-6 w-[450px] relative">
          <button
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-sm font-medium"
            onClick={() => setIsForgotPassword(false)}
            aria-label="Close forgot password form"
            disabled={isRequestLoading}
          >
            Close
          </button>
          <div className="flex flex-col items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">
              Forgot Password?
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              Enter your email to reset the password
            </p>
          </div>
          <form
            onSubmit={handleForgotPasswordSubmit}
            className="space-y-3 text-left"
          >
            {forgotMessage && (
              <div className="text-green-500 text-sm">{forgotMessage}</div>
            )}
            {forgotError && (
              <div className="text-red-500 text-sm">{forgotError}</div>
            )}
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="forgot-email"
              >
                Email
              </label>
              <input
                id="forgot-email"
                type="email"
                placeholder="Enter your email"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                disabled={isRequestLoading}
                autoComplete="email"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
              disabled={isRequestLoading}
            >
              {isRequestLoading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Did not receive the email?{" "}
              <button
                className="text-blue-600 hover:underline"
                onClick={handleResend}
                disabled={isRequestLoading}
              >
                Resend it
              </button>
            </p>
            <p className="text-sm text-gray-600 mt-2">
              Remember your password?{" "}
              <button
                className="text-blue-600 hover:underline"
                onClick={switchToLogin}
                disabled={isRequestLoading}
              >
                Log In
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 bg-white z-10">
      <div className="bg-white rounded-[25px] border border-gray-300 shadow-lg p-6 pb-6 w-[450px]">
        <div className="flex flex-col items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Sign In</h2>
        </div>
        <form onSubmit={handleLoginSubmit} className="space-y-3 text-left">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email address
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email address"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loginLoading}
              autoComplete="username"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loginLoading}
              autoComplete="current-password"
              required
            />
          </div>
          {loginError && (
            <div className="text-red-500 text-sm">{loginError}</div>
          )}
          <div className="flex justify-between items-center mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                disabled={loginLoading}
              />
              <span className="ml-2 text-sm text-gray-600">Remember me</span>
            </label>
            <button
              type="button"
              className="text-sm text-blue-600 hover:underline"
              onClick={() => setIsForgotPassword(true)}
              disabled={loginLoading}
            >
              Forgot password?
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition mb-0"
            disabled={loginLoading}
          >
            {loginLoading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Or continue with
              </span>
            </div>
          </div>
          <div className="mt-4 flex justify-center">
            <button
              className="flex items-center justify-center w-full p-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
              disabled={loginLoading}
            >
              <img
                src="https://www.google.com/favicon.ico"
                alt="Google"
                className="w-5 h-5 mr-2"
              />
              Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignInForm;
