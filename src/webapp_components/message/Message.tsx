import styled from "styled-components";
import sendIcon from "../../assets/sendIcon.svg";
import volumeIcon from "../../assets/volumn.svg";
import pause from "../../assets/pause.svg";
import record from "../../assets/record.svg";
import translateIcon from "../../assets/translate.svg";
import light from "../../assets/light.svg";
import "./Message.scss";
import { useRef, useState } from "react";
import Spinner from "react-bootstrap/esm/Spinner";
import { ArrowLeftShort } from "react-bootstrap-icons";
import { checkSpace } from "../functions/const";

type Props = {
  setModalShow: any;
  conversations: any;
  loading: boolean;
  avatarAssistant: string;
  actionSend: any;
  setTextInput: any;
  textInput: string;
  setShow: any;
  setConversations: any;
  checkInput: boolean;
};

const Message = (props: Props) => {
  const {
    setModalShow,
    conversations,
    loading,
    avatarAssistant,
    actionSend,
    setTextInput,
    textInput,
    setShow,
    setConversations,
    checkInput,
  } = props;
  const audioRef = useRef(new Audio());
  const [checkVolume, setCheckVolume] = useState<number | null>(null);
  const handleCheckVolume = (idCheck: any, voiceUrl: string) => {
    if (audioRef.current.paused) {
      audioRef.current.src = voiceUrl;
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    setCheckVolume(checkVolume === idCheck ? null : idCheck);
  };

  const handleEnter = async (e) => {
    if (e.keyCode == 13 && !checkInput && !checkSpace(textInput)) {
      await actionSend();
    }
  };

  return (
    <LayoutContentRight id="message" className="layoutContentRight">
      {loading && (
        <div className="loading">
          <Spinner animation="border" variant="light" />
        </div>
      )}
      {
        <LayoutMessage id="layoutMessage" className="layoutMessage">
          <div
            className="boxBack"
            onClick={() => {
              setShow();
              setConversations([]);
              setTextInput("");
            }}
          >
            <ArrowLeftShort size={45} color="white" />
          </div>
          {conversations[0] != undefined &&
            conversations.length > 0 &&
            conversations?.map((item: any, index: number) => (
              <Box check={item?.role} key={index}>
                {(item?.role == "assistant" || item?.role == "animation") && (
                  <img
                    src={avatarAssistant}
                    alt="avatar-assitant"
                    className="imageChat"
                  />
                )}

                <BoxMessage className="boxMessage">
                  <audio
                    ref={audioRef}
                    src={item?.voiceUrl}
                    onEnded={() => setCheckVolume(10000)}
                    className="audio"
                  />
                  <TextMessage className="textMessage" check={item?.role}>
                    {item.role == "assistant" && (
                      <button
                        onClick={() =>
                          handleCheckVolume(item?.id, item.voiceUrl)
                        }
                        className="buttonVolume"
                      >
                        <img
                          src={checkVolume === item?.id ? pause : volumeIcon}
                          alt="iconVolume"
                        />
                      </button>
                    )}
                    {item?.content}
                  </TextMessage>
                </BoxMessage>
                {item?.role == "assistant" && (
                  <button onClick={() => setModalShow(true)} className="button">
                    <img
                      src={translateIcon}
                      className="imageTranslate"
                      alt="iconTranslate"
                    />
                  </button>
                )}
                {item?.role == "user" && (
                  <button onClick={() => setModalShow(true)} className="button">
                    <img
                      src={light}
                      className="imagelight"
                      alt="iconTranslate"
                    />
                  </button>
                )}
              </Box>
            ))}
        </LayoutMessage>
      }
      <BoxEnd>
        <BoxRecord>
          <button onClick={() => setModalShow(true)} className="buttonRecord">
            <img src={record} alt="record" />
          </button>
        </BoxRecord>
        <FormSend>
          <input
            type="text"
            className="inputSend"
            onKeyDown={(e) => handleEnter(e)}
            onChange={(e) => setTextInput(e.target.value)}
            value={textInput}
          />
          <button
            disabled={textInput == "" || checkInput ? true : false}
            onClick={() => actionSend()}
            className="buttonSend"
          >
            <img src={sendIcon} alt="icon-send" />
          </button>
        </FormSend>
      </BoxEnd>
    </LayoutContentRight>
  );
};

export default Message;

const LayoutContentRight = styled.div`
  border: 3px solid rgba(42, 52, 80, 1);
  background: linear-gradient(
    151.49deg,
    #22273a 2.29%,
    rgba(74, 74, 74, 0) 96.76%
  );
  border-radius: 45px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const LayoutMessage = styled.div`
  display: flex;
  max-height: 500px;
  height: 100%;

  gap: 32px;
  flex-direction: column;
`;

const FormSend = styled.div`
  height: 50px;
  border-radius: 23px;
  background: rgba(217, 217, 217, 1);
  display: flex;
`;

const Box: any = styled.div`
  display: flex;

  gap: 16px;
  align-items: center;
  justify-content: ${(props: any) => (props.check == "user" ? "end" : "start")};
`;
const BoxMessage: any = styled.div`
  max-width: calc(100% - 50px);
  display: flex;
  justify-content: start;
  align-items: start;
`;
const TextMessage: any = styled.div`
  color: rgba(255, 255, 255, 1);
  font-family: Poppins;
  line-height: 24px;
  text-align: left;
  margin: 0;
  background: ${(props: any) =>
    props.check == "user"
      ? "rgba(40, 182, 219, 0.85)"
      : "rgba(125, 125, 125, 1)"};
  padding: 7px 16px;
  border-radius: 21px;
`;

const BoxEnd = styled.div`
  display: flex;
  flex-direction: column;
  gap: 46px;
`;

const BoxRecord = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 90px;
`;
