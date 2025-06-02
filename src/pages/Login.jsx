import CodeInsightLogo from "../components/CodeInsightLogo";
import { useLogin } from "../components/login/hooks/useLogin";
import InputField from "../components/ui/InputField";
import { FaSpinner } from "react-icons/fa";
import { Link } from "react-router-dom";

const Login = () => {
  const { formData, handleChange, handleLogin, loading, errors } = useLogin();
  const { email, password } = formData;

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-dark-primary">
      {/* Cover section - hidden on mobile */}
      <div className="cover-section hidden md:flex flex-col px-6 py-6 md:px-10 md:py-8 font-bold text-white bg-gradient-to-br from-blue-600 to-purple-700">
        <Link to={"/"}>
          <CodeInsightLogo className="h-15 w-auto" />
        </Link>
        <div className="flex flex-col flex-1 gap-3 justify-center py-8 md:py-0">
          <h1 className="text-5xl md:text-6xl">Program Optimally!</h1>
          <div className="text-3xl md:text-4xl font-light">
            Write, Analyze and improve your code
          </div>
          <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-lg p-6 max-w-md">
            <p className="text-lg">
              Join thousands of developers who are already using Code Insight to
              enhance their coding skills and build better software.
            </p>
          </div>
        </div>
      </div>

      {/* Login section - full width on mobile */}
      <div className="py-8 sm:py-10 md:py-16  px-4 col-span-1 md:col-span-1">
        <div className="h-full flex flex-col items-center justify-center gap-4 sm:gap-5">
          <Link to={"/"}>
            <CodeInsightLogo className="h-18 w-auto" />
          </Link>

          <div className="w-full max-w-md bg-dark-secondary rounded-xl shadow-lg p-6 sm:p-8 flex items-center justify-center flex-col">
            <div className="text-sm sm:text-base mb-4">Other ways</div>
            <div className="text-sm sm:text-base mb-4">
              or use your email account
            </div>

            <form
              action=""
              className="w-full text-center flex flex-col gap-4"
              onSubmit={handleLogin}
            >
              <div className="flex flex-col gap-3 sm:gap-4">
                <div>
                  <InputField
                    input={
                      <input
                        type="email"
                        name="email"
                        value={email}
                        className="w-full bg-dark-primary rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-button-primary transition-all"
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
                        className="w-full bg-dark-primary rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-button-primary transition-all"
                        placeholder="Password"
                        onChange={handleChange}
                      />
                    }
                    error={errors.password}
                  />
                </div>
              </div>

              <div className="flex justify-center w-full">
                <span className="text-sm text-white cursor-pointer">
                  Forgot your password?
                </span>
              </div>

              <div className="mt-4 mb-4 flex gap-1 sm:gap-2 justify-center text-gray-400 text-sm sm:text-base">
                Don&apos;t have an account?
                <Link
                  to={"/signup"}
                  className="text-white hover:text-white cursor-pointer font-medium"
                >
                  Sign Up
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full primary-btn hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-full transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {loading && (
                  <FaSpinner className="animate-spin text-white" size={18} />
                )}
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
