import React from "react";

const NavBarIcon = ({ className = "" }) => {
    return (
        <div className={className}>
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.555556" y="0.555556" width="38.8889" height="38.8889" rx="8.33333" fill="white" stroke="#E0E0E0" strokeWidth="1.11111" />
                <path d="M12.2227 25.5564H27.7782M12.2227 20.0009H27.7782M12.2227 14.4453H27.7782" stroke="#BDBDBD" strokeWidth="2.22222" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </div>
    );
};

export default NavBarIcon;
