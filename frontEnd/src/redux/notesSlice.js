import { createSlice } from "@reduxjs/toolkit";

export const notesSlice = createSlice({
    name: "notes",
    initialState: {
        notes: [],
    },
    reducers: {
        addNote: (state, action) => {
            state.notes.push(action.payload);
        },
        togglePin: (state, action) => {
            const pin = state.notes.find((n) => n.id === action.payload);
            if (pin) {
                pin.isPinned = !pin.isPinned;
            }
        },
        deleteNote: (state, action) => {
            const deleted = state.notes.filter((n) => n.id !== action.payload);
            state.notes = deleted;
        },
    },
});

export const { addNote, deleteNote, togglePin } = notesSlice.actions;
export default notesSlice.reducer;
