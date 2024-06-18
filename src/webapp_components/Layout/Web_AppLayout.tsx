import Footer from "../footer/Footer";
import Header from "../header/Header";
import theme1 from "../../assets/img/theme1.svg";
import theme2 from "../../assets/img/theme2.svg";
import "./Web_AppLayout.scss";
import styled from "styled-components";
import Content from "../content/Content";
import ContentAssistant from "../contentAssistant/ContentAssistant";
import BoxDownload from "../boxDownload/BoxDownload";

const WebAppLayout = () => {
  const url = new URL(window.location.href);
  const path = url.pathname; 
    
  return (
    <HomeLayout>
      <HomeTheme className="theme1">
        <img src={theme1} alt="theme" />
      </HomeTheme>
      <HomeTheme2 className="theme2">
        <img src={theme2} alt="theme" />
      </HomeTheme2>

      <Header />
      {path === "/" ? <Content /> : <ContentAssistant />}
      <BoxDownload />
      <Footer />
    </HomeLayout>
  );
};

export default WebAppLayout;
const HomeLayout = styled.div`
  background: linear-gradient(to bottom, #0a0f28, #0f3e5d);
  position: relative;
`;

const HomeTheme: any = styled.div``;
const HomeTheme2: any = styled.div``;
