import React from "react";
import { useSignUp } from "../components/signup/hooks/useSignUp";
import InputField from "../components/ui/InputField";
import { FaSpinner } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import CodeInsightLogo from "../components/CodeInsightLogo";

const Signup = () => {
  const { formData, handleChange, handleSignUp, loading, errors } = useSignUp();
  const { username, email, password, confirmPassword } = formData;
  const navigate = useNavigate();
  return (
    <>
      {/* Main Div */}
      <div className="grid lg:grid-cols-2 h-screen bg-dark-primary">
        <div className="py-10">
          <div className="h-full flex flex-col items-center justify-center gap-5">
            <Link to={"/"}>
              <CodeInsightLogo className="h-18 w-auto" />
            </Link>
            <div>Other ways</div>
            <div>or use your email account</div>

            <form
              action=""
              className="w-full sm:px-28 px-14 text-center flex flex-col gap-5"
              onSubmit={handleSignUp}
              encType="multipart/form-data"
            >
              <div className="flex flex-col gap-3">
                <div className="">
                  <InputField
                    input={
                      <input
                        type="text"
                        name="username"
                        value={username}
                        className="w-full bg-black rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-button-primary"
                        placeholder="Username"
                        onChange={handleChange}
                      />
                    }
                    error={errors.username}
                  />
                </div>
                <div>
                  <InputField
                    input={
                      <input
                        type="email"
                        name="email"
                        value={email}
                        className="w-full bg-black rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-button-primary"
                        placeholder="Email"
                        onChange={handleChange}
                      />
                    }
                    error={errors.email}
                  />
                </div>
                <div>
                  <InputField
                    input={
                      <input
                        type="password"
                        name="password"
                        value={password}
                        className="w-full bg-black rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-button-primary"
                        placeholder="Password"
                        onChange={handleChange}
                      />
                    }
                    error={errors.password}
                  />
                </div>
                <div>
                  <InputField
                    input={
                      <input
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        className="w-full bg-black rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-button-primary"
                        placeholder="Confirm Password"
                        onChange={handleChange}
                      />
                    }
                    error={errors.confirmPassword}
                  />
                </div>
                <div>
                  <InputField
                    input={
                      <input
                        type="file"
                        name="profileImage"
                        className="w-full bg-black rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-button-primary"
                        placeholder="Profile Image"
                        onChange={handleChange}
                      />
                    }
                    error={errors.profileImage}
                  />
                </div>
                <div></div>
              </div>

              <div className="mb-5 flex gap-2 justify-center">
                Already have an account?
                <b
                  className="hover:button-primary cursor-pointer"
                  onClick={() => navigate("/login")}
                >
                  Login
                </b>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="primary-btn flex items-center justify-center gap-2 min-w-40"
              >
                {loading && (
                  <FaSpinner className="animate-spin text-white" size={15} />
                )}
                Sign Up
              </button>
            </form>
          </div>
        </div>
        {/* Cover Div */}
        <div className="cover-section flex-col px-10 py-8 font-bold text-white hidden lg:flex">
          <Link to={"/"}>
            <CodeInsightLogo className="h-15 w-auto" />
          </Link>
          <div className="flex flex-col flex-1 gap-3 justify-center">
            <h1 className="text-6xl ">Program Optimally!</h1>
            <div className="text-4xl font-light">
              Write, Analyze and improve your code
            </div>
            <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-lg p-6 max-w-md">
              <p className="text-lg">
                Join thousands of developers who are already using Code Insight
                to enhance their coding skills and build better software.
              </p>
            </div>
          </div>
          <h1 className="py-3 text-center font-medium">Links</h1>
        </div>
        {/* Signup Form Section */}
      </div>
    </>
  );
};

export default Signup;
