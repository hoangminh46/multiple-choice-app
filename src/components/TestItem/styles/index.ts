import styled from "styled-components";
import { device } from "@/style/breakpoint";

export const StylesTestItem = styled.div`
  width: 45%;
  height: 20%;
  @media ${device.md} {
    width: 90%;
  }
  .test-item {
    width: 100%;
    height: 100%
    box-sizing: border-box;
    padding: 20px;
    border: 1px solid #000;
    border-radius: 4px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    .item-name {
      font-size: 20px;
      font-weight: 500;
      margin: 0;
    }
    .item-info {
      display: flex;
      gap: 50px;
      margin-top: 10px;
    }
    .item-time,
    .item-grade {
      display: flex;
      gap: 12px;
      align-items: center;
    }
    .item-star {
      margin-top: 20px;
      display: flex;
      gap: 6px;
    }
  }
  @media ${device.xl} {
    .item-info {
      gap: 15px !important;
    }
  }
  @media ${device.sm} {
    height: 30%;
    .test-item {
      width: auto;
      height: 100px;
      font-size: 12px;
      padding: 10px 20px;
      a {
        font-size: 16px !important;
      }
    }
    .item-star {
      margin-top: 10px !important;
    }
  }
`;
