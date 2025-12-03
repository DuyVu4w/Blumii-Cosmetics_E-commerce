import React from 'react';

const Loader = () => {
    return (
        <div className="loader-wrapper">
            <style>{`
                /* Wrapper để làm mờ màn hình và chặn thao tác */
                .loader-wrapper {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(255, 255, 255, 0.8); /* Nền trắng mờ */
                    z-index: 9999; /* Đảm bảo luôn nổi lên trên cùng */
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                /* CSS Loader của bạn */
                .loader {
                    position: relative;
                    width: 2.5em;
                    height: 2.5em;
                    transform: rotate(165deg);
                }

                .loader:before, .loader:after {
                    content: "";
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    display: block;
                    width: 0.5em;
                    height: 0.5em;
                    border-radius: 0.25em;
                    transform: translate(-50%, -50%);
                }

                .loader:before {
                    animation: before8 2s infinite;
                }

                .loader:after {
                    animation: after6 2s infinite;
                }

                @keyframes before8 {
                    0% { width: 0.5em; box-shadow: 1em -0.5em rgba(225, 20, 98, 0.75), -1em 0.5em rgba(111, 202, 220, 0.75); }
                    35% { width: 2.5em; box-shadow: 0 -0.5em rgba(225, 20, 98, 0.75), 0 0.5em rgba(111, 202, 220, 0.75); }
                    70% { width: 0.5em; box-shadow: -1em -0.5em rgba(225, 20, 98, 0.75), 1em 0.5em rgba(111, 202, 220, 0.75); }
                    100% { box-shadow: 1em -0.5em rgba(225, 20, 98, 0.75), -1em 0.5em rgba(111, 202, 220, 0.75); }
                }

                @keyframes after6 {
                    0% { height: 0.5em; box-shadow: 0.5em 1em rgba(61, 184, 143, 0.75), -0.5em -1em rgba(233, 169, 32, 0.75); }
                    35% { height: 2.5em; box-shadow: 0.5em 0 rgba(61, 184, 143, 0.75), -0.5em 0 rgba(233, 169, 32, 0.75); }
                    70% { height: 0.5em; box-shadow: 0.5em -1em rgba(61, 184, 143, 0.75), -0.5em 1em rgba(233, 169, 32, 0.75); }
                    100% { box-shadow: 0.5em 1em rgba(61, 184, 143, 0.75), -0.5em -1em rgba(233, 169, 32, 0.75); }
                }
            `}</style>
            
            <div className="loader"></div>
        </div>
    );
};

export default Loader;