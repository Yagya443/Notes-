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
        
    },
});

export const { addNote, togglePin } = notesSlice.actions;
export default notesSlice.reducer;
