import { configureStore } from "@reduxjs/toolkit";
import notesReducer from "../redux/reducers/reducer";

// Load state from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem("notesAppState");
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch (error) {
    console.error("Error loading state from localStorage:", error);
    return undefined;
  }
};

// Save state to localStorage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("notesAppState", serializedState);
  } catch (error) {
    console.error("Error saving state to localStorage:", error);
  }
};

// Initialize store with persisted state
const store = configureStore({
  reducer: notesReducer,
  preloadedState: loadState(), // ✅ Load initial state from localStorage
});

// Listen for state changes & save to localStorage
store.subscribe(() => {
  saveState(store.getState());
});

export default store;
