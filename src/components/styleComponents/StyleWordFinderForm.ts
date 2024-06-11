import styled from "styled-components";

export const Container = styled.div`
  max-width: 700px;
  margin: 0 auto;
  box-sizing: border-box;
  color: #fff;
  border-radius: 20px;
`;

export const SmContainer = styled.div`
  max-width: 550px;
  padding: 20px;
  margin: 20px auto 0;
  background-color: #fff;
  border-radius: 10px;
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 -10px;
`;

export const Col = styled.div`
  padding: 0 10px;
`;

export const WrapControl = styled.div`
  position: relative;
  padding: 10px 0;
  user-select: none;
`;

export const Input = styled.input`
  padding: 10px 10px;
  border-radius: 20px;
  width: 100%;
  border: 1px solid #ccc;
  font-size: 20px;
`;

export const LetterInput = styled(Input)`
  font-size: 25px;
  padding: 12px 20px;
  border-radius: 30px !important;
  text-align: center;
`;

export const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 15px;
`;

export const BtnSearch = styled.button`
  color: #000;
  background: #f7c342;
  width: 100%;
  border-radius: 25px;
  padding: 10px 20px;
  font-size: 20px;
  border: none;
  cursor: ${(props) => (props.disabled ? "normal" : "pointer")};
  opacity: ${(props) => (props.disabled ? "0.5" : "1")};
`;
export const BtnDeleteLetter = styled.p`
  position: absolute;
  right: 30px;
  top: 26px;
  background-color: black;
  color: white;
  width: 32px;
  height: 32px;
  font-size: 32px;
  line-height: 32px;
  cursor: pointer;
  border: 1px solid black;
  border-radius: 50%;
  & span {
    position: relative;
    bottom: 4px;
    left: 5px;
  }
`;
export const BtnDeleteInput = styled.div`
  background-color: black;
  color: white;
  position: absolute;
  right: 10px;
  top: 12px;
  width: 26px;
  height: 26px;
  font-size: 26px;
  line-height: 26px;
  cursor: pointer;
  border: 1px solid black;
  border-radius: 50%;
  & span {
    position: relative;
    bottom: 3px;
    left: 4px;
  }
`;
