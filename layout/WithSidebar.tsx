import React from 'react';
import classnames from 'classnames';
import Hotels from '../components/Hotel/Hotels';

interface WithSidebarProps {
  sidebar: React.ReactNode;
  currentDate: Date;
}

export default function WithSidebar({ sidebar, currentDate }: WithSidebarProps) {
  return (
    <main>
      <div className={classnames('with-sidebar', 'container')}>
        {sidebar}
        <div className={classnames('stack', 'center')}>
          <h2 style={{ marginTop: '3rem', marginBottom: '1rem' }}>Выбор отелей</h2>

          <Hotels currentDate={currentDate} />

          <hr style={{ marginBlock: '2rem' }} />
        </div>
      </div>
    </main>
  );
}
