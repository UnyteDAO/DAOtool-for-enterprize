import React, { useCallback, useState, FC } from "react";
import logo from "./logo.svg";
import "./App.css";
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
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { AccountCircle } from "@mui/icons-material";
import { Wrapper } from "./StyledComps";
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

const cardData: CardData[] = [
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
  backgroundColor: "#f0f0f0",
  boxShadow: "20px 20px 60px #d9d9d9, -20px -20px 60px #ffffff",
  minWidth: 275,
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
  width: "80%",
}));

const NeumorphicCard: React.FC<CardData> = ({ userName, content }) => {
  return (
    <NeumorphicCardWrapper>
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
    // <Box>
    <ThemeProvider theme={theme}>
      <AppBar>
        <Link to="/">
          <Box
            component="img"
            justifyContent="left"
            sx={{
              height: 64,
              display: { xs: "none", md: "flex" },
            }}
            alt="Your logo."
            src={`../../../../icon_wide.png`}
          ></Box>
        </Link>
        <Link to="/">
          <Box
            component="img"
            justifyContent="left"
            sx={{
              height: 64,
              display: { xs: "flex", md: "none" },
              ml: 4,
            }}
            alt="Your logo."
            src={`../../../../icon.png`}
          ></Box>
        </Link>
      </AppBar>
      <Wrapper>
        {cardData.map(({ id, userName, content }) => (
          <NeumorphicCard
            key={id}
            userName={userName}
            content={content}
            id={0}
          />
        ))}
      </Wrapper>
    </ThemeProvider>
    // </Box>

    /* <Typography variant="h4" gutterBottom>
        Todo List
      </Typography>

      <TextField
        label="New Todo"
        variant="outlined"
        size="small"
        value={inputValue}
        onChange={handleInputChange}
      />

      <Button
        variant="contained"
        onClick={handleAddTodo}
        disabled={!inputValue.trim()}
      >
        Add Todo
      </Button> */
    /* <List>
        {todos.map((todo) => (
          <ListItem
            key={todo.id}
            dense
            button
            onClick={() => handleToggleTodo(todo.id)}
          >
            <Checkbox
              edge="start"
              checked={todo.completed}
              tabIndex={-1}
              disableRipple
            />

            <ListItemText
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
              }}
              primary={todo.text}
            />

            <ListItemSecondaryAction>
              <IconButton edge="end" onClick={() => handleDeleteTodo(todo.id)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List> */
  );
};

export default App;
