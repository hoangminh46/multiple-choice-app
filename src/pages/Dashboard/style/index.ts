import styled from "styled-components";
import { device } from "@/style/breakpoint";

export const StylesDashboard = styled.div`
  .dashbroad {
    display: flex;
    height: 100vh;
    .user {
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 20%;
      padding: 40px 20px 20px 20px;
      background-color: #d9d9d9;
      border: 1px solid #929191;
      .user-image {
        max-width: 180px;
        margin: 0 auto;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .user-info p {
        font-size: 20px;
        font-weight: 700;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-top: 20px;
      }
      .btn-logout {
        display: block;
        margin: 0 auto;
        width: 174px;
        height: 60px;
        background-color: #c9cbcb;
        border: 1px solid #979898;
        font-size: 20px;
        font-weight: 400;
      }
    }
    .quiz {
      display: flex;
      flex-direction: column;
      flex: 1;
      background-color: #c4c4c4;
      padding: 20px 40px;
      .quiz-action {
        display: flex;
        gap: 30px;
        .quiz-search {
          border-radius: 4px;
          input,
          .ant-input-group-addon button {
            height: 63px;
          }
          input {
            padding: 0 20px;
            background-color: #f3f1f1;
            border-top: 1px solid #000000;
            border-left: 1px solid #000000;
            border-bottom: 1px solid #000000;
          }
          button {
            width: 115px;
            font-size: 40px;
            background-color: #fff;
            border-top: 1px solid #000000;
            border-right: 1px solid #000000;
            border-bottom: 1px solid #000000;
            color: #000000;
          }
        }
        .select-container {
          position: relative;
          width: 283px;
          border: 1px solid #000;
          border-radius: 4px;
          .ant-select-arrow {
            display: none;
          }
          .select-arrow {
            position: absolute;
            right: 5%;
            top: 25%;
            user-select: none;
            pointer-events: none;
          }
        }
        .quiz-select {
          width: 283px;
          height: 63px;
        }
      }
      .quiz-list {
        display: flex;
        justify-content: space-between;
        flex: 1;
        box-sizing: border-box;
        flex-wrap: wrap;
        gap: 35px 0;
        margin-top: 40px;
        border-radius: 4px;
        width: 100%;
        background-color: #d9d9d9;
        padding: 30px 80px;
      }
      .quiz-pagination {
        width: auto;
        margin: 14px auto 30px auto;
      }
    }
  }
  @media ${device.lg} {
    .dashbroad {
      flex-direction: column;
    }
    .user {
      display: none !important;
    }
    .select-container {
      display: none;
    }
    .quiz-list {
      overflow-y: scroll;
    }
  }
  @media ${device.md} {
    .quiz-list {
      justify-content: center !important;
    }
  }
  @media ${device.sm} {
    .quiz {
      padding: 15px !important;
    }
    .quiz-list {
      flex: unset !important;
      margin-top: 10px !important;
      gap: 30px !important;
      padding: 12px 8px !important;
      height: 65vh;
    }

    .dashbroad .quiz .quiz-action .quiz-search button {
      width: 65px;
    }
  }
`;
