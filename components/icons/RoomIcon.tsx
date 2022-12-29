interface RoomIconProps {
  className?: string;
  width?: string;
  height?: string;
}

export default function RoomIcon({ className = 'room-svg', width = '24px', height = '24px' }: RoomIconProps) {
  return (
    <>
      <svg
        style={{ width: width, height: height }}
        viewBox='0 0 24 24'
        className={className}
      >
        <path
          fill='currentColor'
          d='M8,3C6.89,3 6,3.89 6,5V21H18V5C18,3.89 17.11,3 16,3H8M8,5H16V19H8V5M13,11V13H15V11H13Z'
        />
      </svg>

      <style jsx>
        {`
          .room-svg {
            margin-left: 2rem;
            margin-right: 0.5rem;
            flex-shrink: 0;
          }
        `}
      </style>
    </>
  );
}
