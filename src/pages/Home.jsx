import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-dark-secondary">
      {/* Hero Section */}
      <header className="bg-dark-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">CodeInsight</h1>
          <p className="text-lg sm:text-xl mb-8">
            Analyze your code with precision. Optimize performance, reduce
            complexity, and write cleaner JavaScript and Python.
          </p>
          <Link
            to={"/editor"}
            className="bg-button-primary text-white px-6 py-3 rounded-md font-semibold transition hover:scale-105 duration-300 cursor-pointer"
          >
            Try CodeInsight Now
          </Link>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Why Choose CodeInsight?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-dark-secondary p-6 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold text-white mb-4">
                Real-Time Analysis
              </h3>
              <p className="text-dark-tertiary">
                Get instant feedback on time and space complexity as you type,
                powered by advanced AST parsing.
              </p>
            </div>
            <div className="bg-dark-secondary p-6 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold text-white mb-4">
                Smart Suggestions
              </h3>
              <p className="text-dark-tertiary">
                Receive actionable tips to optimize loops, reduce redundancy,
                and improve code quality.
              </p>
            </div>
            <div className="bg-dark-secondary p-6 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold text-white mb-4">
                Multi-Language Support
              </h3>
              <p className="text-dark-tertiary">
                Analyze JavaScript and Python code seamlessly with our Monaco
                Editor integration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-default py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Optimize Your Code?
          </h2>
          <p className="text-lg text-white mb-8">
            Join developers who trust CodeInsight to write efficient,
            maintainable code.
          </p>
          <Link
            to={"/editor"}
            className="bg-button-primary text-white px-6 py-3 rounded-md font-semibold hover:scale-105 duration-300 cursor-pointer transition"
          >
            Get Started
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
