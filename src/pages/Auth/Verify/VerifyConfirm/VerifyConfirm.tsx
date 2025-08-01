import React from "react";
import { Container, Icon, Message, Mascot } from "./VerifyConfirm.styled";
import { MailOutlined } from "@ant-design/icons";
import catHi from "@/assets/cat-hi.png";

const VerifyConfirm: React.FC = () => (
  <Container>
    <Mascot src={catHi} alt="Waving Cat Mascot" />
    <Icon>
      <MailOutlined style={{ fontSize: 64, color: "#1890ff" }} />
    </Icon>
    <Message>
      <span role="img" aria-label="wave">👋</span> Yay! One last step...<br />
      Please check your mailbox for a verification email.<br />
      Click the link in the email to verify your account and join the Nekolingo family! <span role="img" aria-label="cat">🐾</span>
    </Message>
  </Container>
);

export default VerifyConfirm;