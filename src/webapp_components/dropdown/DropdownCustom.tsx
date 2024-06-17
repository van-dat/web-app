import { useState } from "react";
import { ChevronDown, ChevronUp } from "react-bootstrap-icons";
import styled from "styled-components";
import "./Dropdown.scss";
type Props = {
  titleTopic: string;
  lessons: any;
  setTopicLesson: any;
  show: number;
  setShow: any;
  handleBegin: any;
  width: any;
};
const DropdownCustom = (props: Props) => {
  const {
    titleTopic,
    lessons,
    setTopicLesson,
    show,
    setShow,
    handleBegin,
    width,
  } = props;
  const [isShow, setIsShow] = useState<boolean>(false);
  const [choseLesson, setChoseLesson] = useState<number>(1);
  const handleChoseLesson = (lessonId: any, titleLesson: string) => {
    if (show !== 0 && show !== 2) {
      setShow(1);
      setTopicLesson(titleLesson), setChoseLesson(lessonId);
      if (width < 994 && titleLesson != "") {
        handleBegin(titleLesson);
      }
    }
  };

  return (
    <>
      <LayoutDropDown
        show={show}
        className="dropDown"
        onClick={() => setIsShow(!isShow)}
      >
        <TitleDropDown>
          <Label className="labelText">{titleTopic}</Label>
          <Description className="description">
            {lessons?.length} Lessons
          </Description>
        </TitleDropDown>
        {!isShow ? (
          <ChevronDown color="white" size={20} />
        ) : (
          <ChevronUp color="white" size={20} />
        )}
      </LayoutDropDown>
      <DropDownList className={`${isShow && "showItem"} listDown`}>
        {lessons.map((item: any, index: number) => (
          <DropDownItem
            show={show}
            lesson={choseLesson}
            key={index}
            className="dropDownItem"
            onClick={() => {
              handleChoseLesson(item.lessonId, item.titleLesson);
            }}
            choes={item.lessonId}
          >
            {index + 1}. {item.titleLesson}
          </DropDownItem>
        ))}
      </DropDownList>
    </>
  );
};

export default DropdownCustom;

const LayoutDropDown: any = styled.div`
  display: flex;
  background: ${(props: any) =>
    props.show == 0 || props.show == 2
      ? "rgba(189, 189, 189, 1)"
      : "linear-gradient(269.32deg, #82bce7 0.34%, #01c2ff 99.76%)"};
  border-radius: 16px;
  padding: 5px 20px;
  justify-content: space-between;
  align-items: center;
  cursor: ${(props: any) =>
    props.show == 0 || props.show == 2 ? "default" : "pointer"};
  width: 100%;

  &:hover {
    background: ${(props: any) => (props.show == 0 || props.show == 2 ? "rgba(189, 189, 189, 1)" : "linear-gradient(269.32deg, #1996F1 0.34%, #01C2FF 99.76%)")};
  }

`;
const TitleDropDown = styled.div`
  display: flex;
  flex-direction: column;
  color: rgba(255, 255, 255, 1);
`;
const Label = styled.label`
  font-family: Quicksand;
`;

const Description = styled.p`
  font-family: Poppins;
  margin: 0;
`;

const DropDownList = styled.div`
  max-height: 0;
  overflow: hidden;
  opacity: 0;
  transition: max-height 0.25s cubic-bezier(0.4, 0, 0.2, 1),
    opacity 0.25s cubic-bezier(0.4, 0, 0.2, 1),
    padding 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const DropDownItem: any = styled.p`
  width: 100%;
  padding: 4px 30px;
  font-family: Poppins;
  font-size: 20px;
  font-weight: 400;
  line-height: 27px;
  background: ${(props: any) =>
    props.choes == props.lesson && props.show == 0
      ? "linear-gradient(90deg, #BDBDBD 0%, rgba(39, 48, 65, 0) 100%)"
      : props.choes == props.lesson
      ? "linear-gradient(90deg, #35a5e4 0%, rgba(39, 48, 65, 0) 100%)"
      : "transparent"};
  border-radius: 7px;
  color: rgba(255, 255, 255, 1);
  margin: 0;
  cursor: ${(props: any) => (props.show == 0 ? "default" : "pointer")};
  &:hover {
    background: ${(props: any) =>
      props.choes == props.lesson && props.show == 0
        ? "linear-gradient(90deg, #BDBDBD 0%, rgba(39, 48, 65, 0) 100%)"
        : props.show == 0
        ? "transparent"
        : "linear-gradient(90deg, #35a5e4 0%, rgba(39, 48, 65, 0) 100%)"};
  }
`;
