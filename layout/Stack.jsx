import React from 'react';
import classNames from 'classnames';
import styles from '../styles/layout/Stack.module.scss';

export default function Stack({
    children,
    space = 16,
    element = 'div',
    recursive,
}) {
    const margin = {
        8: styles.mt5,
        16: styles.mt16,
        24: styles.mt24,
        32: styles.mt32,
        40: styles.mt40,
        48: styles.mt48,
        64: styles.mt64,
    };

    const className = classNames(
        styles.stack,
        margin[`${space}`],
        recursive && styles.recursive
    );

    return React.createElement(element, { className }, children);
}
