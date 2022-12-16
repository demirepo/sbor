import React from 'react';

export default function Hint({ text }) {
    const [showButtons, setShowButtons] = React.useState(false);

    const timer = React.useRef(null);

    const handlePointerEnter = () => {
        timer.current = setTimeout(() => {
            setShowButtons(true);
        }, 300);
    };

    const handlePointerOut = () => {
        clearTimeout(timer.current);
        setShowButtons(false);
    };

    return (
        <>
            <div
                onPointerEnter={handlePointerEnter}
                onPointerLeave={handlePointerOut}
                className='hint__wrapper'
            >
                <p className='hint__text'>{text}</p>
                <div className='buttons'>
                    <button className='control-button'>
                        <svg
                            style={{ width: '100%', height: '100%' }}
                            viewBox='0 0 24 24'
                        >
                            <path
                                fill='currentColor'
                                d='M14.06,9L15,9.94L5.92,19H5V18.08L14.06,9M17.66,3C17.41,3 17.15,3.1 16.96,3.29L15.13,5.12L18.88,8.87L20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18.17,3.09 17.92,3 17.66,3M14.06,6.19L3,17.25V21H6.75L17.81,9.94L14.06,6.19Z'
                            />
                        </svg>
                    </button>
                    <button className='control-button'>
                        <svg
                            style={{ width: '100%', height: '100%' }}
                            viewBox='0 0 24 24'
                        >
                            <path
                                fill='currentColor'
                                d='M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z'
                            />
                        </svg>
                    </button>
                    <button
                        className='dots control-button'
                        onClick={(e) => {
                            e.preventDefault();
                            setShowButtons((shouldShow) => !shouldShow);
                        }}
                    >
                        <svg
                            style={{ width: '100%', height: '100%' }}
                            viewBox='0 0 24 24'
                        >
                            <path
                                fill='currentColor'
                                d='M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z'
                            />
                        </svg>
                    </button>
                </div>
            </div>

            <style jsx>
                {`
                    .hint__wrapper {
                        display: flex;
                        align-items: center;
                        width: 100%;
                        padding: 0.5rem 1rem;
                        cursor: pointer;
                        border: none;
                    }

                    .hint__wrapper:hover {
                        background-color: hsl(200 9% 87%);
                    }

                    .hint__text {
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        overflow: hidden;
                        cursor: pointer;
                    }

                    .buttons {
                        padding-inline: 1rem;
                        margin-left: auto;
                        display: ${showButtons ? 'flex' : 'none'};
                    }

                    .buttons > * + * {
                        margin-left: 1rem;
                    }

                    .control-button {
                        display: block;
                        border: none;
                        width: 1.5rem;
                        height: 1.5rem;
                        opacity: 0.5;
                    }

                    button:hover {
                        opacity: 1;
                    }
                `}
            </style>
        </>
    );
}
