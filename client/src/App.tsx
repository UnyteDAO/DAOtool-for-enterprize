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

dotenv.config({
  path: path.resolve(__dirname, ".env"),
});

import { ethers } from "ethers";
// ABIのインポート
import abi from "./contracts/Unyte.json";
const CONTRACT_ADDRESS = "0xaE270728bA33666714276F7feCA401DbB716ef7b";
// ABIの参照
const ContractABI = abi.abi;
const privateKey: any = process.env.PRIVATE_KEY;

type Todo = {
  id: string;
  text: string;
  completed: boolean;
};
interface CardData {
  id: number;
  userName: string;
  content: string;
}
interface Task {
  taskId: string | number;
  teamId: string | number;
  username: string;
  content: string;
  avatarURL: string;
}
interface Thanks {
  thanksId: string | number;
  teamId: string | number;
  content: string;
  taskId: string | number;
  avatarURL: string;
}
interface NeumorphicCardProps extends CardData {
  handleOpen: (id: string | number) => void;
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
    teamId: 1,
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
];

const cardData: CardData[] = [
  { id: 1, userName: "User 1", content: "This is a sample content." },
  { id: 2, userName: "User 2", content: "This is another sample content." },
  { id: 13, userName: "User 1", content: "This is a sample content." },
  { id: 3343, userName: "User 2", content: "This is another sample content." },
  { id: 3424234, userName: "User 1", content: "This is a sample content." },
  { id: 21, userName: "User 2", content: "This is another sample content." },
  // ...
];

const thanksCardData: CardData[] = [
  { id: 1, userName: "User 1", content: "This is a sample content." },
  { id: 2, userName: "User 2", content: "This is another sample content." },
  { id: 13, userName: "User 1", content: "This is a sample content." },
  { id: 3343, userName: "User 2", content: "This is another sample content." },
  { id: 3424234, userName: "User 1", content: "This is a sample content." },
  { id: 21, userName: "User 2", content: "This is another sample content." },
  { id: 1, userName: "User 1", content: "This is a sample content." },
  { id: 2, userName: "User 2", content: "This is another sample content." },
  { id: 13, userName: "User 1", content: "This is a sample content." },
  { id: 3343, userName: "User 2", content: "This is another sample content." },
  { id: 3424234, userName: "User 1", content: "This is a sample content." },
  { id: 21, userName: "User 2", content: "This is another sample content." },
  // ...
];

const NeumorphicCardWrapper = styled(Card)(({ theme }) => ({
  borderRadius: "1rem",
  backgroundColor: "#E5EEF0",
  // background: "linear-gradient(to right, #ff7f50, #ff1493)",
  boxShadow: "10px 10px 10px #d9d9d9, -10px -10px 10px #ffffff",
  textDecoration: "none",
  minWidth: 275,
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(2),
  width: "80%",
}));

const NeumorphicCard: React.FC<NeumorphicCardProps> = ({
  id,
  userName,
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
            {userName}
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
    // for (let i = 0; i < 12; i++) {
    //   const option = ConvertUtils.generateSpecificYyyymm(i);
    //   let optionDate = new Date(option + "-1");
    //   let genesisDate = new Date("2022-11-1");
    //   if (optionDate.getTime() > genesisDate.getTime()) tmp.push(option);
    // }
    tmp.unshift("ALL");
    setMonths(tmp);
  }, []);

  // useEffect(() => {
  //   (async () => {
  //     const numberValue = 123456789;
  //     const hexString = numberValue.toString(16);
  //     console.log(privateKey)
  //     const provider:any = new ethers.providers.JsonRpcProvider('https://polygon-mumbai.g.alchemy.com/v2/OYM4nSdwayU_AlLiq50U7TFXnKqXXcuL');
  //     console.log(provider)
  //     const walletWithProvider = new ethers.Wallet(privateKey, provider);
  //     console.log(walletWithProvider)
  //     const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, ContractABI, walletWithProvider);
  //     console.log(connectedContract)
  //     const tasks = await connectedContract.getAllTasks();
  //     console.log(tasks)
  //   })();
  // }, []);

  const handleOpen = (id: string | number) => {
    setSelectedCard(cardData.find((card) => card.id === id) || null);
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  // TODO: apiの呼び出しはファイルで切り出す
  // const fetchUrl = useCallback(async () => {
  //   const fragment = new URLSearchParams(window.location.hash.slice(1));
  //   const [accessToken, tokenType] = [
  //     fragment.get("access_token"),
  //     fragment.get("token_type"),
  //   ];
  //   console.log(accessToken, tokenType);
  //   if (accessToken !== null) {
  //     console.log(accessToken);
  //     console.log(tokenType);
  //     fetch("https://discord.com/api/users/@me", {
  //       headers: {
  //         authorization: `${tokenType} ${accessToken}`,
  //       },
  //     })
  //       .then((result) => result.json())
  //       .then((response) => {
  //         setATfunc.setATCallback(response); // Context値更新
  //         setUser(response);
  //       })
  //       .catch(console.error);
  //   }
  // }, [setATfunc]);

  return (
    <AllWrapper>
      <UAppBar>
        <img src="../../assets/icon_wide.png"></img>
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
        {sampleTasks.map(({ taskId, username, content }) => (
          <NeumorphicCard
            key={taskId}
            id={taskId}
            userName={username}
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
              // background: "linear-gradient(to right, #ff7f50, #ff1493)",
              boxShadow: 24,
              p: 4,
              maxHeight: "60vh",
              overflow: "scroll",
              border: "none",
            }}
          >
            <Typography id="modal-title" variant="h6" component="h2">
              {selectedCard.userName}
            </Typography>
            <Typography id="modal-description" sx={{ mt: 2 }}>
              {!selectedCard.content}
            </Typography>
            {sampleThanks.map(({ id, userName, content }) => (
              <NeumorphicCard
                key={id}
                id={id}
                userName={userName}
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
