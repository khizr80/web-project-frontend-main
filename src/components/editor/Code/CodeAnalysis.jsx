import { useCode } from "../hooks/useCode";
import { FaSpinner } from "react-icons/fa";
import toast from "react-hot-toast";
import { extensionToLanguage } from "../../../utils/utils";

const CodeAnalysis = ({ currentFile }) => {
  const { analysis, analyseCode, loading, clearAnalysis } = useCode();

  const handleCodeAnalysis = () => {
    const languageToAnalyse = extensionToLanguage[currentFile.extension];
    if (languageToAnalyse !== "javascript") {
      toast.error("Code analysis is only supported for JavaScript files.");
      clearAnalysis();
      return;
    }
    const body = {
      content: currentFile.content,
      language: languageToAnalyse,
    };
    analyseCode(body);
  };
  return (
    <div className="px-4 pt-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-xl">Code Analysis</h3>
        <button
          disabled={loading}
          onClick={handleCodeAnalysis}
          className="bg-button-primary px-2 py-1 m-2 hover:scale-105 transition-all duration-300 ease-in-out rounded-4xl text-white cursor-pointer"
        >
          Analyse
        </button>
      </div>
      <div>
        <h4 className="font-semibold pb-0.5">Complexity Analysis</h4>
        <p>
          Time:{" "}
          {loading ? (
            <FaSpinner
              className="animate-spin text-green-300 inline"
              size={18}
            />
          ) : (
            <span className="bg-green-300/20 px-2 rounded-md text-green-300">
              {analysis.timeComplexity}
            </span>
          )}
        </p>
        <p>
          Space:{" "}
          {loading ? (
            <FaSpinner
              className="animate-spin text-green-300 inline"
              size={18}
            />
          ) : (
            <span className="bg-green-300/20 px-2 rounded-md text-green-300">
              {analysis.spaceComplexity}
            </span>
          )}
        </p>
      </div>
      <hr className=" mx-1.5 my-3" />
      <div className="">
        <h4 className="font-semibold pb-0.5">Best Practices</h4>
        <ul className="list-disc h-60 max-h-60 overflow-y-auto pl-5 scr">
          {loading ? (
            <FaSpinner
              className="animate-spin text-green-300 m-auto"
              size={38}
            />
          ) : (
            analysis.suggestions.map((suggestion, index) => (
              <li key={index} className="px-2 rounded-md text-white my-1">
                {suggestion}
              </li>
            ))
          )}
        </ul>
      </div>
      <hr className=" mx-1.5 my-3" />
    </div>
  );
};

export default CodeAnalysis;
