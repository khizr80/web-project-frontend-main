import React from "react";

function Header() {
  return (
    <div>
      <header className="bg-dark-secondary border-b border-gray-800 py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <a
              href="/"
              className="flex items-center text-white hover:text-button-primary transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2"
              >
                <path d="m15 18-6-6 6-6"></path>
              </svg>
              <span>Back to Dashboard</span>
            </a>
          </div>

          <div className="flex items-center space-x-4 text-dark-tertiary hover:text-red-500  transition-colors rounded-xs">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-log-out mr-2"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" x2="9" y1="12" y2="12"></line>
            </svg>
            <button className="flex items-center !bg-transparent">
              Sign Out
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
