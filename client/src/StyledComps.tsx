import * as React from "react";
import { styled } from "@mui/material/styles";
import {
  Typography,
  TextField,
  Button,
  Checkbox,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Box,
  AppBar,
} from "@mui/material";

export const Flex = styled("div")({
  display: "flex",
  alignItems: "center",
});

export const AllWrapper = styled("div")({
  // background: "linear-gradient(to right, #ff7f50, #ff1493)",
  backgroundColor: "#E5EEF0",
  paddingTop: "100px",
  minHeight: "100vh",
});

export const Wrapper = styled("div")({
  maxWidth: "960px",
  margin: "0 auto",
  display: "flex",
  flexDirection: "column",
  // justifyContent: "start",
  alignItems: "start",
  backgroundColor: "#E5EEF0",
  // background: "linear-gradient(to right, #ff7f50, #ff1493)",
  // color: "darkslategray",
  // backgroundColor: "aliceblue",
  // padding: 8,
  // borderRadius: 4,
});

export const UAppBar = styled(AppBar)(({ theme }) => ({
  height: "80px",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  // backgroundColor: "#BDC7CA",
  background: "linear-gradient(to right, #ff7f50, #ff1493)",
}));
