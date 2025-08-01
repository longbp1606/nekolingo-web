import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyEmail } from "@/services/authAPI";
import { Spin } from "antd";
import { Container, ResultBox, ReturnButtonWrapper } from "./VerifyResult.styled";
import Button from "@/components/Button";
import config from "@/config";

const VerifyResult = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
    const [message, setMessage] = useState("");
    const hasVerified = useRef(false);

    const handleVerifyEmail = async () => {
        try {
            const response = await verifyEmail(token!);
            if (response.status === 200) {
                setStatus("success");
                setMessage(response.data.message);
            }
        } catch (error: any) {
            setStatus("error");
            setMessage(error.response?.data?.message || "Verification failed.");
        }
    }

    useEffect(() => {
        if (!token) {
            setStatus("error");
            setMessage("Invalid or missing verification token.");
            return;
        }

        if (!hasVerified.current) {
            handleVerifyEmail();
            hasVerified.current = true;
        }

    }, [location.search]);

    const handleReturnLogin = () => {
        navigate(config.routes.public.login);
    };

    return (
        <Container>
            <ResultBox>
                {status === "loading" && <Spin />}
                {status === "success" && (
                    <>
                        <div style={{ fontSize: 48, color: "#4caf50" }}>✔️</div>
                        <div style={{ marginTop: 16, fontWeight: 500 }}>{message}</div>
                    </>
                )}
                {status === "error" && (
                    <>
                        <div style={{ fontSize: 48, color: "#f44336" }}>❌</div>
                        <div style={{ marginTop: 16, fontWeight: 500 }}>{message}</div>
                    </>
                )}
                <ReturnButtonWrapper>
                    <Button onClick={handleReturnLogin} size="medium" title={"Quay về đăng nhập"}/>
                </ReturnButtonWrapper>
            </ResultBox>
        </Container>
    );
};

export default VerifyResult;