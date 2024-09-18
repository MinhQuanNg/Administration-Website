import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentDossier: null,
  currentTask: null,
  currentView: 'dossier',
  newDossierData: false,
  newTaskData: false,
  refetchMyTasks: false,
  trainedTaskCount: 0,
  untrainedTaskCount: 0,
};

const dossierSlice = createSlice({
  name: 'dossier',
  initialState,
  reducers: {
    setCurrentDossier: (state, action) => {
      state.currentDossier = action.payload;
    },
    setCurrentTask: (state, action) => {
      state.currentTask = action.payload;
    },
    setCurrentView: (state, action) => {
      state.currentView = action.payload;
    },
    setNewDossierData: (state, action) => {
      state.newDossierData = action.payload;
    },
    setNewTaskData: (state, action) => {
      state.newTaskData = action.payload;
    },
    setRefetchMyTasks: (state, action) => {
      state.refetchMyTasks = action.payload;
    },
    setTrainedTaskCount: (state, action) => {
      state.trainedTaskCount = action.payload;
    },
    setUntrainedTaskCount: (state, action) => {
      state.untrainedTaskCount = action.payload;
    },
  },
});

export const { setCurrentDossier, setCurrentTask,
  setCurrentView, setNewDossierData, setNewTaskData,
  setRefetchMyTasks, setTrainedTaskCount, setUntrainedTaskCount} = dossierSlice.actions;
export default dossierSlice.reducer;