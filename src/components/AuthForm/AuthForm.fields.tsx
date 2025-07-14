import { Rule } from "antd/es/form"
import Input from "../Input";

export type FieldType = {
    key: string;
    label: string;
    name: string;
    rules: Rule[];
    children: JSX.Element;
    initialValue?: string;
}

const validateWhitespace = (_: unknown, value: string) => {
    if (value.trim().length === 0) {
        return Promise.reject('This field is required');
    }
    return Promise.resolve();
}

export const loginFields: FieldType[] = [
    {
        key: 'email',
        label: 'Email',
        name: 'email',
        rules: [
            {
                required: true,
                type: 'email',
                message: 'Invalid email format',
            },
            {
                validator: validateWhitespace,
            },
        ],
        children: <Input placeholder="Email" className="w-full" size="large"/>,
    },
    {
        key: 'password',
        label: 'Password',
        name: 'password',
        rules: [
            {
                required: true,
                message: 'Please input your password!',
            },
            {
                min: 8,
                pattern: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,16}$/,
                message: 'Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number',
            },
            {
                validator: validateWhitespace,
            },
        ],
        children: <Input placeholder="Password" className="w-full" size="large" type="password"/>,
    }
]

export const registerFields: FieldType[] = [
    {
        key: 'username',
        label: 'Username',
        name: 'username',
        rules: [],
        children: <Input placeholder="Username (Optional)" className="w-full" size="large"/>,
    },
    {
        key: 'email',
        label: 'Email',
        name: 'email',
        rules: [
            {
                required: true,
                type: 'email',
                message: 'Invalid email format',
            },
            {
                validator: validateWhitespace,
            },
        ],
        children: <Input placeholder="Email" className="w-full" size="large"/>,
    },
    {
        key: 'password',
        label: 'Password',
        name: 'password',
        rules: [
            {
                required: true,
                message: 'Please input your password!',
            },
            {
                min: 8,
                pattern: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,16}$/,
                message: 'Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number',
            },
            {
                validator: validateWhitespace,
            },
        ],
        children: <Input placeholder="Password" className="w-full" size="large" type="password"/>,
    }
]