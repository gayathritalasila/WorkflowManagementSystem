import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
    name:"login",
    initialState: {
        user: JSON.parse(localStorage.getItem("user") || "null"),
      },
    reducers: {
        login: (state, action) =>{
            const user = action.payload;
            state.user = {
                uid: user.uid,
                displayName: user.displayName,
                email: user.email,
                bio: user.bio,
            };
        },
        logout: (state) => {
            localStorage.removeItem("user");
            state.user = null;
        },
        updateProfile: (state, action) => {
            const updatedProfile = action.payload;
            state.user = { ...state.user, ...updatedProfile };
          },
    },
});

export const { login, logout,updateProfile } = loginSlice.actions;
export default loginSlice.reducer;