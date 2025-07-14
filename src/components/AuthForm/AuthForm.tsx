import { Form, Row } from 'antd'
import React from 'react'
import { FieldType } from './AuthForm.fields';
import * as FormStyled from './AuthForm.styled';
import Button from '../Button';
import { Loading3QuartersOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

export type RedirectType = {
    description: string;
    title: string;
    url: string;
}

type AuthFormProps = {
    className?: string;
    page?: string;
    formTitle: string;
    buttonTitle: string;
    fields: FieldType[];
    redirect: RedirectType;
    onFinish?: (values: unknown) => void;
    onFinishFailed?: (errorInfo: unknown) => void;
    isSubmitting?: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({
    className,
    formTitle,
    buttonTitle,
    fields,
    redirect,
    onFinish,
    onFinishFailed,
    isSubmitting
}) => {
    return (
        <>
            <Row>

            </Row>
            <FormStyled.AuthForm className={className}>
                <FormStyled.FormRow>
                    <FormStyled.FormContainer>
                        <FormStyled.FormTitle>{formTitle}</FormStyled.FormTitle>

                        <FormStyled.FormWrapper
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            layout='vertical'
                            autoComplete='off'
                        >
                            {fields.map((field) => (
                                <Form.Item
                                    key={field.key}
                                    name={field.name}
                                    rules={field.rules}
                                    validateFirst
                                >
                                    {field.children}
                                </Form.Item>
                            ))}

                            <Form.Item>
                                <Button
                                    title={isSubmitting ? <Loading3QuartersOutlined spin/> : buttonTitle}
                                    className='w-full'
                                    size='medium'
                                    disabled={isSubmitting}
                                    htmlType={'submit'}
                                />
                            </Form.Item>
                        </FormStyled.FormWrapper>

                        <FormStyled.FormRedirect>
                            {redirect.description}

                            <Link to={redirect.url}>
                                {redirect.title}
                            </Link>
                        </FormStyled.FormRedirect>
                    </FormStyled.FormContainer>
                </FormStyled.FormRow>
            </FormStyled.AuthForm>
        </>
    )
}

export default AuthForm