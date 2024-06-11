import { ArrowRight } from "react-bootstrap-icons";
import styled from "styled-components";

type Props = {
  title?: string;
  counterOld?: number;
  counterNew?: number;
  reduction?: string;
};

const ItemDrawer = (props: Props) => {
  const { title, counterOld, counterNew, reduction } = props;
  return (
    <BoxItemDrawe>
      <div className="is-flex is-align-items-center">
        <Title>{title}</Title>
        {reduction ? (
          <Counter>{reduction}</Counter>
        ) : (
          <>
            <div>
              <Counter>{counterOld}</Counter>
              <div>From</div>
            </div>
            <div>
              <ArrowRight color="gray" className="mt-2 ml-2 mr-2" />
              <div> &nbsp;</div>
            </div>
            <div>
              <Counter>{counterNew}</Counter>
              <div>To</div>
            </div>
          </>
        )}
      </div>
    </BoxItemDrawe>
  );
};
const Title = styled.div`
  min-width: 160px;
  margin-right: 10px;
`;
const Counter = styled.div`
  color: 0077a3;
  font-weight: 600;
`;

const BoxItemDrawe = styled.div`
  margin: 16px;
  background-color: #0077a3;
  border-radius: 8px;
  padding: 4px 16px;
`;
export default ItemDrawer;
