import styled from "styled-components";
import appStore from "../../assets/AppStore.svg";
import chPlay from "../../assets/CHPlayStore.svg";
import "./BoxDonwload.scss"

const BoxDownload = () => {
  return (
    <>
      <DownloadLayout>
        <DownloadTitle className="DownloadTitle">
          Download the app now to access all features and <br /> enhance your
          experience!
        </DownloadTitle>
        <DownloadBtn className="boxDownload">
          <BtnBox
            onClick={() => {
              window.open(
                "https://apps.apple.com/vn/app/7esl-ai-speak-learn-english/id6477322355",
                "_blank",
                "noopener,noreferrer"
              );
            }}
            className="btnDownload"
          >
            <img src={appStore} alt="image-app-store" />
          </BtnBox>
          <BtnBox
            onClick={() => {
              window.open(
                "https://play.google.com/store/apps/details?id=com.english7esl",
                "_blank",
                "noopener,noreferrer"
              );
            }}
            className="btnDownload"
          >
            <img src={chPlay} alt="image-chPlay" />
          </BtnBox>
        </DownloadBtn>
      </DownloadLayout>
    </>
  );
};

export default BoxDownload;

const DownloadLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8.5rem 0;
  flex-direction: column;
  gap: 30px;
`;

const DownloadTitle = styled.div`
  font-family: Quicksand;

  text-align: center;
  color: #ffffff;
`;
const DownloadBtn = styled.div`
  display: flex;
  gap: 16px;
`;

const BtnBox = styled.button`
  background-color: transparent;
  border: none;
`;

