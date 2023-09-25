import { styled } from "styled-components";
import Uploader from "../data/Uploader";
import Logo from "./Logo";
import MainNav from "./MainNav";

const StyleSidebar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);

  grid-row: 1 / -1; // menjadi grid awal diantara akhir. padahal di applayout sidebar ada di posisi 2 antara header sidebar main
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;
function Sidebar() {
  return (
    <StyleSidebar>
      <Logo />
      <MainNav />

      {/* <Uploader /> */}
    </StyleSidebar>
  );
}

export default Sidebar;
