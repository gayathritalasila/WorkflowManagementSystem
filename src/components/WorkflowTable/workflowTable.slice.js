import { createSlice } from "@reduxjs/toolkit";
import { fetchWorkflows } from "./workflowTable.actions";

const workflowTableSlice = createSlice({
    name:"workflows",
    initialState: {
        workflows: [],
        status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
        error: null
      },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchWorkflows.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchWorkflows.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.workflows = action.payload;
            })
            .addCase(fetchWorkflows.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export default workflowTableSlice.reducer;