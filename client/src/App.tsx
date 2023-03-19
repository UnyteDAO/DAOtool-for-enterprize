import React, { useState } from "react";
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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState("");

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
    <ThemeProvider theme={theme}>
      <Box></Box>
      <Typography variant="h4" gutterBottom>
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
      </Button>

      <List>
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
      </List>
    </ThemeProvider>
  );
};

export default App;
