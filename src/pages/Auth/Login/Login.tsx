import AuthForm from "@/components/AuthForm";
import { RedirectType } from "@/components/AuthForm/AuthForm";
import { loginFields } from "@/components/AuthForm/AuthForm.fields";
import config from "@/config";
import { useDocumentTitle } from "@/hooks"
import { login } from "@/services/authAPI";
import cookieUtils from "@/services/cookieUtils";
import { message } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    useDocumentTitle('Login | Nekolingo');

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();

    const onFinish = async (values: any) => {
        try {
            setIsSubmitting(true);
            const response = await login(values);
            if (!response.data.data) throw response.data;
            else {
                await messageApi.open({
                    type: 'success',
                    content: response.data.message || "Login successfully", 
                });
                cookieUtils.setItem(config.cookies.accessToken, response.data.data.accessToken);
                cookieUtils.setItem(config.cookies.refreshToken, response.data.data.refreshToken);
                cookieUtils.setItem(config.cookies.role, response.data.data.role);
                if (response.data.data.role === 1) navigate(config.routes.admin.dashboard)
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
        description: 'Don\'t have an account?',
        title: 'Register',
        url: '/register'
    }

    return (
        <>
            {contextHolder}
            <AuthForm
                formTitle="Login"
                buttonTitle="Login"
                fields={loginFields}
                redirect={registerRedirect}
                onFinish={onFinish}
                isSubmitting={isSubmitting}
            />
        </>
    )
}

export default Login