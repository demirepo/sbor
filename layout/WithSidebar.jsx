import React from 'react';
import classnames from 'classnames';
import Hotels from '../components/Hotels';

export default function withSidebar({ sidebar }) {
  return (
    <main>
      <div className={classnames('with-sidebar', 'container')}>
        {sidebar}
        <div className={classnames('stack', 'center')}>
          <h2 style={{ marginBlock: '3rem' }}>Выбор отелей</h2>

          <Hotels />

          <hr style={{ marginBlock: '2rem' }} />
        </div>
      </div>
    </main>
  );
}
