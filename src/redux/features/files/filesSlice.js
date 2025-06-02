import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

export const filesSlice = createSlice({
  name: "files",
  initialState,
  reducers: {
    setFiles: (_, action) => {
      return action.payload;
    },
    updateFileContent: (state, action) => {
      const id = action.payload.id;
      const content = action.payload.content;

      const file = state.find((f) => f.id == id);

      // update save status if file content was changed after initial loading
      if (file.content) {
        file.saved = file.oldContent == content;
      } else {
        file.oldContent = content;
      }

      file.content = content;
    },
    saveFile: (state, action) => {
      const id = action.payload.id;

      const file = state.find((f) => f.id == id);
      file.saved = true;
      file.oldContent = file.content;
    },
    deleteFile: (state, action) => {
      const id = action.payload.id;

      return state.filter((f) => f.id != id);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setFiles, updateFileContent, saveFile, deleteFile } =
  filesSlice.actions;

export default filesSlice.reducer;
