import { device } from "@/style/breakpoint";
import styled from "styled-components";

export const StylesNewTest = styled.div`
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
        padding: 0 80px;
        margin-top: 20px;
        .ant-input-group-wrapper {
          width: 80%;
          height: 45px;
          .ant-input {
            height: 45px;
            border-radius: 0;
          }
        }
        .question {
          width: 100%;
          box-sizing: border-box;
          display: flex;
          gap: 40px;
          margin-top: 30px;
          .question-item {
            box-sizing: border-box;
            width: 80%;
            height: 410px;
            background-color: #fff;
            padding: 20px;
            th,
            td {
              padding: 10px;
            }
            .question-heading {
              text-align: center;
              font-weight: 700;
              font-size: 18px;
              margin-bottom: 14px;
            }
            label {
              display: block;
              white-space: nowrap;
              width: 90%;
              max-width: 400px;
              overflow: hidden;
              text-overflow: ellipsis;
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
        .btn-add {
          display: block;
          margin: 16px auto 0 auto;
          border-radius: 0px;
          span {
            font-weight: 700;
          }
        }
      }
      .new-test-action {
        display: flex;
        gap: 60px;
        align-items: center;
        margin-top: 20px;
        .ant-input-group-wrapper {
          width: 25%;
        }
        .test-select {
          label {
            font-size: 18px;
            font-weight: 700;
            padding-right: 10px;
          }
        }
        .ant-checkbox-wrapper {
          span {
            font-weight: 700;
            font-size: 18px;
          }
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
        .new-test-action {
          flex-direction: column;
          align-items: flex-start;
          gap: 4px;
          margin-top: 6px;
          .ant-input-group-wrapper {
            width: 80%;
          }
        }
        .question {
          margin-top: 10px !important;
          flex-direction: column;
          gap: 20px !important;
          .question-item {
            padding: 6px !important;
            height: 155px !important;
            width: 100% !important;
            .ant-pagination {
              margin: 0;
            }
            .ant-empty-normal {
              margin-block: 0;
            }
            li {
              height: 24px;
              min-width: 24px;
              a {
                line-height: normal;
              }
            }
            th,
            td {
              padding: 4px !important;
            }
            .question-heading {
              margin-bottom: 4px !important;
            }
            label {
              max-width: 250px !important;
            }
          }
        }
        .btn-add {
          margin-top: 6px !important;
        }
      }
    }
  }
`;
