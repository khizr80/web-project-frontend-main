import React from "react";
import {
  FaCss3,
  FaHtml5,
  FaJava,
  FaJs,
  FaPython,
  FaTrash,
} from "react-icons/fa";
import { FaC, FaCircle, FaEllipsisVertical } from "react-icons/fa6";

const icons = {
  js: <FaJs />,
  java: <FaJava />,
  cpp: <FaC />,
  py: <FaPython />,
};

const FileItem = ({ file, isActive = false, onClick, handleFileDelete }) => {
  const { id, name, extension } = file;
  return (
    <>
      <div
        onClick={onClick}
        className={`flex items-center justify-between ${
          isActive && "bg-dark-secondary"
        }  p-2 rounded-md cursor-pointer hover:bg-dark-secondary duration-300`}
      >
        <div className="flex items-center gap-2">
          <span>{icons[extension]}</span>
          <span>{name}</span>
        </div>
        <div className="flex items-center gap-1">
          {!file.saved && (
            <span>
              <FaCircle size={10} />
            </span>
          )}
          <FaTrash onClick={() => handleFileDelete(id)} />
        </div>
      </div>
    </>
  );
};

export default FileItem;
