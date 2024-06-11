import styled from "styled-components";

export const Tooltiptext = styled.div`
  visibility: hidden;
  width: 120px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
  bottom: 150%;
  left: 50%;
  margin-left: -60px;
`;
export const FileInput = styled.input`
  display: none;
`;
export const BoxFooter = styled.div`
  #form_summarize {
    @media screen and (max-width: 520px) {
      display: block !important;
    }
    @media screen and (min-width: 769px) and (max-width: 1226px) {
      flex-direction: column;
      justify-content: end !important;
      align-items: start !important;
    }
  }
`;
export const BoxModes = styled.div`
  width: 38%;
  font-size: 14px;
`;
export const BoxLength = styled.div`
  width: 44%;
  font-size: 14px;
`;
export const BoxIconDelete = styled.div`
  width: 18%;
  font-size: 14px;
  text-align: right;
  display: flex;
  justify-content: end;
`;

export const SummaryModes = styled.h6`
  text-align: center;
  margin: 10px 0;
`;
export const BoxSummaryLength = styled.div`
  @media screen and (max-width: 500px) {
    max-width: 90%;
  }
  @media screen and (max-width: 370px) {
    max-width: 100%;
    margin: 0 8px;
  }
  max-width: 80%;
  margin: auto;
  border-radius: 8px;
  border: 1px rgba(0, 0, 0, 0.12) solid;
  padding: 10px 7px;
  text-align: center;
`;
export const BoxTabs = styled.div`
  margin: 0 auto;
  max-width: 230px;
  padding-bottom: 12px;
`;
export const Tabs = styled.div`
  display: flex;
  border: 1px solid #b4b4b4;
  padding: 4px;
  border-radius: 24px;
  box-sizing: border-box;
  margin: auto;
  user-select: none;
  justify-content: space-between;
`;

export const Tab = styled.div`
  color: black;
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 24px;
  font-size: 14px;
  font-weight: 600;
  &:hover {
    background-color: #e6f8fe;
  }
  &:active {
    background: hsl(44, 100%, 77%);
    color: black;
  }
`;
export const BoxExtend = styled.div`
  padding: 10px 0;
  cursor: pointer;
  align-items: center;
  user-select: none;
`;
export const Extend = styled.div`
  width: 35px;
  background: #828282;
  height: 3px;
  margin: auto;
  border-radius: 5px;
`;

export const ButtonStatistics = styled.div`
  user-select: none;
  cursor: pointer;
  border-radius: 50%;
  background-color: transparent;
  padding: 10px 10px 6px 10px;
  transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  &:hover {
    color: rgb(67, 67, 67);
    background-color: #e6f8fe;
  }
  &:focus {
    color: rgb(23, 135, 51);
  }
`;
export const KeyWords = styled.div`
  box-shadow: rgba(0, 0, 0, 0.04) 0px -4px 4px;
  padding: 12px;
`;
export const ListKeyWord = styled.div`
  max-height: 100px;
  overflow-y: auto;
`;
export const ButtonMainKeyword = styled.div`
  cursor: pointer;
  margin-right: 8px;
  margin-top: 8px;
  border-radius: 30px;
  padding: 2px 20px;
  border: 1px solid black;
  user-select: none;
`;
export const FormSummarize = styled.div`
  background-color: rgb(255, 255, 255);
  color: rgba(0, 0, 0, 0.87);
  border-radius: 8px;
`;
export const Textarea = styled.textarea`
  font-size: 16px;
  line-height: 22px;
  width: 100%;
  resize: none;
  outline: none;
  padding-right: 20px;
  border-style: none;
  overflow: auto;
  min-height: 100% !important;
  user-select: none;
  background-color: transparent;
  padding: 10px 10px;
  color: #0b3f51 !important;

  @media screen and (max-width: 730px) {
    min-height: 50vh !important;
  }
`;

export const BoxLeft = styled.div`
  position: relative;
  min-height: 50vh;
  user-select: none;
`;
export const PasteTextContainer = styled.div`
  text-align: center;
  position: absolute;
  bottom: 40%;
`;

export const PasteTextBox = styled.div`
  border: 1px solid #0077a3;
  padding: 16px 24px;
  color: #0077a3;
  cursor: pointer;
  border-radius: 8px;
  font-weight: 600;
  user-select: none;
  &:hover {
    background-color: #e6f8fe;
  }
`;

export const ButtonUpload = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  border-radius: 24px;
  font-size: 14px;
  padding: 8px 16px;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  &:hover {
    background-color: #e6f8fe;
  }
`;

export const ButtonSummarize = styled.button`
  border-radius: 32px;
  font-size: 16px;
  padding: 6px 20px;
  background-color: #ffc31d;
  color: white;
  user-select: none;
  cursor: pointer;
  &:hover {
    background-color: #ffc31d;
  }
`;

export const ButtonParaphraseSummary = styled.div`
  border-radius: 32px;
  font-size: 14px;
  padding: 6px 20px;
  background-color: transparent;
  border: 1px solid #0077a3;
  color: #0077a3;
  font-weight: 600;
  user-select: none;
  cursor: pointer;
  margin-right: 4px;
  &:hover {
    background-color: #e6f8fe;
    border-color: rgb(12, 97, 36);
    color: rgb(12, 97, 36) !important;
  }
`;

export const ButtonDelete = styled.div`
  @media screen and (min-width: 635px) {
    position: absolute;
    right: 0;
    top: 0px;
  }
  color: #0077a3;
  cursor: pointer;
  padding: 6px;
  border-radius: 50%;
  &:hover {
    color: rgb(67, 67, 67);
    background-color: #e6f8fe;
  }
`;

export const InputRange = styled.input`
  accent-color: #0077a3;
  color: #0077a3;
  cursor: grab;
  user-select: none;
`;

export const Separation = styled.div`
  border-right: 1px solid #dbdbdb;
`;
