import styled from 'styled-components';
import { theme } from "@/themes";

// Container chính
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background: #fff;
  padding: 24px 0px 0px 0px;
`;

export const Step2Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: calc(100vh - 109px);
  background: #fff;
  padding: 0px !important;
`;

// Header (chứa nút “Quay lại” và ProgressBar)
export const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  height: 60px;
  background: #f9f9f9;
  justify-content: center;
`;

// Nút Quay lại
export const BackButton = styled.button`
  background: none;
  border: none;
  color: #ddd;
  font-size: 16px;
  cursor: pointer;
      transition: 0.2s;

  &:hover {
    color: #000000;
  }
`;

// Khu vực hiển thị nội dung từng step
export const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  // padding: 24px;
`;

export const Step2ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: 40px;
`;

// Footer (chứa nút “Tiếp tục”)
export const Footer = styled.div`
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #eee;
`;

/* Các style dùng chung cho các Step component */
// Bao bọc mỗi màn hình step
export const StepContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  text-align: center;
`;

// // Nút lớn (Get Started, Tôi đã có tài khoản, Tiếp tục, v.v.)
// export const ButtonLarge = styled.button`
//   background: #4caf50;
//   color: white;
//   border: none;
//   border-radius: 4px;
//   padding: 16px 32px;
//   font-size: 18px;
//   cursor: pointer;
//   margin: 12px;
//   &:hover {
//     background: #45a049;
//   }
// `;

// Ảnh Neko cho step 2
export const NekoImage = styled.img`
  width: 200px;
  height: 200px;
  // height: auto;
  margin-bottom: 24px;
`;

// Văn bản chào mừng ở step 2
export const WelcomeText = styled.p`
  position: relative;
  display: inline-block;
  background: #fff;
  color: #333;
  padding: 12px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  font-size: 20px;
  // max-width: 300px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &::after {
    content: "";
    position: absolute;
    bottom: -17px;
    left: 136px;
    width: 0;
    height: 0;
    border: 10px solid transparent;
    border-top-color: #fff;
  }

  &::before {
    content: "";
    position: absolute;
    // bottom: -8px;
    // left: 41px;
    bottom: -20px;
    left: 137px;
    width: 0;
    height: 0;
    border: 9px solid transparent;
    border-top-color: #e0e0e0 ;
  }
`;


// Lưới các lựa chọn
export const OptionGrid = styled.div`
  // display: grid;
  // grid-template-columns: repeat(2, 1fr);
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  max-width: 600px;
`;

// Thẻ chứa mỗi lựa chọn (màu nền, viền, hover, trạng thái đúng/sai)
export const OptionCard = styled.div`
display: flex;
gap: 20px;
align-items: center;
  background: #fff;
  border-top: 1px solid #eee;
  border-left: 1px solid #eee;
  border-right: 1px solid #eee;
  border-bottom: 4px solid #eee;
  border-radius: 20px;
  padding: 20px 20px;
  cursor: pointer;
  transition: border 0.2s, background 0.2s;
  &:hover {
    border-color: #ccc;
  }
  &.selected {
    border-color: #1890ff;
    background: #e6fdff;
  }
  &.correct {
    background: #c8f7c5;
    border-color: #4caf50;
  }
  &.wrong {
    background: #f8d7da;
    border-color: #ff4d4f;
  }
`;

// Danh sách kết quả (step 7)
export const ResultList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  max-width: 600px;
`;

// Mỗi mục kết quả (step 7)
export const ResultItem = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px 10px;
  border: 1px solid #eee;
  border-radius: 20px;
`;

export const ResultContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

// Nhóm nút cuối (step 10)
export const FinalButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 24px;
`;




// Bao bọc toàn màn hình
// export const StepContainer = styled.div`
//   width: 100vw;
//   height: 100vh;
//   background: #fff;
//   display: flex;
//   flex-direction: column;
// `;

/* INTRO CONTAINER: chứa 2 cột (ảnh bên trái, nội dung bên phải) */
export const IntroContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  /* Padding để không bị dính cạnh */
  padding: 0 40px;
`;

/* Cột ảnh bên trái */
export const LeftImage = styled.img`
  width: 40%;
  max-width: 500px;
  height: auto;
  object-fit: contain;
`;

/* Cột nội dung bên phải */
export const RightContent = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 40px;
`;

/* Tiêu đề chính */
export const TitleText = styled.h2`
  font-size: 28px;
  font-weight: 600;
  color: #333;
  margin-bottom: 32px;
  text-align: center;
  line-height: 1.4;
`;

/* Nút màu xanh lớn */
export const ButtonLarge = styled.button`
  width: 240px;
  // background: #4caf50;
  background: ${theme.color.primary};
  border: 1px solid ${theme.color.primary};
  color: white;
  border-radius: 8px;
  padding: 14px 0;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
  margin-bottom: 16px;

  &:hover {
    border: 1px solid ${theme.color.primary};
    background: #ffffff;
    color: ${theme.color.primary};
  }
`;

/* Nút viền trắng (outline) */
export const OutlinedButton = styled.button`
  width: 240px;
  background: #fff;
  color: ${theme.color.processing};
  border: 2px solid ${theme.color.processing};
  border-radius: 8px;
  padding: 14px 0;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s;
  
  &:hover {
    color: #ffffff;
    background: ${theme.color.processing};
    border: 2px solid ${theme.color.processing};
  }
`;

/* Footer chứa chọn ngôn ngữ */
export const FooterLangSelector = styled.div`
  height: 80px;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
`;

/* Nút ngôn ngữ */
export const LangButton = styled.button`
  background: none;
  border: none;
  color: #666;
  font-size: 14px;
  cursor: pointer;
  padding: 8px 12px;
  transition: color 0.2s;
  
  &:hover {
    color: #333;
  }
`;

export const CatAsk = styled.div`
  display: flex;
  align-items: center;
  text-align: start;
  gap: 16px;
  width: 50%;
  
  h2 {
    position: relative;
    display: inline-block;
    background: #fff;
    color: #333;
    padding: 12px 16px;
    border: 2px solid #e0e0e0;
    border-radius: 12px;
    font-size: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    &::after {
      content: "";
      position: absolute;
      top: 18px; /* chỉnh dọc nếu cần */
      left: -18px;
      width: 0;
      height: 0;
      border: 10px solid transparent;
      border-right-color: #fff;
    }

    &::before {
      content: "";
      position: absolute;
      top: 19px;
      left: -20px;
      width: 0;
      height: 0;
      border: 9px solid transparent;
      border-right-color: #e0e0e0;
    }
  }
`;
  

export const CatImage = styled.img`
  width: 40%;
  max-width: 100px;
  height: auto;
  object-fit: contain;
`;

export const FlagImage = styled.img`
  width: 40%;
  max-width: 45px;
  height: auto;
  object-fit: contain;
  border-radius: 5px;
  border: 2px solid #eee;
`;

export const OptionGridSrc = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  width: 100%;
  max-width: 600px;
`;

export const GoalCard = styled.div`
display: flex;
justify-content: space-between;
gap: 20px;
align-items: center;
  background: #fff;
  border-top: 1px solid #eee;
  border-left: 1px solid #eee;
  border-right: 1px solid #eee;
  border-bottom: 4px solid #eee;
  border-radius: 20px;
  padding: 10px 20px;
  cursor: pointer;
  transition: border 0.2s, background 0.2s;
  &:hover {
    border-color: #ccc;
  }
  &.selected {
    border-color: ${theme.color.primary};
    background: #e6fdff;
  }
  &.correct {
    background: #c8f7c5;
    border-color: #4caf50;
  }
  &.wrong {
    background: #f8d7da;
    border-color: #ff4d4f;
  }
`;