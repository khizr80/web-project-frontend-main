import { useDispatch, useSelector } from "react-redux";
import {
  createNewFileApiCall,
  deleteFileByIdApiCall,
  getFileContentByIdApiCall,
  getFilesApiCall,
  saveFileContentByIdApiCall,
} from "../../../api/files.api";
import {
  saveFile,
  setFiles,
  updateFileContent,
  deleteFile,
} from "../../../redux/features/files/filesSlice";
import { useState } from "react";
import { extensionToLanguage } from "../../../utils/utils";
import toast from "react-hot-toast";

export const useEditor = () => {
  // states
  const dispatch = useDispatch();
  const [currentFileId, setCurrentFileId] = useState(null);
  const [fileContentLoading, setFileContentLoading] = useState(true);
  const [createFileLoading, setCreateFileLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const files = useSelector((state) => state.files);

  const createNewFile = async (fileName) => {
    setCreateFileLoading(true);

    const extension = fileName.split(".")[fileName.split(".").length - 1];
    const language = extensionToLanguage[extension];

    // check if language is not present in extensionToLanguage (not allowed)
    if (!language) {
      toast.error("Language not allowed");
      setCreateFileLoading(false);
      return;
    }

    // check if file name already exists
    const matched = files.find((f) => f.name == fileName);

    if (matched) {
      toast.error("File already exists");
      setCreateFileLoading(false);
      return;
    }

    // api call
    const response = await createNewFileApiCall({
      fileName,
      extension,
      content: "",
      language,
    });

    if (response.success) {
      const newFile = {
        ...response.data,
        id: response.data._id,
        saved: true,
        oldContent: response.data.content,
      };
      dispatch(setFiles([newFile, ...files]));
      setCurrentFileId(response.data._id);
    }

    setCreateFileLoading(false);
  };

  const getFiles = async () => {
    const response = await getFilesApiCall();

    if (response.success) {
      dispatch(
        setFiles(
          response.data.map((file) => ({
            ...file,
            id: file._id,
            content: null,
            saved: true,
            oldContent: null,
          }))
        )
      );
      setCurrentFileId(response.data[0]._id);
    } else {
      console.error(response.message);
    }
  };

  const isContentPresent = (id) => {
    const file = files.find((f) => f.id == id);
    if (file) {
      return file.content != null;
    }
    return false;
  };

  const getCurrentFileContent = async () => {
    setFileContentLoading(true);

    // if content is not present only then call API
    if (!isContentPresent(currentFileId)) {
      const response = await getFileContentByIdApiCall(currentFileId);

      if (response.success) {
        dispatch(
          updateFileContent({
            id: currentFileId,
            content: response.data.content,
          })
        );
      } else {
        console.error(response.message);
      }
    }

    setFileContentLoading(false);
  };

  const handleEditorChange = (value) => {
    dispatch(updateFileContent({ id: currentFileId, content: value }));
  };

  const handleSave = async (content) => {
    setSaving(true);
    const response = await saveFileContentByIdApiCall(currentFileId, {
      content,
    });

    if (response.success) {
      dispatch(saveFile({ id: currentFileId }));
    } else {
      console.error(response.message);
    }
    setSaving(false);
  };

  const handleFileDelete = async (id) => {
    setCreateFileLoading(true);
    const response = await deleteFileByIdApiCall(id);
    console.log(response);
    if (response.success) {
      dispatch(deleteFile({ id }));
      const updatedFiles = files.filter((file) => file.id !== id);

      if (updatedFiles.length > 0) {
        setCurrentFileId(updatedFiles[0].id);
      } else {
        setCurrentFileId(null);
      }
      setCreateFileLoading(false);
    } else {
      console.error(response.message);
      setCreateFileLoading(false);
    }
  };

  return {
    getFiles,
    currentFileId,
    getCurrentFileContent,
    fileContentLoading,
    setCurrentFileId,
    handleEditorChange,
    handleSave,
    createNewFile,
    createFileLoading,
    saving,
    handleFileDelete,
  };
};
