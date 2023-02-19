import styled from "styled-components";
import { ROLES } from "../utils/constants";
import LinearProgress from "@mui/material/LinearProgress";
import theme, { UNIVERSITY_COLOR } from "../utils/variables";

export const ImageRoleContainerStyle = styled.div`
  position: relative;
`;

export const ImageRoleStyle = styled.img`
  object-fit: cover;
  height: ${({ height }) => {
    return height;
  }};
  width: ${({ width }) => {
    return width;
  }};
  border-radius: ${({ radius }) => {
    return radius;
  }};
  ${({ role }) => {
    if (role === ROLES.FACULTY) {
      return {
        border: `3px solid ${theme.lightTheme.radicalRed}`,
      };
    }
    if (role === ROLES.ALUMNI) {
      return {
        border: `3px solid ${UNIVERSITY_COLOR.primary}`,
      };
    }
  }}
  ${({ hide }) => {
    if (hide) return { display: "none" };
  }}
`;

export const LinearProgressStyle = styled(LinearProgress)`
  position: absolute;

  &.MuiLinearProgress-root {
    height: ${({ height }) => {
      return height;
    }};
    width: ${({ width }) => {
      return width;
    }};
    border-radius: ${({ radius }) => {
      return radius;
    }};
    ${({ hide }) => {
      if (hide) return { display: "none" };
    }}
    background-color: ${theme.lightTheme.grey};
  }

  .MuiLinearProgress-barColorPrimary {
    background-color: ${theme.lightTheme.seashell};
  }
`;
