import React, { useCallback, useState, FC, useEffect } from "react";
import { theme } from "./CreateTheme";
import { ThemeProvider } from "@mui/material/styles";
import { v4 as uuidv4 } from "uuid";
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
  Card,
  CardContent,
  Avatar,
  AppBar,
  Modal,
  Paper,
  Select,
  MenuItem,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { AccountCircle } from "@mui/icons-material";
import { Wrapper, AllWrapper, UAppBar, Flex } from "./StyledComps";
import { Link } from "react-router-dom";

import path from "path";
import dotenv from "dotenv";

import dummy from "./assets/icon_wide.png"

dotenv.config({
  path: path.resolve(__dirname, ".env"),
});

import { ethers } from "ethers";
// ABIのインポート
import abi from "./contracts/Unyte.json";
import { height } from "@mui/system";
// Astar
const CONTRACT_ADDRESS = "0xd08C0A04c755e2Ab46DE19302b340F8b58C36e28";
// ABIの参照
const ContractABI = abi.abi;
const privateKey: any = process.env.REACT_APP_PRIVATE_KEY;

type Todo = {
  id: string;
  text: string;
  completed: boolean;
};
interface CardData {
  id: number;
  username: string;
  content: string;
}
interface Task {
  taskId: any;
  teamId: any;
  username: string;
  content: string;
  avatarURL: string;
}
interface Thanks {
  thanksId: any;
  teamId: any;
  content: string;
  taskId: any;
  avatarURL: string;
}
interface NeumorphicCardProps extends CardData {
  handleOpen: (id: any) => void;
}

const sampleTasks: Task[] = [
  {
    taskId: 1,
    teamId: 1,
    username: "Uwaizumi.eth",
    content: "将です",
    avatarURL:
      "https://cdn.discordapp.com/guilds/945194711973498920/users/710388387726753852/avatars/a_b6744366c5a8b502ca2418bf9e162a10.webp?size=160",
  },
  {
    taskId: 2,
    teamId: 1,
    username: "Uwaizumi.eth",
    content: "タスクです",
    avatarURL:
      "https://cdn.discordapp.com/guilds/945194711973498920/users/710388387726753852/avatars/a_b6744366c5a8b502ca2418bf9e162a10.webp?size=160",
  },
  {
    taskId: 3,
    teamId: 2,
    username: "Uwaizumi.eth",
    content: "たすくです",
    avatarURL:
      "https://cdn.discordapp.com/guilds/945194711973498920/users/710388387726753852/avatars/a_b6744366c5a8b502ca2418bf9e162a10.webp?size=160",
  },
  {
    taskId: 4,
    teamId: 3,
    username: "Uwaizumi.eth",
    content: "たすくです",
    avatarURL:
      "https://cdn.discordapp.com/guilds/945194711973498920/users/710388387726753852/avatars/a_b6744366c5a8b502ca2418bf9e162a10.webp?size=160",
  },
];
const sampleThanks: any[] = [
  {
    thanksId: 1,
    taskId: 1,
    teamId: 1,
    content: "ありがとう。",
    fromId: "710388387726753852",
    from: "Uwaizumi.eth",
    fromAvatarURL:
      "https://cdn.discordapp.com/guilds/945194711973498920/users/710388387726753852/avatars/a_b6744366c5a8b502ca2418bf9e162a10.webp?size=160",
    toId: "710388387726753852",
    to: "Uwaizumi.eth",
    toAvatarURL:
      "https://cdn.discordapp.com/guilds/945194711973498920/users/710388387726753852/avatars/a_b6744366c5a8b502ca2418bf9e162a10.webp?size=160",
  },
  {
    thanksId: 2,
    taskId: 1,
    teamId: 1,
    content: "ありがとう。",
    fromId: "710388387726753852",
    from: "Uwaizumi.eth",
    fromAvatarURL:
      "https://cdn.discordapp.com/guilds/945194711973498920/users/710388387726753852/avatars/a_b6744366c5a8b502ca2418bf9e162a10.webp?size=160",
    toId: "710388387726753852",
    to: "Uwaizumi.eth",
    toAvatarURL:
      "https://cdn.discordapp.com/guilds/945194711973498920/users/710388387726753852/avatars/a_b6744366c5a8b502ca2418bf9e162a10.webp?size=160",
  },
  {
    thanksId: 3,
    taskId: 1,
    teamId: 1,
    content: "ありがとう。",
    fromId: "710388387726753852",
    from: "Uwaizumi.eth",
    fromAvatarURL:
      "https://cdn.discordapp.com/guilds/945194711973498920/users/710388387726753852/avatars/a_b6744366c5a8b502ca2418bf9e162a10.webp?size=160",
    toId: "710388387726753852",
    to: "Uwaizumi.eth",
    toAvatarURL:
      "https://cdn.discordapp.com/guilds/945194711973498920/users/710388387726753852/avatars/a_b6744366c5a8b502ca2418bf9e162a10.webp?size=160",
  },
  {
    thanksId: 4,
    taskId: 1,
    teamId: 1,
    content: "ありがとう。",
    fromId: "710388387726753852",
    from: "Uwaizumi.eth",
    fromAvatarURL:
      "https://cdn.discordapp.com/guilds/945194711973498920/users/710388387726753852/avatars/a_b6744366c5a8b502ca2418bf9e162a10.webp?size=160",
    toId: "710388387726753852",
    to: "Uwaizumi.eth",
    toAvatarURL:
      "https://cdn.discordapp.com/guilds/945194711973498920/users/710388387726753852/avatars/a_b6744366c5a8b502ca2418bf9e162a10.webp?size=160",
  },
];

const NeumorphicCardWrapper = styled(Card)(({ theme }) => ({
  borderRadius: "1rem",
  backgroundColor: "#E5EEF0",
  boxShadow: "10px 10px 10px #d9d9d9, -10px -10px 10px #ffffff",
  textDecoration: "none",
  minWidth: 275,
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(2),
  width: "80%",
}));

const NeumorphicCard: React.FC<NeumorphicCardProps> = ({
  id,
  username,
  content,
  handleOpen,
}) => {
  return (
    <NeumorphicCardWrapper onClick={() => handleOpen(id)}>
      <CardContent>
        <Box display="flex" alignItems="center" mb={1}>
          <Avatar>
            <AccountCircle />
          </Avatar>
          <Typography variant="h6" component="div" sx={{ ml: 1 }}>
            {username}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          {content}
        </Typography>
      </CardContent>
    </NeumorphicCardWrapper>
  );
};

const App: FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<CardData | null | any>(null);
  // date params
  const [date, setDate] = React.useState<string | null>("ALL");
  const [months, setMonths] = useState(["ALL"]);

  useEffect(() => {
    let tmp: any = [];
    const getUniqueValues = (array: any, key: any) => {
      const uniqueValues = new Set(array.map((item: any) => item[key]));
      return Array.from(uniqueValues);
    };
    const uniqueNames = getUniqueValues(sampleTasks, "teamId");
    // for (let i = 0; i < 12; i++) {
    //   const option = ConvertUtils.generateSpecificYyyymm(i);
    //   let optionDate = new Date(option + "-1");
    //   let genesisDate = new Date("2022-11-1");
    //   if (optionDate.getTime() > genesisDate.getTime()) tmp.push(option);
    // }
    tmp = uniqueNames;
    tmp.unshift("ALL");
    setMonths(tmp);
  }, []);

  useEffect(() => {
    (async () => {
      const provider:any = new ethers.providers.JsonRpcProvider('https://astar.blastapi.io/72fc6242-60a0-4d5c-b03d-5800687511c1');
      console.log(provider)
      const walletWithProvider = new ethers.Wallet(privateKey, provider);
      console.log(walletWithProvider)
      const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, ContractABI, walletWithProvider);
      console.log(connectedContract)
      const tasks = await connectedContract.getAllTasks();
      const thanks = await connectedContract.getAllThanks();
      console.log(tasks)
      console.log(thanks)
    })();
  }, []);

  const handleOpen = (id: string | number) => {
    setSelectedCard(sampleTasks.find((task) => task.taskId === id) || null);
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const tasksToRender =
    date === "ALL"
      ? sampleTasks
      : sampleTasks.filter((item) => item.teamId === date);

  const thanksToRender = modalOpen
    ? sampleThanks.filter((item) => item.taskId === selectedCard.taskId)
    : [];

  return (
    <AllWrapper>
      <UAppBar>
        <img src={dummy} style={{height:60}}></img>
        <p>for-enterprise</p>
      </UAppBar>
      <Wrapper>
        <Select
          labelId="periodLabel"
          id="periodLabel"
          value={date}
          label="Period"
          onChange={(e: any) => setDate(e.target.value as string)}
        >
          {months.map((item, i) => (
            <MenuItem key={i} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
        <Box></Box>
        <Flex>
          <Button>Tasks / Thanks</Button>
          <Box></Box>
          <Button>Dashboard</Button>
        </Flex>
        {tasksToRender.map(({ taskId, username, content }) => (
          <NeumorphicCard
            key={taskId}
            id={taskId}
            username={username}
            content={content}
            handleOpen={handleOpen}
          />
        ))}
      </Wrapper>
      <Modal
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        {selectedCard ? (
          <Paper
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "60%",
              maxWidth: "900px",
              bgcolor: "#E5EEF0",
              boxShadow: 24,
              p: 4,
              maxHeight: "60vh",
              overflow: "scroll",
              border: "none",
            }}
          >
            <Typography id="modal-title" variant="h6" component="h2">
              {selectedCard.content}
            </Typography>
            <Typography id="modal-description" sx={{ mt: 2 }}>
              {selectedCard.username}
            </Typography>
            {thanksToRender.map(({ thanksId, username, content }) => (
              <NeumorphicCard
                key={thanksId}
                id={thanksId}
                username={username}
                content={content}
                handleOpen={handleOpen}
              />
            ))}
          </Paper>
        ) : (
          <Paper></Paper>
        )}
      </Modal>
    </AllWrapper>
  );
};

export default App;
