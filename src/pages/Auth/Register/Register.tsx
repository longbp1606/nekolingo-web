/* eslint-disable @typescript-eslint/no-explicit-any */
import AuthForm from "@/components/AuthForm";
import { RedirectType } from "@/components/AuthForm/AuthForm";
import { registerFields } from "@/components/AuthForm/AuthForm.fields";
import config from "@/config";
import { login, register } from "@/services/authAPI";
import cookieUtils from "@/services/cookieUtils";
import { RootState } from "@/store";
import { message } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const registerInfo = useSelector((state: RootState) => state.register);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();

    const onFinish = async (values: any) => {
        try {
            setIsSubmitting(true);
            const response = await register({
                ...values,
                language_from: registerInfo.language_from,
                language_to: registerInfo.language_to,
                current_level: registerInfo.currentLevel,
            });
            if (response.status !== 201) throw response.data.message;
            else {
                await messageApi.open({
                    type: 'success',
                    content: response.data.message || "Register successfully",
                });
                localStorage.setItem('FIRST_STEP', 'true');
                const loginResponse = await login({
                    email: values.email,
                    password: values.password,
                });
                if (!loginResponse.data.data) throw loginResponse.data.message;
                else {
                    cookieUtils.setItem(config.cookies.accessToken, loginResponse.data.data.accessToken);
                    cookieUtils.setItem(config.cookies.refreshToken, loginResponse.data.data.refreshToken);
                    cookieUtils.setItem(config.cookies.role, loginResponse.data.data.role);
                }
                if (loginResponse.data.data.role === 1) navigate(config.routes.admin.language)
                else navigate(config.routes.public.home);
            }
        } catch (error: any) {
            if (error.response) messageApi.error(error.response.data.message);
            else messageApi.error(error.message ? error.message : 'Something went wrong');
        } finally {
            setIsSubmitting(false);
        }
    }

    const registerRedirect: RedirectType = {
        description: 'Hãy tạo tài khoản để lưu tiến trình học của bạn nha!',
        title: '',
        url: ''
    }

    return (
        <>
            {contextHolder}
            <AuthForm
                formTitle="Đăng ký tài khoản"
                buttonTitle="Đăng ký"
                fields={registerFields}
                redirect={registerRedirect}
                onFinish={onFinish}
                isSubmitting={isSubmitting}
            />
        </>
    )
}

export default Register