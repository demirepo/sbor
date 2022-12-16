import React from 'react';
import Dropdown from './Dropdown';
import Spinner from './Spinner';

export default function Hotels() {
    const [input, setInput] = React.useState('');
    const [output, setOutput] = React.useState([]);

    const fixInput = (string) => {
        let hotels = new Set(
            string
                .trim()
                .split('\n')
                .filter((el) => el !== '')
                .map((el) => {
                    return el.trim();
                })
        );

        let sorted = [...hotels].sort();
        setOutput(sorted);
    };

    const addHotelsToDB = (hotels) => {
        fetch('http://localhost:3000/api/hotel', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify(hotels),
        })
            .then((response) => {
                if (!response.ok) {
                    throw Error('Error while fetching');
                }
                return response.json();
            })
            .then((data) => {
                console.log('Отели добавлены');
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    return (
        <>
            <Dropdown />

            <br />
            <div className='container'>
                <textarea
                    className='block'
                    value={input}
                    onChange={(e) => {
                        setInput(e.target.value);
                    }}
                ></textarea>

                <div className='block'>
                    {output.map((el, index) => {
                        return <p key={index}>{el}</p>;
                    })}
                </div>
            </div>
            <div className='buttons'>
                <button
                    onClick={() => {
                        fixInput(input);
                    }}
                >
                    Упорядочить
                </button>
                <button
                    onClick={() => {
                        addHotelsToDB(output);
                    }}
                >
                    Добавить все отели в базу
                </button>
            </div>
            <div>{output.length}</div>

            <style jsx>
                {`
                    .container {
                        display: flex;
                        width: 100%;
                        border: 1px solid;
                        padding: 0;
                    }

                    .container > * {
                        flex-basis: 100%;
                    }

                    textarea {
                        padding: 0.5rem;
                    }

                    .block {
                        min-height: 20rem;
                        max-height: 20rem;
                        overflow: auto;
                        resize-y: auto;
                    }

                    .buttons {
                        display: flex;
                        justify-content: space-evenly;
                        gap: 1rem;
                        width: 100%;
                        margin-top: 1rem;
                    }

                    .buttons > * {
                        flex-basis: 100%;
                    }

                    button {
                        display: block;
                        padding: 0.1rem 1rem;
                    }
                `}
            </style>
        </>
    );
}
