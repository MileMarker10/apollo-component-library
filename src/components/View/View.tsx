import React, { HTMLAttributes } from 'react';

/**
 * Div element that allows for extended templating options for interface components
 *
 * @return View component
 */
export const View = ({ children, ...props }: HTMLAttributes<HTMLDivElement>): JSX.Element => {
    return <div {...props}>{children}</div>;
};
