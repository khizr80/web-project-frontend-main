import React from "react";

const InputField = ({ input, error }) => {
  return (
    <>
      <div className="flex flex-col gap-2">
        {input}

        {/* Error message display */}
        {error && error != "" && (
          <div className="text-red-600 text-left">* {error}</div>
        )}
      </div>
    </>
  );
};

export default InputField;
