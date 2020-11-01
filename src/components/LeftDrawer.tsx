import React from "react";
import clsx from "clsx";
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Controls from "./Controls/Controls";
import styled from "styled-components/macro";
import { useIsLeftDrawerOpen } from "../providers/store";

export const LEFT_DRAWER_WIDTH = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    appBar: {
      // transition: theme.transitions.create(["margin", "width"], {
      //   easing: theme.transitions.easing.sharp,
      //   duration: theme.transitions.duration.leavingScreen,
      // }),
    },
    appBarShift: {
      width: `calc(100% - ${LEFT_DRAWER_WIDTH}px)`,
      marginLeft: LEFT_DRAWER_WIDTH - theme.spacing(1),
      // transition: theme.transitions.create(["margin", "width"], {
      //   easing: theme.transitions.easing.easeOut,
      //   duration: theme.transitions.duration.enteringScreen,
      // }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: "none",
    },
    drawer: {
      width: LEFT_DRAWER_WIDTH,
      flexShrink: 0,
    },
    drawerPaper: {
      width: LEFT_DRAWER_WIDTH,
    },

    drawerHeader: {
      display: "flex",
      alignItems: "center",
      padding: 0,
      // necessary for content to be below app bar
      // ...theme.mixins.toolbar,
      justifyContent: "flex-end",
    },
    content: {
      flexGrow: 1,
      padding: 0,
      // transition: theme.transitions.create("margin", {
      //   easing: theme.transitions.easing.sharp,
      //   duration: theme.transitions.duration.leavingScreen,
      // }),
      marginLeft: -LEFT_DRAWER_WIDTH - theme.spacing(1) + 64,
    },
    contentShift: {
      // transition: theme.transitions.create("margin", {
      //   easing: theme.transitions.easing.easeOut,
      //   duration: theme.transitions.duration.enteringScreen,
      // }),
      marginLeft: 0,
    },
  })
);

const Div = styled.div``;

/** https://material-ui.com/components/drawers/#persistent-drawer */

const BtnCollapse = ({ drawerHeader, toggleOpen, direction }) => (
  <div className={drawerHeader}>
    <IconButton className={"btnChevron"} onClick={toggleOpen}>
      {direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
    </IconButton>
  </div>
);

export default function LeftDrawer() {
  const classes = useStyles();
  const theme = useTheme();
  const {
    isDrawerOpen: open,
    setIsDrawerOpen: setOpen,
  } = useIsLeftDrawerOpen();
  const toggleOpen = () => {
    setOpen(!open);
  };

  return (
    <Div
      css={`
        ${open
          ? ""
          : ".MuiPaper-root{ transform: translateX(-182px) !important }"}
        .btnChevron {
          position: absolute;
          top: 8px;
          right: 8px;
          transform: rotate(${open ? 0 : 180}deg);
        }
      `}
      className={classes.root}
    >
      <CssBaseline />

      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
        PaperProps={{
          style: {
            transform: `translateX(${open ? 0 : -170}px)`,
            visibility: "visible",
          },
        }}
      >
        <BtnCollapse
          drawerHeader={classes.drawerHeader}
          direction={theme.direction}
          toggleOpen={toggleOpen}
        />

        <Controls />
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
      </main>
    </Div>
  );
}
