import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";
import { device } from "@/style/breakpoint";

export const GlobalStyle = createGlobalStyle`
    ${normalize}
    body{
        font-family: "Inter", sans-serif !important;
    }
    html, body, body div, span, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, abbr, address, cite, code, del, dfn, em, img, ins, kbd, q, samp, small, strong, sub, sup, var, b, i, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, figure, footer, header, menu, nav, section, time, mark, audio, video, details, summary {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font-weight: normal;
    vertical-align: baseline;
    background: transparent;
  }

  article, aside, figure, footer, header, nav, section, details, summary {display: block;}

/* Handle box-sizing while better addressing child elements:
   https://css-tricks.com/inheriting-box-sizing-probably-slightly-better-best-practice/ */
  html {
    box-sizing: border-box;
  }

    .app{
        margin: 0 auto;
    }
    
    a{
      text-decoration: none;
      color: inherit;
    }
    .ant-drawer-body{
        padding: 0 !important;
    }
    .ant-modal-close{
      display: none;
    }
    .user-mobile {
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 100%;
      padding: 40px 20px 20px 20px;
      background-color: #d9d9d9;
      border: 1px solid #929191;
      .user-image {
        max-width: 180px;
        margin: 0 auto;
      }
      .user-info p {
        font-size: 20px;
        font-weight: 700;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
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
    .ant-modal {
      width: 50% !important;
      .ant-modal-content{
        background-color: #D9D9D9;
        border: 1px solid #000;
        border-radius: 6px;
        padding: 30px 34px;
      }
      .ant-modal-header {
        background-color: #D9D9D9;
      }
    }
    .exam-modal{
      
      .ant-modal-close-icon{
        display: none;
      }
      .ant-modal-footer{
        .ant-btn-default,.ant-btn-primary {
          display: none !important;
        }
      }
      .ant-modal-title{
        font-size: 24px;
        font-weight: 700;
        font-family: "Inter", sans-serif !important;
      }
      .btn-reload{
        display: block;
        width: 233px;
        height: 82px;
        border-radius: 41px;
        background-color: #9F9D9F;
        margin: 0 auto;
        span{
          font-size: 24px;
          font-weight: 700;
        }
      }
    }
    .point-detail {
    display: flex;
    margin: 30px 0;
    font-size: 24px;
    justify-content: space-between;
    align-items: center;
    p{
      font-family: "Inter", sans-serif !important;
    }
    .point-total p{
      font-weight: 700;
    }
    }
    .confirm-modal{
      .ant-modal-title{
        font-size: 24px;
      }
      .ant-btn{
        width: 100px;
        height: 50px;
        border-radius: 41px;
        span{
          font-weight: 700;
        }
      }
    }
    .ant-input-suffix{
      display: none !important;
    }
    .ant-checkbox-wrapper span{
      font-size: 20px;
    }
   .ant-form-item-explain-error{
    font-size: 16px;
    color: red !important;
    font-weight:700;
   }
   @media ${device.sm}{
      .ant-drawer-content-wrapper{
        width: 70% !important;
      }
    }
    @media ${device.lg}{
      .user-navbar-mobile {
        width: 100% !important;
        display: block !important;
      }
      .user-mobile{
        height: 100vh;
      }
      .exam-navbar-mobile {
        .question-list {
          display: flex;
          flex-wrap: wrap;
          gap: 20px 10px;
        }
      }
      .list-modal{
        width: 60% !important;
        height: 60vh;
        .ant-modal-footer,.ant-modal-close{
          display: none;
        }
        .btn-submit{
          display: block;
          margin: 100px auto 0 auto;
          width: 223px;
          height: 63px;
          border-radius: 41px;
          background-color: #9F9D9F;
          span{
            font-size: 20px;
            font-weight: 700;
          }
        }
      }
    }
    @media ${device.sm}{
      .exam-navbar-mobile {
        .question-list {
          display: flex;
          flex-wrap: wrap;
          gap: 10px 6px;
          .btn-question{
            width: 41px;
            height: 52px;
          }
          #selected-btn{
            border: 2px solid #000;
          }
          .current-btn{
            border: 2px solid #000;
          }
        }
      }
      .list-modal{
        width: 80% !important;
        .ant-modal-content{
          padding: 20px 24px;
        }
        .btn-submit{
          margin-top: 150px;
          width: 180px;
          height: 55px;
        }
      }
      .confirm-modal{
        .ant-modal-title {
          font-size: 16px;
        }
        .ant-modal-content{
          padding: 30px 16px;
        }
        .ant-modal-footer{
          display: flex;
        }
      } 
      .exam-modal{
        width: 80% !important;
        .ant-modal-content{
          padding: 20px;
          .ant-modal-title{
            font-size: 18px;
          }
          .point-detail{
            font-size: 16px;
            flex-direction: column;
          }
        }
        .btn-reload{
          width: 180px;
          height: 60px;
          span{
            font-size: 18px;
          }
        }
      }
    }
    .modal-add{
      .ant-modal-footer{
        display: none;
      }
      .ant-form-item{
        margin-bottom: 40px;
      }
    }
    .modal-edit{
      .ant-modal-footer{
        display: none;
      }
      .ant-form-item{
        margin-bottom: 40px;
      }
    }
    .modal-action{
        display: flex;
        justify-content: flex-end;
        gap: 20px;
    }
    .edit-input{
      margin-bottom: 20px;
      margin-top: 6px;
    }
    .modal-add, .modal-edit{
      width: 80% !important;
    }
    .active-nav{
      color: #26853B;
      svg path {
        fill: #26853B; 
      }
    }
    .ant-pagination-item-link {
        background-color: #919eab !important;
        opacity: 50%;
        color: #c4cdd5 !important;
      }
      .ant-pagination-item {
        font-weight: 700;
        background-color: #fff !important;
        border: 1px solid #dfe3e8 !important;
      }
      .modal-success {
        text-align: center;
        .modal-heading{
          display: flex;
          gap: 10px;
          align-items: center;
          .modal-icon{
            font-size: 40px;
          }
          p{
            font-size: 24px;
          }
        }
        .ant-modal-footer {
          display: none;
        }
        .ant-btn{
          display: inline-block;
          margin-top: 30px;
          font-size: 20px;
          height: 40px;
        }
      }
      .modal-edit-test{
        top: 30px;
        
        .form-action {
          padding: 0 80px;
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
          .new-topic-action {
            margin-top: 20px;
          }
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
          .btn-list{
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 20px;
            gap: 20px;
          }
          .btn-add {
            border-radius: 0px;
            span {
              font-weight: 700;
            }
          }
        }
      }

    .edit-topic-modal{
      width: 40% !important;
      .ant-modal-content{
        background-color: #F5D4D4;
      }
      input{
        width: 75%;
      }
      .modal-item{
        padding: 8px 14px;
        border: 1px solid #000;
        border-radius: 4px;
        display: inline-block;
        background-color: #F3F1F1;
      }
      .modal-question{
        display: flex;
        gap: 30px;
      }
      .modal-answer{
        padding: 0 40px;
        margin-top: 30px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        .item-answer{
          display: flex;
          gap: 30px;
        }
      }
      .modal-input{
        display: flex;
        margin-top: 30px;
        gap: 30px;
        label{
          margin-left: 4px;
        }
        .input-section{
          display: flex;
        }
      }
      .input-action{
        display: flex;
        margin-top: 20px;
        gap: 30px;
        justify-content: center;
      }
    }
`;
