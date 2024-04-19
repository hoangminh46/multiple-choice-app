import styled from "styled-components";
import { device } from "@/style/breakpoint";

export const StylesLogin = styled.div`
  .login {
    box-sizing: border-box;
    position: absolute;
    width: 36%;
    height: 80%;
    padding: 0 60px;
    background-color: #999595;
    border: 3px solid #fbbc1a;
    top: 15%;
    right: 8%;
    .login-header {
      position: absolute;
      top: -10%;
      left: 35%;
      padding: 0 10px 10px 10px;
      background-color: #999595;
      width: 25%;
      border: 3px solid #fbbc1a;
      border-radius: 50%;
      img {
        width: 100%;
      }
    }
    .form-login {
      margin-top: 30%;
      .login-input {
        height: 70px;
        font-size: 20px;
        border-radius: 4px;
        padding: 0 !important;
        .login-logo {
          padding: 20px;
          font-size: 35px;
        }
        input {
          padding: 0 10px;
          background-color: #f3f1f1;
        }
      }
      .second-input {
        margin-top: 40px;
      }
    }
    .login-checkbox {
      margin-top: 15px;
      font-weight: bold;
      color: #454242;
    }
    .login-btn {
      display: block;
      margin-top: 40px;
      width: 100%;
      height: 50px;
      border-radius: 4px;
      background-color: #d9d9d9;
      color: #000;
      span {
        font-size: 16px;
        font-weight: 700;
      }
    }
  }
  @media ${device.md} {
    width: 60%;
  }
  @media ${device.lg} {
    .login {
      width: 80% !important;
      height: 60%;
      padding: 0 60px;
      top: 25%;
      right: 10%;
      border-radius: 6px;
      .login-header {
        padding: 10px 10px 0 10px;
      }
    }
  }
  @media ${device.sm} {
    .login {
      width: 80%;
      height: 55%;
      padding: 0 60px;
      top: 35%;
      right: 10%;
      border-radius: 6px;
      .login-header {
        width: 20%;
        height: 16%;
        left: 36%;
        padding: 10px;
      }
      .login-input {
        height: 50px !important;
        input {
          font-size: 16px;
        }
        .login-logo {
          padding: 10px !important;
        }
      }
      .second-input {
        margin-top: 20px !important;
      }
    }
    .login-btn {
      margin-top: 0 !important;
    }
  }
  @media ${device.xs} {
    .login-header {
      padding: 10px !important;
    }
    .login-logo {
      padding: 6px 12px !important;
      font-size: 24px !important;
    }
    .login-btn {
      height: 35px !important;
      margin-top: 30px !important;
    }
  }
`;
