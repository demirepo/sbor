import React from 'react';

export default function DropdownOption({ id, text, onClick }) {
  return (
    <>
      <button
        className='option'
        onClick={onClick}
        data-id={id}
      >
        <p
          style={{ display: 'block' }}
          data-option-text
          className='hint__text'
        >
          {text}
        </p>
      </button>

      <style jsx>
        {`
          .option {
            display: flex;
            align-items: center;
            width: 100%;
            padding: 0.5rem 1rem;
            cursor: pointer;
            border: none;
            outline: none;
          }

          .option:hover,
          .option:focus {
            background-color: hsl(200 9% 87%);
          }

          .hint__text {
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            cursor: pointer;
          }
        `}
      </style>
    </>
  );
}
