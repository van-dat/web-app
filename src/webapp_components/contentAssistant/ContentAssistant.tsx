import styled from "styled-components";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import "./ContentAssistant.scss";
import DropdownCustom from "../dropdown/DropdownCustom";
import Message from "../message/Message";
import { useEffect, useState } from "react";
import Model from "../model/Model";
import {
  addConversation,
  createConversationByAssistant,
  getLessonByAssistant,
} from "../../services/webApp.service";
import { ArrowLeftShort } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import ThreeDot from "../threeDot/ThreeDot";
import { checkSpace } from "../functions/const";
import { ScrollTop } from "../functions/scrollTop";

const ContentAssistant = () => {
  let scrollMessage = document.getElementById("layoutMessage");

  const navigate = useNavigate();
  const dataLocal = localStorage.getItem("data") || "";
  const dataAssistant = dataLocal ? JSON.parse(dataLocal) : null;
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [dataLesson, setDataLesson] = useState<any>();
  const [choseCategory, setChoseCategory] = useState<string>("");
  const [lessonCategory, setLessonCategory] = useState<any>();
  const [conversation, setConversation] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [textInput, setTextInput] = useState<string>("");
  const [dataMessage, setDataMessage] = useState<any[]>([]);
  const [topicLesson, setTopicLesson] = useState<string>("");
  const [show, setShow] = useState<any>();
  const [checkInput, setCheckInput] = useState<boolean>(false);
  const [limit, setLimit] = useState<boolean>(false);


  const [width, setWidth] = useState(window.innerWidth);

  const fetchData = async () => {
    const responsive = await getLessonByAssistant(dataAssistant?.positionId);
    if (responsive?.status == 200) {
      setDataLesson(responsive.data);
      setLessonCategory(responsive.data[0]);
      setChoseCategory(responsive.data[0]?.title);
    }
  };

  const updateWidth = () => {
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    setShow(5);
    fetchData();
    window.scrollTo(0, 0);
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const handleChoesCategory = (value: string, item: any) => {
    setShow(3);
    setChoseCategory(value);
    setLessonCategory(item);
  };

  const CreateConversations = async (value?) => {
    setLoading(true);
    try {
      const responsive = await createConversationByAssistant({
        assistantId: dataAssistant?.assistantId,
        message: topicLesson || value,
      });
      if (responsive?.status === 200) {
        setConversation(responsive?.data?.data);
        setDataMessage([responsive?.data?.data?.assistant]);
      }
      if (responsive?.data?.isReachLimit) {
        setModalShow(true);
        setLimit(true);
      }
    } catch (error) {}
    setLoading(false);
  };

  const fecthAddMessage = async () => {
    setCheckInput(true);
    setDataMessage((prev) => [
      ...prev,
      {
        id: 2,
        content: <ThreeDot />,
        role: "animation",
      },
    ]);

    ScrollTop(scrollMessage, scrollToBottom);

    const result = await addConversation({
      conversationId: conversation.conversationId,
      message: textInput,
    });
    if (result?.status === 200) {
      if (result?.data?.isReachLimit) {
        setDataMessage((prevConversations) =>
          prevConversations.filter((conversation) => conversation.id !== 2)
        );
        setModalShow(true);
        setLimit(true);
        return;
      }
      setDataMessage((prevConversations) =>
        prevConversations.filter((conversation) => conversation.id !== 2)
      );
      setDataMessage((prev) => [
        ...prev,

        {
          id: result.data?.data?.assistant.id,
          createdAt: result.data?.data?.assistant.createdAt,
          content: result.data?.data?.assistant.content,
          role: result.data?.data?.assistant.role,
          voiceUrl: result.data?.data?.assistant.voiceUrl,
        },
      ]);
    }
    ScrollTop(scrollMessage, scrollToBottom);

    setCheckInput(false);
  };
  const scrollToBottom = (element: any) => {
    element.scrollTop = element.scrollHeight - element.clientHeight;
  };

  const handleBegin = async (value?: string) => {
    if (width < 994) {
      setTimeout(() => {
        window.scrollTo({ top: 1300, behavior: "smooth" });
      }, 100);
    }
    setShow(0);
    setTopicLesson("");

    await CreateConversations(value);
  };
  const handleAsk = async () => {
    await handleBegin("I have a question");
  };

  const addMessage = async () => {
    if (textInput == "" || textInput == undefined || checkSpace(textInput))
      return;
    if (dataMessage[0] == undefined) {
      setModalShow(true);
      return;
    }
    setDataMessage((prev) => [
      ...prev,
      {
        id: 1,
        content: textInput,
        role: "user",
      },
    ]);
    setTextInput("");
    await fecthAddMessage();
  };

  return (
    <>
      <div className="layoutImg">
        <BoxImage className="userImageMb">
          <img
            src={dataAssistant?.chatAvatarUrl}
            className="imageCenter"
            alt="avatar"
          />
        </BoxImage>
      </div>
      <LayoutContent id="LayoutContent" className="container-lg ">
        <Model
          show={modalShow}
          onHide={() => {
            setModalShow(false);
            setLimit(false);
          }}
          limit={limit}
        />

        <LayoutContentLeft className="contentLeft">
          <div className="contentAssistant">
            <div className="assistantDetail">
              <TitleName className="TitleAssistant">
                {dataAssistant?.assistantName}
              </TitleName>
              <DetailAssistant className="DetailAssistant">
                {dataAssistant?.position} Tutor
              </DetailAssistant>
              <Description
                dangerouslySetInnerHTML={{
                  __html: dataAssistant?.introduction,
                }}
                className="DescriptionAssistant"
              ></Description>
              <ButtonQuestion
                disabled={show == 1 || show == 0 ? true : false}
                show={show}
                onClick={() => {
                  handleAsk();
                }}
                className="buttonQuestion"
              >
                Ask Questions
              </ButtonQuestion>
              <TitleSession className="titleSession">
                {dataAssistant?.position} Lesson
              </TitleSession>
            </div>
            {show == 0 && (
              <BoxImage className="userImagePc">
                <img
                  src={dataAssistant?.chatAvatarUrl}
                  className="imageCenter"
                  alt="avatar"
                />
              </BoxImage>
            )}
          </div>
          <DropdownCategory>
            <h3 className="labelChose">Category</h3>
            <DropdownButton
              variant="secondary"
              id="dropdown-item-button"
              title={choseCategory}
              disabled={show == 0 || show == 2 ? true : false}
            >
              {dataLesson?.map((item: any, index: number) => (
                <Dropdown.Item
                  onClick={() => handleChoesCategory(item?.title, item)}
                  eventKey={item?.categoryId}
                  key={index}
                  as="button"
                >
                  {item?.title}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          </DropdownCategory>

          <LayoutLesson className="lessonLayout">
            {lessonCategory?.topics?.map((item: any, index: number) => (
              <DropdownCustom
                key={index}
                titleTopic={item.titleTopic}
                lessons={item.lessons}
                setTopicLesson={setTopicLesson}
                show={show}
                setShow={setShow}
                handleBegin={handleBegin}
                width={width}
              />
            ))}
          </LayoutLesson>
        </LayoutContentLeft>
        {show == 0 ? (
          <Message
            setModalShow={setModalShow}
            conversations={dataMessage}
            loading={loading}
            avatarAssistant={dataAssistant?.avatarUrl}
            actionSend={addMessage}
            textInput={textInput}
            setTextInput={setTextInput}
            setShow={setShow}
            setConversations={setDataMessage}
            checkInput={checkInput}
          />
        ) : (
          <div className="contentRight">
            <div
              className="boxBack"
              onClick={() => {
                navigate(-1);
              }}
            >
              <ArrowLeftShort size={45} color="white" />
            </div>
            <BoxImage className="imageRight">
              <div className="boxUser">
                <img src={dataAssistant?.chatAvatarUrl} alt="avatar" />
              </div>
              <div className="boxBtn">
                <BtnBegin
                  show={topicLesson}
                  disabled={topicLesson == "" ? true : false}
                  onClick={handleBegin}
                  className="btnBegin"
                >
                  Begin
                </BtnBegin>
              </div>
            </BoxImage>
          </div>
        )}
      </LayoutContent>
    </>
  );
};

export default ContentAssistant;

const LayoutContent = styled.div`
  position: relative;
  display: flex;
  z-index: 999;
  padding: 20px;
  border-radius: 67px;
  opacity: 1;
`;

const BtnBegin: any = styled.button`
  border: ${(props: any) =>
    props.show == "" ? "none" : "3px solid rgba(255, 255, 255, 1)"};
  background: ${(props: any) =>
    props.show == ""
      ? "rgba(189, 189, 189, 1)"
      : "linear-gradient(90deg, #01e1ff 0%, #00baff 100%)"};
  box-shadow: ${(props: any) =>
    props.show == "" ? "none" : "0px 0px 24px 4px rgba(1, 215, 255, 0.4)"};

  // &:hover {
  //   opacity: ${(props: any) => (props.show == "" ? 1 : 0.8)};
  // }
`;

// left
const LayoutContentLeft = styled.div`
  display: flex;
  gap: 20px;
  flex-direction: column;
`;
const TitleName = styled.h2`
  font-family: Quicksand;

  padding: 0;
  margin: 0;
  color: white;
`;

const DetailAssistant = styled.div`
  width: max-content;
  border-radius: 5px;
  padding: 8px 15px;
  background: rgba(255, 182, 6, 1);
  font-family: Quicksand;
  font-size: 21px;
  font-weight: 700;
  line-height: 26.25px;
  color: rgba(10, 35, 62, 1);
`;

const Description = styled.p`
  font-family: Poppins;
  color: rgba(173, 173, 173, 1);
  max-width: 468px;
`;

const ButtonQuestion: any = styled.button`
  font-family: Quicksand;
  font-size: 30px;
  font-weight: 700;
  line-height: 37.5px;
  text-align: center;
  color: rgba(255, 255, 255, 1);
  background: ${(props: any) =>
    props.show == 0 || props.show == 1
      ? " rgba(189, 189, 189, 1)"
      : "linear-gradient(90deg, #01e1ff 0%, #00baff 100%)"};
  border-radius: 39px;
  border: none;
  width: 263px;
  padding: 8px 0px;
  &:hover {
    background: ${(props: any) =>
      props.show == 0 || props.show == 1
        ? "rgba(189, 189, 189, 1)"
        : "linear-gradient(90deg, #01E1FF 0%, #00D1FF 100%)"};
  }
`;
const TitleSession = styled.h2`
  font-family: Quicksand;
  font-size: 30px;
  font-weight: 700;
  line-height: 37.5px;
  color: rgba(255, 255, 255, 1);
  margin: 0;
`;

const DropdownCategory = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const LayoutLesson = styled.div`
  max-width: 533px;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
`;

const BoxImage = styled.div`
  z-index: 10;
`;
