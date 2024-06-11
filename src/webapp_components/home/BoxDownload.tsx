import styled from "styled-components";
import appStore from "../../assets/AppStore.svg";
import chPlay from "../../assets/CHPlayStore.svg";

const BoxDownload = () => {
  return (
    <>
      <DownloadLayout>
        <DownloadTitle className="DownloadTitle">
          Download the app now to access all features and <br /> enhance your
          experience!
        </DownloadTitle>
        <DownloadBtn className="boxDownload">
          <BtnAppStore className="btnDownload">
            <img src={appStore} alt="image-app-store" />
          </BtnAppStore>
          <BtnChPlay className="btnDownload" >
            <img src={chPlay} alt="image-chPlay" />
          </BtnChPlay>
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
  padding: 6rem 0;
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

const BtnChPlay = styled.button`
  background-color: transparent;
  border: none;
`;
const BtnAppStore = styled.button`
  background-color: transparent;
  border: none;
`;
