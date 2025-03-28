import React from "react";

const CloseIcon = ({ className = "" }) => {
    return (
        <div className={className}>
            <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.332 12.332L21.6654 21.6654M21.6654 12.332L12.332 21.6654L21.6654 12.332Z" stroke="#333333" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </div>
    );
};

export default CloseIcon;
