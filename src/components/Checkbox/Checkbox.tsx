import React from 'react';
import type { HTMLAttributes } from 'react';
import type { ReactNode } from 'react';
import type { FC } from 'react';
import { Text } from '../Text/Text';
import './Checkbox.css';

export interface Props extends HTMLAttributes<HTMLInputElement> {
    /**  Can have children between tags */
    children?: ReactNode;
    /** Value that the checkbox represents */
    value: string;
    /** Determines whether the user can change the input */
    disabled?: boolean;
    /** Determines whether component is checked or not */
    checked?: boolean;
}

/**
 * An input object that is a list of items where a single entry can be selected
 *
 * @return Checkbox component
 */
export const Checkbox: FC<Props> = ({ children, className, disabled = false, ...props }) => {
    return (
        <label>
            <input
                {...props}
                type="checkbox"
                disabled={disabled}
                className={`apollo-component-library-checkbox-component ${className}`}
            />
            <Text inline margins>
                {children}
            </Text>
        </label>
    );
};
