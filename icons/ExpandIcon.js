import React from "react";

const ExpandIcon = ({ className = "" }) => {
    return (
        <div className={className}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 16.175L18.6 10.575L20 12L12 20L4 12L5.4 10.575L11 16.175V4H13L13 16.175Z" fill="black" />
            </svg>
        </div>
    );
};

export default ExpandIcon;
