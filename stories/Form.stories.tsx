import React from 'react';
import { Meta, Story } from '@storybook/react';

import { Form, Props } from '../src/components/Form/Form';
import { Button, TextInput, Text, Group, Radio, Label, Checkbox } from '../src';

const meta: Meta = {
    title: 'Form/Form',
    component: Form,
};

export default meta;

/**
 * Checks if the password matches the validator requirements
 *
 * @param value value in the input
 * @return object describing validaty and errors
 */
const passwordValidator = (value: string): string | null => {
    if (value.length < 8) return 'Password must be 8 characters';

    return null;
};

/**
 * Default form
 *
 * @return Default form
 */
export const TextInputForm = (): JSX.Element => (
    <Form
        onSubmit={(event, value) => window.alert('Success!')}
        onChange={(value) => console.log(value)}
    >
        <Text header={1} bold margins>
            Log in
        </Text>
        <Label value="Username">
            <TextInput name="username" required placeholder="UserName" />
        </Label>
        <br />
        <Label value="Password" hint="Password must be 8 characters long">
            <TextInput
                password
                required
                name="password"
                placeholder="********"
                validator={passwordValidator}
            />
        </Label>
        <br />
        <Button>Submit</Button>
    </Form>
);

/**
 * Checks if the appropriate number of checkboxes are ticked
 *
 * @param value checkbox string
 * @return error message if applicable
 */
const checkboxValidator = (value: string | string[]): string | null => {
    return value.length < 2 ? 'Please select at least 2 options' : null;
};

/**
 * Group form
 *
 * @return group form
 */
export const GroupForm = (): JSX.Element => (
    <Form
        onSubmit={(event, value) => window.alert('Success!')}
        onChange={(value) => console.log(value)}
    >
        <Label value="Options for stuff" hint="Please select two">
            <Group required type="checkbox" name="options" validator={checkboxValidator}>
                <Checkbox value="option-1">Option 1</Checkbox>
                <Checkbox value="option-2">Option 2</Checkbox>
                <Checkbox value="option-3">Option 3</Checkbox>
            </Group>
        </Label>
        <br />
        <Button>Submit</Button>
    </Form>
);