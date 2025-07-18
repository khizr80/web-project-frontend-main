import React, { useEffect, useState, useRef } from "react";
import MonacoEditor from "@monaco-editor/react";
import FileExplorer from "../components/editor/file-explorer/FileExplorer";
import CodeAnalysis from "../components/editor/Code/CodeAnalysis";
import CodeOutput from "../components/editor/Code/CodeOutput";
import { useSelector } from "react-redux";
import { useEditor } from "../components/editor/hooks/useEditor";
import { extensionToLanguage } from "../utils/utils";
import { VscFolder, VscFolderOpened } from "react-icons/vsc";
import { HiChartBar, HiOutlineChartBar } from "react-icons/hi";

const Editor = () => {
  const {
    getFiles,
    currentFileId,
    getCurrentFileContent,
    fileContentLoading,
    setCurrentFileId,
    handleSave,
    createNewFile,
    createFileLoading,
    saving,
    handleFileDelete,
  } = useEditor();

  const files = useSelector((state) => state.files);
  const [currentFile, setCurrentFile] = useState(null);
  const [showLeftBar, setShowLeftBar] = useState(true);
  const [showRightBar, setShowRightBar] = useState(false);

  const editorRef = useRef(null); // store editor instance
  const [editorContent, setEditorContent] = useState(""); // live editor content

  useEffect(() => {
    getFiles();
  }, []);

  useEffect(() => {
    if (files) {
      setCurrentFile(files.find((f) => f.id == currentFileId));
    }
  }, [files, currentFileId]);

  useEffect(() => {
    if (currentFileId) {
      getCurrentFileContent();
    }
  }, [currentFileId]);

  // Handle editor mounting and bind Ctrl+S
  const handleEditorMount = (editor, monaco) => {
    editorRef.current = editor;

    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      const value = editor.getValue();
      if (value) {
        handleSave(value);
      }
    });
  };

  // Handle code changes and keep state updated
  const handleEditorChange = (value) => {
    setEditorContent(value); // update live value
  };

  return (
    <div className="grid grid-cols-5 text-white h-[calc(100vh-80px)] overflow-y-hidden">
      <div
        className={`${
          showLeftBar ? "-translate-x-0" : "-translate-x-full"
        } fixed transition-transform duration-300 w-[100vw] left-0 z-10 md:-translate-x-0 md:static md:w-auto col-span-1 h-full bg-dark-primary`}
      >
        <FileExplorer
          createFileLoading={createFileLoading}
          createNewFile={createNewFile}
          setCurrentFileId={setCurrentFileId}
          currentFileId={currentFileId}
          handleFileDelete={handleFileDelete}
        />
      </div>

      <div className="col-span-5 md:col-span-3 bg-dark-secondary py-5">
        {files && !fileContentLoading && currentFile ? (
          <MonacoEditor
            defaultLanguage={extensionToLanguage[currentFile.extension]}
            defaultValue={currentFile.content}
            theme="vs-dark"
            onChange={handleEditorChange}
            onMount={handleEditorMount}
          />
        ) : (
          <div className="flex items-center justify-center h-screen">
            Loading...
          </div>
        )}
      </div>

      <div
        className={`${
          showRightBar ? "translate-x-0" : "translate-x-full"
        } w-[100vw] transition-transform duration-300 fixed right-0 z-10 md:translate-x-0 md:static md:w-auto col-span-1 h-full bg-dark-primary overflow-y-auto`}
      >
        <div className="flex items-center justify-between text-white px-4 py-2">
          <button
            className={`px-4 py-1 mt-1 rounded-4xl transition-all duration-300
              ${
                currentFile?.saved
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-900"
              }
            `}
            onClick={() => {
              if (!saving && editorContent) {
                handleSave(editorContent);
              }
            }}
            disabled={currentFile && currentFile.saved}
          >
            Save
          </button>
        </div>
        <CodeAnalysis currentFile={currentFile} />
        <CodeOutput currentFile={currentFile} />
      </div>

      {/* Mobile sidebar toggles */}
      <div className="fixed bottom-0 left-0 z-10 w-full flex items-center justify-between p-4 md:hidden">
        <button
          className="p-2 rounded-lg hover:scale-105"
          onClick={() => {
            setShowLeftBar((prev) => {
              if (!prev && showRightBar) setShowRightBar(false);
              return !prev;
            });
          }}
        >
          {showLeftBar ? (
            <VscFolderOpened size={20} />
          ) : (
            <VscFolder size={20} />
          )}
        </button>
        <button
          className="p-2 rounded-lg hover:scale-105"
          onClick={() => {
            setShowRightBar((prev) => {
              if (!prev && showLeftBar) setShowLeftBar(false);
              return !prev;
            });
          }}
        >
          {showRightBar ? (
            <HiChartBar size={20} />
          ) : (
            <HiOutlineChartBar size={20} />
          )}
        </button>
      </div>
    </div>
  );
};

export default Editor;

