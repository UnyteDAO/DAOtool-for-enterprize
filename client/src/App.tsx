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
import { Wrapper, AllWrapper, UAppBar } from "./StyledComps";
import { Link } from "react-router-dom";

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
interface NeumorphicCardProps extends CardData {
  handleOpen: (id: number) => void;
}

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
  const [todos, setTodos] = useState<Todo[]>([]);
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

  const handleOpen = (id: number) => {
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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleAddTodo = () => {
    if (!inputValue.trim()) {
      return;
    }

    const newTodo: Todo = {
      id: uuidv4(),
      text: inputValue,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setInputValue("");
  };

  const handleToggleTodo = (id: string) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );

    setTodos(updatedTodos);
  };

  const handleDeleteTodo = (id: string) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);

    setTodos(updatedTodos);
  };

  return (
    <AllWrapper>
      <UAppBar>
        <img src="./assets/icon_wide.png"></img>
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
        {cardData.map(({ id, userName, content }) => (
          <NeumorphicCard
            key={id}
            id={id}
            userName={userName}
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
              {selectedCard.userName}
            </Typography>
            <Typography id="modal-description" sx={{ mt: 2 }}>
              {!selectedCard.content}
            </Typography>
            {thanksCardData.map(({ id, userName, content }) => (
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
