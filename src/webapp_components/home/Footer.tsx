import logo from "../../assets/logo.svg";
import "./Home.scss";
import facebook from "../../assets/img/facebook.svg";
import printer from "../../assets/img/printer.svg";
import youtube from "../../assets/img/youtube.svg";
import twiter from "../../assets/img/twiter.svg";

const Footer = () => {
  return (
    <>
      <footer>
        <div className="footer container ">
          <div className="footer__company">
            <img src={logo} width="162" height="42" alt="logo" />
            <h2 className="footer__title">Company</h2>
            <div className="footer__list">
              <a href="">About</a>
              <a href="">Privacy Policy</a>
              <a href="">Terms</a>
              <a href="">Editorial Process</a>
              <a href="">Contact Us</a>
            </div>
          </div>
          <div className="footer__social">
            <div className="boxNone"></div>
            <h2 className="footer__title">Follow Us</h2>
            <div className="footer__link">
              <a href="https://www.facebook.com/7ESLEnglish/">
                <img src={facebook} alt="Facebook" />
              </a>
              <a href="https://www.pinterest.com/7english/">
                <img src={printer} alt="printers" />
              </a>
              <a href="https://x.com/7eslenglish?mx=2">
                <img src={twiter} alt="twitter" />
              </a>
              <a href="https://www.youtube.com/channel/UCPDQgXju7hqEGBwzLIeI7Zw">
                <img src={youtube} alt="youtube" />
              </a>
            </div>
          </div>
        </div>
        <div className="container ">
          <h2 className="copyright-bar">7ESL © 2024 </h2>
        </div>
      </footer>
    </>
  );
};

export default Footer;
