import React from 'react';
import useSWR from 'swr';
import Hint from './Hint';
import { useSwrPlus } from '../hooks/useSwrPlus';

export default function Dropdown() {
    const [input, setInput] = React.useState('');
    const [dropdown, setDropdown] = React.useState(true);

    const focus = React.useRef();

    const pathKey = 'http://localhost:3000/api/hotel/';
    const { data, isLoading, error, controller, mutate } = useSwrPlus(input.length > 1 ? pathKey : null, input);

    // event listners & callbacks

    const clickOutside = React.useCallback((e) => {
        if (!e.target.closest('form')) {
            setDropdown(false);
        }
    }, []);
    const arrowNavigation = React.useCallback((e) => {
        if (e.key === 'ArrowDown') {
            focus.current.children[0].focus();
        } else if (e.key === 'ArrowUp') {
            console.log('up');
        }
    }, []);

    React.useEffect(() => {
        window.addEventListener('click', clickOutside);
        window.addEventListener('keydown', arrowNavigation);

        return () => {
            window.removeEventListener('click', clickOutside);
            window.removeEventListener('keydown', arrowNavigation);
        };
    }, [clickOutside, arrowNavigation]);

    // fetching
    React.useEffect(() => {
        input.length > 1 ? setDropdown(true) : setDropdown(false);
        mutate(pathKey);
    }, [input, mutate]);

    const handleInput = (e) => {
        setInput(e.target.value);
    };

    return (
        <>
            <form
                className='form'
                action=''
            >
                <input
                    id='input'
                    autoComplete='off'
                    className='form__input'
                    type={'search'}
                    value={input}
                    onChange={handleInput}
                    onFocus={() => {
                        setDropdown(input.length > 1);
                    }}
                />

                <div
                    className='form__hints'
                    ref={focus}
                >
                    {!!data?.entries &&
                        data.entries.map((hint) => {
                            return (
                                <Hint
                                    key={hint.id}
                                    text={hint.hotel_title}
                                    tabIndex={0}
                                />
                            );
                        })}
                </div>
            </form>
            <style jsx>
                {`
                    form {
                        position: relative;
                        width: 100%;
                    }

                    .form__input {
                        width: 100%;
                        line-height: 2;
                        font-size: 1.5rem;
                        padding-inline: 1rem;
                    }

                    .form__hints {
                        display: ${dropdown ? 'block' : 'none'};
                        width: 100%;
                        max-height: 19rem;
                        position: absolute;
                        background-color: white;
                        border: 1px solid;
                        border-top: 0;
                        overflow-y: auto;
                    }
                `}
            </style>
        </>
    );
}
