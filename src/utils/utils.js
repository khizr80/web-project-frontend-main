export const getParsedErrors = (result) => {
  const fieldErrors = {};
  result.error.errors.forEach((err) => {
    fieldErrors[err.path[0]] = err.message;
  });
  return fieldErrors;
};

// mapping extension to language names, also acts as allowed languages
export const extensionToLanguage = {
  js: "javascript",
  py: "python",
  java: "java",
  cpp: "cpp",
  go: "go",
  rs: "rust",
};
