import Modal from "react-bootstrap/Modal";
import "./model.scss";
import styled from "styled-components";
import appStore from "../../assets/AppStore.svg";
import chPlay from "../../assets/CHPlayStore.svg";
type Props = {
  show: boolean;
  onHide: any;
  limit?: boolean;
};
const Model = (props: Props) => {
  const { limit, show, onHide } = props;
  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <DownloadLayout>
            {limit ? (
              <DownloadTitle className="TitleLimit">
                You've reached your word limit! <br /> Download the app to
                continue chatting.
              </DownloadTitle>
            ) : (
              <DownloadTitle className="TitleDownload">
                Download the app to use this feature.
              </DownloadTitle>
            )}
            <DownloadBtn className="boxIcon">
              <BtnDownload className="imgBox"
                onClick={() => {
                  window.open(
                    "https://apps.apple.com/vn/app/7esl-ai-speak-learn-english/id6477322355",
                    "_blank",
                    "noopener,noreferrer"
                  );
                }}
              >
                <img
                  src={appStore}
                  width={250}
                  height={84}
                  alt="image-app-store"
                />
              </BtnDownload>
              <BtnDownload className="imgBox"
                onClick={() => {
                  window.open(
                    "https://play.google.com/store/apps/details?id=com.english7esl",
                    "_blank",
                    "noopener,noreferrer"
                  );
                }}
              >
                <img src={chPlay} width={279} height={84} alt="image-chPlay" />
              </BtnDownload>
            </DownloadBtn>
          </DownloadLayout>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default Model;
const DownloadLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 2rem;
  flex-direction: column;
  gap: 30px;
`;

const DownloadTitle = styled.div`
  font-family: Quicksand;
  
  text-align: center;
`;
const DownloadBtn = styled.div`
  display: flex;
  gap: 16px;
`;

const BtnDownload = styled.button`
  background-color: transparent;
  border: none;
`;

