import { device } from "@/style/breakpoint";
import styled from "styled-components";

export const StylesNewTopic = styled.div`
  flex: 1;
  .user-manager {
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;
    height: 100vh;
    background-color: #c4c4c4;
    .manager-content {
      flex: 1;
      box-sizing: border-box;
      padding: 20px 60px 0 60px;
      .manager-heading {
        font-weight: 700;
        font-size: 20px;
        margin-bottom: 10px;
      }
      .form-action {
        margin-top: 40px;
        .new-topic-action {
          margin-top: 30px;
          .test-select {
            label {
              font-size: 18px;
              font-weight: 700;
              padding-right: 10px;
            }
          }
        }
        .ant-input-group-addon {
          font-weight: 700;
          font-size: 18px;
          border: none;
          background-color: transparent;
          padding: 0 10px 0 0;
        }
        .ant-input-group-wrapper {
          width: 80%;
          height: 45px;
          .ant-input {
            height: 45px;
            border-radius: 0;
          }
        }
      }
      .btn-add {
        display: block;
        margin: 16px auto 0 auto;
        border-radius: 0px;
        span {
          font-weight: 700;
        }
      }
    }
    @media ${device.lg} {
      .manager-content {
        .form-action {
          padding: 0;
        }
      }
    }
    @media ${device.sm} {
      .manager-content {
        padding: 10px;
      }
      h3 {
        display: none;
      }
      .form-action {
        margin-top: 0 !important;
        .new-topic-action {
          flex-direction: column;
          align-items: flex-start;
          gap: 4px;
          margin-top: 6px;
          .ant-input-group-wrapper {
            width: 80%;
          }
        }
        .btn-add {
          margin-top: 6px !important;
        }
      }
    }
  }
`;
