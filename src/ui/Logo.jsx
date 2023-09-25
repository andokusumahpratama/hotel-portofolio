import styled from "styled-components";
import { useDarkMode } from "../context/DarkModeContext";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

function Logo() {
  const { isDarkMode } = useDarkMode();

  const src = isDarkMode ? "logo-dark.png" : "logo-light.png";
  // const src = isDarkMode
  //   ? "../../../public/logo-dark.png"
  //   : "../../../public/logo-light.png";

  return (
    <StyledLogo>
      {/* <Img src="logo-light.png" alt="Logo" /> */}
      <Img src={src} />
    </StyledLogo>
  );
}

export default Logo;
