import React from "react";

const ApplelogoIcon = ({ className = "" }) => {
    return (
        <div className={className}>
            <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <mask id="mask0_7_7360" style={{maskType:"luminance"}} maskUnits="userSpaceOnUse" x="0" y="0" width="14" height="18">
                    <rect width="13.5" height="18" fill="white" />
                </mask>
                <g mask="url(#mask0_7_7360)">
                    <path fillRule="evenodd" clipRule="evenodd" d="M11.2043 9.44646C11.1973 8.15623 11.7809 7.1824 12.9621 6.46521C12.3012 5.51951 11.3027 4.9992 9.98438 4.89725C8.73633 4.79881 7.37227 5.62498 6.87305 5.62498C6.3457 5.62498 5.13633 4.9324 4.18711 4.9324C2.22539 4.96404 0.140625 6.49685 0.140625 9.61521C0.140625 10.5363 0.309375 11.4879 0.646875 12.4699C1.09688 13.7601 2.72109 16.9242 4.41563 16.8715C5.30156 16.8504 5.92734 16.2422 7.08047 16.2422C8.19844 16.2422 8.77852 16.8715 9.76641 16.8715C11.475 16.8469 12.9445 13.9711 13.3734 12.6773C11.0813 11.598 11.2043 9.51326 11.2043 9.44647L11.2043 9.44646ZM9.21444 3.67383C10.1742 2.53477 10.0863 1.49766 10.0582 1.125C9.21093 1.17422 8.23007 1.70156 7.67108 2.35195C7.05585 3.04805 6.69374 3.90937 6.77108 4.87969C7.68866 4.95 8.52538 4.47891 9.21444 3.67383Z" fill="black" />
                </g>
            </svg>
        </div>
    );
};

export default ApplelogoIcon;
