import styled from "styled-components";
import logo from "../../assets/logo.svg";
import { List } from "react-bootstrap-icons";
import { useState } from "react";
import "./Header.scss";

const Header = () => {
  const [checkShow, setCheckShow] = useState<boolean>(false);
  return (
    <>
      <HeaderContainer className="container">
        <LayoutHeader>
          <Logo href="#">
            <img src={logo} alt="logo" />
          </Logo>
          <BoxNav check={checkShow} className="nav__menu" id="nav-menu">
            <ul className="nav__list">
              <li className="nav__item">
                <NavLink check={checkShow} href="#" className="nav__link">
                  Learn
                </NavLink>
              </li>
              <li className="nav__item">
                <NavLink check={checkShow} href="#" className="nav__link">
                  AI Writing Assistance
                </NavLink>
              </li>
              <li className="nav__item">
                <NavLink check={checkShow} href="#" className="nav__link">
                  Words
                </NavLink>
              </li>
            </ul>
            <div
              onClick={() => setCheckShow(false)}
              className="nav__close"
              id="nav-close"
            >
              &#215;
            </div>
          </BoxNav>
          <div
            onClick={() => setCheckShow(true)}
            className="nav__toggle"
            id="nav-toggle"
          >
            <List size={40} color="white" />
          </div>
        </LayoutHeader>
      </HeaderContainer>
    </>
  );
};

export default Header;

const HeaderContainer = styled.header`
  height: 90px;
  padding: 0 16px;
`;
const LayoutHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
`;

const Logo = styled.a`
  z-index: 1;
`;
const NavLink: any = styled.a`
  color: ${(props: any) => (props.check ? "black" : "white")};
  text-decoration: none;
  text-transform: capitalize;
`;

const BoxNav: any = styled.div`
  top: ${(props: any) => (props.check ? "0" : "-150%")};
`;
