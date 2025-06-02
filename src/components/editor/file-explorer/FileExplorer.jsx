import { FaPlus } from "react-icons/fa";
import FileItem from "./FileItem";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";

const FileExplorer = ({
  setCurrentFileId,
  currentFileId,
  createNewFile,
  createFileLoading,
  handleFileDelete,
}) => {
  const [creatingFile, setCreatingFile] = useState(false);
  const [fileName, setFileName] = useState("");
  const inputRef = useRef();

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setCreatingFile(false);
    } else if (e.key === "Enter") {
      createNewFile(fileName);
      setCreatingFile(false);
    }
  };

  useEffect(() => {
    if (creatingFile) {
      inputRef.current.focus();
    }
  }, [creatingFile]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setCreatingFile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const files = useSelector((state) => state.files);
  return (
    <div className="p-4 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Explorer</h3>
        <span
          className="cursor-pointer hover:scale-105 duration-300"
          onClick={() => {
            if (!createFileLoading) {
              setFileName("");
              setCreatingFile(true);
            }
          }}
        >
          <FaPlus />
        </span>
      </div>

      <div>
        <input
          type="text"
          placeholder="Search"
          className="primary-input-small"
        />
      </div>

      <div className="flex flex-col gap-2 overflow-y-auto">
        {creatingFile && (
          <input
            onKeyDown={handleKeyDown}
            ref={inputRef}
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            className={`flex items-center justify-between  p-2 rounded-md cursor-pointer bg-dark-secondary outline-none border-none duration-300`}
          />
        )}
        {files
          ? files.map((file) => (
              <FileItem
                key={file.id}
                file={file}
                onClick={() => {
                  setCurrentFileId(file.id);
                }}
                isActive={file.id == currentFileId}
                handleFileDelete={handleFileDelete}
              />
            ))
          : Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className={`flex items-center justify-between h-9 p-2 rounded-md cursor-pointer bg-dark-secondary duration-300 animate-pulse`}
              ></div>
            ))}
      </div>
    </div>
  );
};

export default FileExplorer;
