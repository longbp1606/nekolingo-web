import styled from 'styled-components';

export const SelectWithLabel = styled.div`
  width: 100%;

  .custom-select-container {
  position: relative;

  .floating-label {
    position: absolute;
    top: 50%;
    left: 12px;
    transform: translateY(-50%);
    font-size: 0.75vw;
    color: black;
    background: white;
    transition: all 0.2s ease-in-out;
    pointer-events: none;
    z-index: 1;
  }

  &.focused .floating-label {
    top: 1px;
    left: 8px;
    font-size: 0.7vw;
    color: black;
    padding: 0px 5px;
  }

  &.disabled {
    .floating-label {
      color: #4f575e;
      background-color: rgba(245, 245, 245, 0.568) !important;
    }
    .ant-select-selector {
      background-color: #f5f5f5 !important;
    }
    .custom-select {
      background-color: #f5f5f5 !important;
      cursor: not-allowed;
      border-color: #d9d9d9; // Viền khi disabled
    }
  }

  .custom-select {
    transition: border-color 0.2s ease-in-out;

    &:focus {
      border-color: #40a9ff; // Border khi focus
    }

    &:focus + .floating-label {
      top: 1px;
      left: 8px;
      font-size: 12px;
      color: black;
      padding: 0px 5px;
    }
  }
}
`;
