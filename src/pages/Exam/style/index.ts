import styled from "styled-components";
import { device } from "@/style/breakpoint";

export const StylesExam = styled.div`
  .exam {
    display: flex;
    box-sizing: border-box;
    .exam-content {
      width: 75%;
      height: 100vh;
      display: flex;
      flex-direction: column;
      .exam-header-mobile {
        display: none;
      }
      .exam-info {
        height: 165px;
        width: 100%;
        box-sizing: border-box;
        padding: 20px 25px;
        background-color: #d9d9d9;
        border: 1px solid #000;

        h3 {
          margin: 0;
          font-size: 24px;
          font-weight: 700;
          height: 61px;
          align-content: center;
        }
        p {
          margin: 0;
          height: 39px;
          align-content: center;
          font-size: 20px;
          font-weight: 400;
        }
      }
    }
    .exam-navbar {
      width: 25%;
    }
    .ant-progress-text {
      display: none;
    }
    .ant-progress-inner {
      background-color: #bab7b7 !important;
    }
    .ant-progress-bg {
      height: 21px !important;
      background: #41c54e !important;
    }
    .ant-progress-inner,
    .ant-progress-bg {
      border-radius: 4px !important;
    }
    .ant-space-item {
      margin-bottom: 10px;
    }
    .ant-space-item span {
      font-size: 24px;
      font-weight: 400;
    }
    .ant-radio-group {
      margin-left: 40px;
    }
    .ant-radio-inner {
      width: 36px;
      height: 36px;
      border: 1px solid #000;
      border-radius: 4px;
    }
    .exam-desc {
      display: flex;
      flex: 1;
      flex-direction: column;
      justify-content: space-between;
      width: 100%;
      box-sizing: border-box;
      background-color: #c4c4c4;
      padding: 50px;
      .exam-ques {
        p {
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 30px;
        }
      }
      .exam-action {
        display: flex;
        justify-content: space-between;
      }
      .exam-btn {
        width: 163px;
        height: 60px;
        border-radius: 4px;
        border: 1px solid #000;
        background-color: #eee7a9;
        span {
          font-size: 20px;
          font-weight: 700;
        }
      }
      .hide-btn {
        opacity: 0;
        visibility: hidden;
        user-select: none;
      }
    }
    .exam-navbar {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      background-color: #d9d9d9;
      border: 1px solid #000;
      padding: 50px 40px;
      .question-list {
        display: flex;
        flex-wrap: wrap;
        gap: 20px 13px;
      }
      .btn-submit {
        width: 233px;
        height: 82px;
        border-radius: 41px;
        background-color: #9f9d9f;
        span {
          font-size: 24px;
          font-weight: 700;
        }
      }
    }
    .btn-moveto {
      display: none;
      width: 233px;
      height: 63px;
      position: fixed;
      bottom: 0;
      border-radius: 41px;
      outline: none;
      border: none;
      background-color: #9f9d9f;
      font-size: 20px;
      font-weight: 700;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    @media ${device.lg} {
      .exam-desc {
        padding-bottom: 100px;
      }
      .exam-content {
        width: 100%;
        position: relative;
      }
      .exam-navbar {
        display: none;
      }
      .btn-moveto {
        display: block;
      }
      .ant-space-item span {
        font-size: 18px;
      }
      .ant-radio-inner {
        width: 24px;
        height: 24px;
      }
    }
    @media ${device.sm} {
      .exam-header-mobile {
        padding: 12px 0;
        width: 100%;
        text-align: center;
        display: block !important;
        background-color: #545151;
        color: #fff;
        font-size: 16px;
        font-weight: 700;
      }
      .exam-content {
        .exam-info {
          padding: 10px;
          height: auto;
          h3 {
            display: none;
          }
          p {
            font-size: 16px;
          }
        }
        .exam-desc {
          padding: 20px 10px 90px 10px;
          .exam-ques {
            p {
              font-size: 18px;
            }
          }
          .ant-radio-group {
            margin-left: 10px;
          }
          .ant-space-item span {
            font-size: 16px;
          }
          .exam-btn {
            width: 130px;
            height: 50px;
            span {
              font-size: 16px;
            }
          }
        }
      }
      .btn-moveto {
        width: 180px;
        height: 45px;
      }
    }
  }
`;
