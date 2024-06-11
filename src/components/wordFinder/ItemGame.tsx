import classNames from "classnames";
import styled from "styled-components";
import { BASE64_IMAGE_GAME } from "../const/BASE64_IMAGE_GAME";
type Props = {
  handleSelectGame: any;
  text: string;
  position: string;
  gameId: number;
  positionIcon?: string;
  dicType?: number;
};

const ItemGame = (props: Props) => {
  const { handleSelectGame, text, position, gameId, positionIcon, dicType } =
    props;
  let classItemGame = classNames({
    "item-game-id": true,
    "is-active": dicType,
  });
  // console.log({ dicType });
  return (
    <div
      className={classItemGame}
      onClick={() =>
        handleSelectGame(text, position, gameId, positionIcon || "")
      }
    >
      <div className="is-flex">
        <IconGame position={position} imageGame={BASE64_IMAGE_GAME}>
          {positionIcon && (
            <IconNation
              positionIcon={positionIcon}
              imageGame={BASE64_IMAGE_GAME}
            ></IconNation>
          )}
        </IconGame>
        <span className="ml-2">{text}</span>
      </div>
    </div>
  );
};

export default ItemGame;

const IconGame: any = styled.div`
  background-image: url(${(props: any) => props.imageGame});
  background-position-y: ${(props: any) => props.position};
  background-size: 26px;
  width: 26px;
  height: 26px;
  border-radius: 6px;
  position: relative;
`;

const IconNation: any = styled.div`
  width: 10px;
  height: 10px;
  background-size: 26px;
  position: absolute;
  right: -3px;
  top: -3px;
  background-image: url(${(props: any) => props.imageGame});
  background-position: ${(props: any) => props.positionIcon};
`;
