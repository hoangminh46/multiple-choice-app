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
  }
`;
