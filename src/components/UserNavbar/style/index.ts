import styled from "styled-components";
import { device } from "@/style/breakpoint";

export const StylesUserNavbar = styled.div`
  width: 20%;
  .user-navbar {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 100vh;
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
    .user-action {
      display: flex;
      align-items: center;
      padding-left: 20px;
      margin-top: 30px;
      gap: 20px;
      p {
        margin: 0 !important;
      }
      img {
        filter: brightness(1.2) hue-rotate(90deg);
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
  @media ${device.lg} {
    width: 0%;
    display: none;
  }
`;
