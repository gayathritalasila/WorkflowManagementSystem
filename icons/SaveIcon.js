import React from "react";

const SaveIcon = ({ className = "" }) => {
    return (
        <div className={className}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 26V6.5L22 6L25.5 9.5V26H6Z" fill="#FBDC00" />
                <path d="M5 5V27H27V9.594L26.719 9.281L22.719 5.281L22.406 5H5ZM7 7H10V13H22V7.437L25 10.437V25H23V16H9V25H7V7ZM12 7H16V9H18V7H20V11H12V7ZM11 18H21V25H11V18Z" fill="black" />
            </svg>
        </div>
    );
};

export default SaveIcon;
