import styled from "styled-components";
import { device } from "@/style/breakpoint";

export const StylesDrawer = styled.div`
  .drawer-space {
    display: none;
    position: relative;
    width: 100%;
    background-color: #545151;
    height: 65px;
    .drawer-btn {
      width: 45px;
      height: 45px;
      background-color: transparent;
      padding: 0;
    }
    .ant-space-item:nth-of-type(1) {
      position: absolute;
      left: 5%;
    }
    .ant-space-item:nth-of-type(2) {
      width: 100%;
    }
    p {
      color: #fff;
      text-align: center;
    }
  }
  @media ${device.lg} {
    .drawer-space {
      display: inline-flex;
    }
  }
`;
