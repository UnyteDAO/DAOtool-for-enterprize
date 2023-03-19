import React, { useCallback, useState, FC, useEffect } from "react";
import { theme } from "./CreateTheme";
import { ThemeProvider } from "@mui/material/styles";
import { v4 as uuidv4 } from "uuid";
import {
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  Avatar,
  Modal,
  Paper,
  Select,
  MenuItem,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { AccountCircle } from "@mui/icons-material";
import { Wrapper, AllWrapper, UAppBar, Flex } from "./StyledComps";

import path from "path";
import dotenv from "dotenv";

import dummy from "./assets/iconwhite.webp";

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
// interface Thanks {
//   thanksId: any;
//   teamId: any;
//   content: string;
//   taskId: any;
//   avatarURL: string;
// }
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
  imageUrl,
  content,
  handleOpen,
}) => {
  return (
    <NeumorphicCardWrapper onClick={() => handleOpen(id)}>
      <CardContent>
        <Box display="flex" alignItems="center" mb={1}>
          <Avatar alt="Profile Picture" src={imageUrl}></Avatar>
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

const ThanksCard: React.FC<NeumorphicCardProps> = ({
  thanksId,
  content,
  fromIconURL,
  fromUsername,
  toIconURL,
  toUsername,
  handleOpen,
}) => {
  return (
    <NeumorphicCardWrapper onClick={() => handleOpen(thanksId)}>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {content}
        </Typography>
        <Box display="flex" alignItems="center" mb={1}>
          <p>from: </p>
          <Avatar alt="Profile Picture" src={fromIconURL}></Avatar>
          <Typography variant="h6" component="div" sx={{ ml: 1 }}>
            {fromUsername}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" mb={1}>
          <p>to: </p>
          <Avatar alt="Profile Picture" src={toIconURL}></Avatar>
          <Typography variant="h6" component="div" sx={{ ml: 1 }}>
            {toUsername}
          </Typography>
        </Box>
      </CardContent>
    </NeumorphicCardWrapper>
  );
};

const App: FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<CardData | null | any>(null);
  const [date, setDate] = React.useState<string | null>("ALL");
  const [months, setMonths] = useState(["ALL"]);
  const [onchainTasks, setOnchainTasks] = useState([]);
  const [onchainThanks, setOnchainThanks] = useState([]);

  useEffect(() => {
    let tmp: any = [];
    const getUniqueValues = (array: any, key: any) => {
      const uniqueValues = new Set(array.map((item: any) => item[key]));
      return Array.from(uniqueValues);
    };
    const uniqueNames = getUniqueValues(sampleTasks, "teamId");
    tmp = uniqueNames;
    tmp.unshift("ALL");
    setMonths(tmp);
  }, []);

  useEffect(() => {
    (async () => {
      const provider: any = new ethers.providers.JsonRpcProvider(
        "https://astar.blastapi.io/72fc6242-60a0-4d5c-b03d-5800687511c1"
      );
      const walletWithProvider = new ethers.Wallet(privateKey, provider);
      const connectedContract = new ethers.Contract(
        CONTRACT_ADDRESS,
        ContractABI,
        walletWithProvider
      );
      const tasks = await connectedContract.getAllTasks();
      const thanks = await connectedContract.getAllThanks();
      console.dir(thanks);
      setOnchainTasks(tasks);
      setOnchainThanks(thanks);
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
      ? onchainTasks
      : onchainTasks.filter((item: any) => item.teamId === date);

  const thanksToRender = modalOpen
    ? onchainThanks.filter((item: any) => item.taskId === selectedCard.taskId)
    : [];

  return (
    <AllWrapper>
      <UAppBar>
        <img src={dummy} style={{ height: 60 }}></img>
        {/* <p>for-enterprise</p> */}
      </UAppBar>
      <Wrapper>
        <Flex>
          <p>チーム選択</p>
          <Box sx={{ marginRight: "16px" }}></Box>
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
        </Flex>
        <Box sx={{ marginTop: "16px" }}></Box>
        <Flex>
          <Button>Tasks/Thanks</Button>
          <Box sx={{ marginRight: "16px" }}></Box>
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
              <ThanksCard
                key={thanksId}
                thanksId={thanksId}
                content={content}
                fromIconURL={fromIconURL}
                fromUsername={fromUsername}
                toIconURL={toIconURL}
                toUsername={toUsername}
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
