import { useState } from "react";
import { executeCodeApiCall, analyseCodeApiCall } from "../../../api/code.api";
import toast from "react-hot-toast";
import { set } from "zod";

export const useCode = () => {
  const [output, setOutput] = useState("");
  const [analysis, setanalysis] = useState({
    timeComplexity: "O(0)",
    spaceComplexity: "O(0)",
    suggestions: [],
  });
  const [loading, setLoading] = useState(false);

  const runCode = async (body) => {
    setLoading(true);

    try {
      const response = await executeCodeApiCall(body);

      if (response.success) {
        setOutput(response.data.run.output);
      } else {
        console.error(response.message);
        setOutput("");
        toast.error(response.message);
      }
    } catch (error) {
      console.error(error.message);
      setOutput("");
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const analyseCode = async (body) => {
    setLoading(true);

    try {
      const response = await analyseCodeApiCall(body);

      if (response.success) {
        setanalysis(response.data);
      } else {
        console.error(response.message);
        clearAnalysis();
        toast.error(response.message);
      }
    } catch (error) {
      console.error(error.message);
      clearAnalysis();
      toast.error(response.message);
    } finally {
      setLoading(false);
    }
  };

  const clearAnalysis = () => {
    setanalysis({
      timeComplexity: "O(0)",
      spaceComplexity: "O(0)",
      suggestions: [],
    });
  };

  return {
    output,
    analysis,
    loading,
    runCode,
    analyseCode,
    clearAnalysis,
  };
};
