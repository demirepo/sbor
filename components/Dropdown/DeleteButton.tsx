import { ButtonProps } from '../../types';

export default function DeleteButton({ onClick }: ButtonProps) {
  return (
    <button
      aria-label='Удалить'
      className='control-button'
      onClick={onClick}
    >
      <svg
        style={{ width: '100%', height: '100%' }}
        viewBox='0 0 24 24'
      >
        <path
          fill='currentColor'
          d='M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z'
        />
      </svg>

      <style jsx>{`
        .control-button {
          border: none;
          margin-left: 1rem;
          width: 50px;
          height: 50px;
        }
      `}</style>
    </button>
  );
}
