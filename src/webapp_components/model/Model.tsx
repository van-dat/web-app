import Modal from "react-bootstrap/Modal";
import "./model.scss";
import styled from "styled-components";
import appStore from "../../assets/AppStore.svg";
import chPlay from "../../assets/CHPlayStore.svg";
type Props = {
  show: boolean;
  onHide: any;
};
const Model = (props: Props) => {
  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <DownloadLayout>
            <DownloadTitle>
              Download the app to this feature.
            </DownloadTitle>
            <DownloadBtn>
              <BtnAppStore
                onClick={() => {
                  window.location.href =
                    "https://apps.apple.com/vn/app/7esl-ai-speak-learn-english/id6477322355";
                }}
              >
                <img
                  src={appStore}
                  width={250}
                  height={84}
                  alt="image-app-store"
                />
              </BtnAppStore>
              <BtnChPlay
                onClick={() => {
                  window.location.href =
                    "https://play.google.com/store/apps/details?id=com.english7esl";
                }}
              >
                <img src={chPlay} width={279} height={84} alt="image-chPlay" />
              </BtnChPlay>
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
  padding-bottom: 4rem;
  flex-direction: column;
  gap: 30px;
`;

const DownloadTitle = styled.div`
  font-family: Quicksand;
  font-size: 30px;
  font-weight: 700;
  line-height: 34px;
  text-align: center;
`;
const DownloadBtn = styled.div`
  display: flex;
  gap: 16px;
`;

const BtnChPlay = styled.button`
  background-color: transparent;
  border: none;
`;
const BtnAppStore = styled.button`
  background-color: transparent;
  border: none;
`;
