const CodeInsightLogo = ({ className = "h-8 w-auto" }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <svg
        viewBox="0 0 120 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full"
      >
        {/* Code brackets with insight/lightbulb element */}
        <path
          d="M20 8L12 20L20 32"
          stroke="#64B5F6"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M40 8L48 20L40 32"
          stroke="#64B5F6"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Lightbulb/insight element */}
        <circle cx="30" cy="20" r="8" fill="#FFC107" />
        <path
          d="M30 12V16M26 20H34M30 24V28"
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Text part */}
        <text
          x="55"
          y="18"
          fontFamily="Arial, sans-serif"
          fontSize="10"
          fontWeight="bold"
          fill="currentColor"
        >
          CODE
        </text>
        <text
          x="55"
          y="28"
          fontFamily="Arial, sans-serif"
          fontSize="10"
          fontWeight="bold"
          fill="#64B5F6"
        >
          INSIGHT
        </text>
      </svg>
    </div>
  );
};

export default CodeInsightLogo;
