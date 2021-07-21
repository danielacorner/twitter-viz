import React, { useEffect, useState } from "react";
import "./App.css";
import styled from "styled-components/macro";
import { useLoading } from "./providers/store/useSelectors";
import { useIsLight } from "./providers/ThemeManager";
import "./video-react.css"; // import video-react css
import AppFunctionalHooks from "./AppFunctionalHooks";
import SelectedTweetModal from "components/SelectedTweetModal/SelectedTweetModal";
import LeftDrawerCollapsible from "components/LeftDrawer";
import { RowDiv } from "components/common/styledComponents";
import { NavBar } from "components/NavBar/NavBar";
import NetworkGraph from "components/NetworkGraph/NetworkGraph";
import { Drawer, IconButton, Tooltip } from "@material-ui/core";
import Gallery from "components/Gallery/Gallery";
import { Collections } from "@material-ui/icons";

const AppStyles = styled.div`
  transition: background 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
  min-height: 100vh;

  * {
    margin: 0;
    box-sizing: border-box;
  }
  a {
    color: cornflowerblue;
    &:visited {
      color: hsl(250, 50%, 60%);
    }
  }
`;

function App() {
  return (
    <AppStyles className="App">
      <NavBar />
      <RowDiv>
        <NetworkGraph />
      </RowDiv>
      <GalleryDrawer />
      <LeftDrawerCollapsible />
      <SelectedTweetModal />
      {/* <BottomDrawer /> */}
      <AppStylesHooks />
      <AppFunctionalHooks />
    </AppStyles>
  );
}

function GalleryDrawer() {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  return (
    <>
      <ButtonOpenRightDrawerStyles>
        <Tooltip title="Gallery">
          <IconButton onClick={() => setIsGalleryOpen(!isGalleryOpen)}>
            <Collections />
          </IconButton>
        </Tooltip>
      </ButtonOpenRightDrawerStyles>
      <Drawer
        anchor="right"
        open={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
      >
        <DrawerContentStyles>
          {isGalleryOpen && <Gallery />}
        </DrawerContentStyles>
      </Drawer>
    </>
  );
}
const DrawerContentStyles = styled.div`
  min-width: 67vw;
  max-width: calc(100vw - 32px);
  background: hsl(0, 0%, 10%);
`;
const ButtonOpenRightDrawerStyles = styled.div`
  position: fixed;
  top: 64px;
  right: 0;
  z-index: 999;
  svg {
    fill: white;
  }
`;

function AppStylesHooks() {
  const loading = useLoading();
  const isLight = useIsLight();

  useEffect(() => {
    const app = document.querySelector(".App");
    if (!app) {
      return;
    }
    if (loading) {
      (app as HTMLElement).style.cursor = "wait";
    }
    (app as HTMLElement).style.background = isLight ? "white" : "hsl(0,0%,10%)";
  }, [loading, isLight]);

  return null;
}

export default App;
