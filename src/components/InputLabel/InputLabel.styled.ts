import styled from 'styled-components';

export const InputWithLabel = styled.div`
  position: relative;
  width: 100%;
`;

export const InputWrapper = styled.div`
  position: relative;
    width: 100%;

    .input-field {
    padding: 12px;
    border-radius: 6px;
    outline: none; // Bỏ outline mặc định của input
    height: 36px;
}

.label {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 14px;
    pointer-events: none;
    transition: all 0.2s ease-in-out;
    background-color: transparent;
  }

  .label.active {
    top: -6px;
    left: 12px;
    padding: 0 4px;
    font-size: 12px;
    z-index: 1 !important;
    display: inline-block;
    line-height: 1;
    background-color: #fff;
    height: 7px;
    transform: none;
  }
  .label.disabled {
    background-color: rgba(245, 245, 245, 0.568) !important;
  }
`;
