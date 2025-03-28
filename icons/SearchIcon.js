import React from "react";

const SearchIcon = ({ className = "" }) => {
    return (
        <div className={className}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 15L11.6945 11.6886L15 15ZM13.5263 7.26316C13.5263 8.92425 12.8664 10.5173 11.6919 11.6919C10.5173 12.8664 8.92425 13.5263 7.26316 13.5263C5.60207 13.5263 4.00901 12.8664 2.83444 11.6919C1.65987 10.5173 1 8.92425 1 7.26316C1 5.60207 1.65987 4.00901 2.83444 2.83444C4.00901 1.65987 5.60207 1 7.26316 1C8.92425 1 10.5173 1.65987 11.6919 2.83444C12.8664 4.00901 13.5263 5.60207 13.5263 7.26316V7.26316Z" stroke="#CACACA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>

        </div>
    );
};

export default SearchIcon;
