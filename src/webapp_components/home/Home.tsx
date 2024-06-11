import styled from "styled-components";
import Header from "./Header";
import BoxDownload from "./BoxDownload";
import Footer from "./Footer";
import theme1 from "../../assets/img/theme1.svg";
import theme2 from "../../assets/img/theme2.svg";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <>
      <HomeLayout>
        <HomeTheme theme1={theme1}></HomeTheme>
        <HomeTheme2 theme2={theme2}></HomeTheme2>

        <Header />
        <Outlet />
        <BoxDownload />
      </HomeLayout>
      <Footer />
    </>
  );
};

export default Home;
const HomeLayout = styled.div`
  background: linear-gradient(to bottom, #0a0f28, #0f3e5d);
  position: relative;
`;
const HomeTheme: any = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  max-width: 600px;
  width: 100%;
  max-height: 500px;
  height: 100%;
  rotate: 14.36 deg;
  background: url(${(props: any) => props.theme1}) no-repeat;
`;
const HomeTheme2: any = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  max-width: 600px;
  width: 100%;
  max-height: 500px;
  height: 100%;
  background: url(${(props: any) => props.theme2}) no-repeat;
`;
