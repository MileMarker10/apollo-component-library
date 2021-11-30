import React, { HTMLAttributes, ReactNode } from 'react';
import { Text } from '../Text/Text';
import './Radio.css';

export interface Props extends HTMLAttributes<HTMLInputElement> {
    /** You can define an element pertaining to radio */
    children?: ReactNode;
    /** Determines whether input is disabled */
    disabled?: boolean;
    /** Value that the radio represents*/
    value: string;
    /** Determines whether component is checked */
    checked?: boolean;
}

/**
 * An input component that belongs to a list of others where when selected is the only
 * representative value of that group.
 *
 * @return Radio component
 */
export const Radio: React.FC<Props> = ({ children, className, ...props }: Props): JSX.Element => {
    return (
        <label>
            <input
                {...props}
                type="radio"
                className={`apollo-component-library-radio-component ${className}`}
            />
            <Text inline margins>
                {children}
            </Text>
        </label>
    );
};

Radio.displayName = 'Radio';
