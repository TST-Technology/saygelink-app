import styled from "styled-components";
import { devices } from "../../utils/constants";
import { UNIVERSITY_COLOR } from "../../utils/variables";
import {
  DropdownStyle,
  InputStyle,
  OutlinedButton,
  TextAreaStyle,
} from "../general";

export const TextAreaStyled = styled.textarea`
  ${TextAreaStyle}
  width: 100%;
  padding: 13px 18px;
`;

export const StyledTextareaContainer = styled.div`
  display: flex;
  align-items: end;
  gap: 2rem;

  > div:first-child {
    width: 100%;
  }
`;

export const SaveButton = styled.button`
  ${OutlinedButton}
  padding: 0.5rem 2rem;
  font-size: 16px;
  background-color: transparent;
  border: 1px solid ${UNIVERSITY_COLOR.primary};
  box-shadow: none;
  margin-bottom: 8px;
`;

export const StyleDropdownContainer = styled.div`
  margin-top: 2rem;
`;

export const StyledInput = styled.input`
  ${InputStyle}
  width: 100%;
`;

export const RoledDropdown = styled.select`
  ${DropdownStyle}
  width: 50%;
`;

export const StyleFlexJustifyBetweenContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const StyleAddLink = styled.a`
  color: ${UNIVERSITY_COLOR.primary};
  font-family: Poppins;
  text-decoration: none;
  cursor: pointer;
  font-weight: 500;
  line-height: 30px;
  font-size: 18px;
`;

export const StyleInputContainer = styled.div`
  margin-top: 2rem;

  .rowContainer {
    display: flex;
    align-items: center;
    gap: 2rem;
    margin-top: 1rem;
  }

  .closeIcon {
    cursor: pointer;
  }
`;
