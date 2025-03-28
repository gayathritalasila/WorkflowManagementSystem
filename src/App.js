import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router";
import store from "../reduxStore";
import Login from "./components/Login/Login";
import Builder from "./components/Builder/Builder"
import WorkflowCanvas from "./components/WorkflowCanvas/WorkflowCanvas";

//Layout component to wrap pages
const AppLayout = () =>{
    return(
        <Provider store={store}>
            <Outlet />
        </Provider>
    )
}

// Routes configuration
const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        children: [
            {
                path: "/",
                element: <Login />,
            },
            {
                path: "/listView",
                element: <Builder />,
            },
            {
                path: "/canvas",
                element: <WorkflowCanvas />,
            },
        ],
    },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />)