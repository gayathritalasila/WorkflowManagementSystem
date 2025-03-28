import React from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import NavBarIcon from "../../../icons/NavBarIcon";
import SearchIcon from "../../../icons/SearchIcon";
import LogoutIcon from "../../../icons/LogoutIcon";
import { logout } from "../Login/login.slice";
import WorkflowTable from "../WorkflowTable/WorkflowTable";
import "./builder.css";

const Builder = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.login.user);


    const handleCreateNewProcess = () => {
        navigate("/canvas")
    }

    const handleLogout = () => dispatch(logout());
    if (!user) {
        return navigate("/");
    }

    return (
        <div className="builder-container">
            <div className="name-section">
                <NavBarIcon className="navbar-icon" />
                <h1 className="name-text">Workflow Builder</h1>
            </div>

            <div className="navbar-right">
                <button className="logout-button" onClick={handleLogout}>
                    <LogoutIcon className="icon" /> Logout
                </button>
            </div>

            <div className="search-create-group">
                <div className="search-bar">
                    <input type="text" placeholder="Search By Workflow Name/ID" />
                    <SearchIcon />
                </div>
                <button className="add-task-button" onClick={handleCreateNewProcess}>
                    + Create New Process
                </button>
            </div>
            <WorkflowTable />
        </div>
    );
}

export default Builder;