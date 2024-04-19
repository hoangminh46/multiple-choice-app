import styled from "styled-components";
import { device } from "@/style/breakpoint";

export const StylesUserManager = styled.div`
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
      padding: 40px 60px 0 60px;
      .manager-heading {
        font-weight: 700;
        font-size: 20px;
      }
      .manager-action {
        display: flex;
        margin-top: 30px;
        gap: 40px;
        .manager-search {
          border-radius: 4px;
          width: 60%;
          input {
            padding: 20px;
            background-color: #f3f1f1;
            font-size: 14px;
            border-left: 1px solid #000;
            border-top: 1px solid #000;
            border-bottom: 1px solid #000;
          }
          button {
            height: 63px;
            padding: 0 20px;
            font-size: 30px;
            border-right: 1px solid #000;
            border-top: 1px solid #000;
            border-bottom: 1px solid #000;
          }
        }
        .manager-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          height: 63px;
          width: 20%;
          background-color: #d9d9d9;
          border: 1px solid #000;
        }
      }
      .manager-detail {
        margin-top: 30px;
        .total-user {
          font-size: 20px;
          font-weight: bold;
        }
        .manager-list {
          margin-top: 30px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          .manager-item {
            box-sizing: border-box;
            padding: 25px 35px;
            border: 1px solid #000;
            background-color: #d9d9d9;
            border-radius: 4px;
            width: 75%;
            display: flex;
            justify-content: space-between;
            .item-action {
              display: flex;
              align-items: center;
              gap: 30px;
              img {
                cursor: pointer;
              }
            }
          }
        }
      }
    }
    .manager-pagination {
      position: fixed;
      bottom: 2%;
      left: 55%;
      transform: translate(-50%, -50%);
      
    }
    @media ${device.lg} {
      .manager-search {
        width: 70% !important;
      }
      .manager-btn {
        width: 30% !important;
      }
      .manager-item {
        width: 100% !important;
      }
      .manager-pagination {
        left: 50% !important;
      }
    }
    @media ${device.md} {
      .manager-content {
        box-sizing: border-box;
        padding: 20px;
        .manager-heading {
          display: none;
        }
        .manager-action {
          padding-left: 20px;
          margin-top: 10px;
          gap: 20px;
          .manager-search {
            width: 80% !important;
            input {
              padding: 10px;
              font-size: 14px;
            }
            button {
              height: 43px;
              padding: 0 10px;
              font-size: 20px;
            }
          }
          .manager-btn {
            border: none;
            background-color: transparent;
            width: 10% !important;
            height: 43px;
            padding: 0;
            p {
              display: none;
            }
          }
        }
        .manager-detail {
          margin-top: 15px;
          .manager-list {
            padding: 20px 10px;
            margin-top: 15px;
            background-color: #d9d9d9;
          }
          .manager-item {
            padding: 6px !important;
            .item-desc p {
              font-size: 14px;
            }
            .item-action img {
              width: 24px;
              height: 24px;
            }
          }
        }
      }
      .manager-pagination {
        width: 195px;
      }
    }
  }
`;
