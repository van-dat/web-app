import styled from "styled-components";
import Footer from "./Footer";
import theme1 from "../../assets/img/theme1.svg";
import theme2 from "../../assets/img/theme2.svg";
import { Outlet } from "react-router-dom";
import BoxDownload from "../boxDownload/BoxDownload";
import Header from "../header/Header";

const Home = () => {
  return (
    <>
      <HomeLayout >
        <HomeTheme className = "theme1" >
          <img src={theme1} alt="theme" />
        </HomeTheme>
        <HomeTheme2 className = "theme2" >
          <img src={theme2} alt="theme" />
        </HomeTheme2>

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
 
`;
const HomeTheme2: any = styled.div`
  
`;
