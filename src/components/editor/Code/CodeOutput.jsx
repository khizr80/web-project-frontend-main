import { useCode } from "../hooks/useCode";
import { FaSpinner } from "react-icons/fa";
import { extensionToLanguage } from "../../../utils/utils.js";

const CodeOutput = ({ currentFile }) => {
  const { output, runCode, loading } = useCode();

  const handleRunCode = () => {
    const languageToRun = extensionToLanguage[currentFile.extension];
    const body = {
      content: currentFile.content,
      language: languageToRun,
    };
    runCode(body);
  };
  return (
    <div className="px-4 pb-4 h-full flex flex-col">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-xl">Code Output</h3>
        <button
          onClick={handleRunCode}
          disabled={loading}
          className="bg-button-primary px-2 py-1 m-2 hover:scale-105 transition-all duration-300 ease-in-out rounded-4xl w-[72px] text-white cursor-pointer"
        >
          Run
        </button>
      </div>
      <div className="bg-black rounded-md p-4 flex-grow max-h-[300px]">
        {loading ? (
          <FaSpinner
            className="animate-spin text-green-300 m-auto my-28 "
            size={38}
          />
        ) : output ? (
          <textarea
            className="w-full h-full bg-black text-white resize-none"
            readOnly
            value={output}
          />
        ) : (
          <textarea
            className="w-full h-full bg-black text-gray-400 resize-none"
            readOnly
            value="Run your code to see the output"
          />
        )}
      </div>
    </div>
  );
};

export default CodeOutput;
