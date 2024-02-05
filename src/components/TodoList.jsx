import {useState, useEffect} from "react";
import {Card, Divider, List, ListItem, makeStyles, Stack} from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";


export default function TodoList() {
    const [inputVal, setInputVal] = useState("");
    const [todos, setTodos] = useState([]);
    const [isEdited, setIsEdited] = useState(false);
    const [editedId, setEditedId] = useState(null);

    useEffect(() => {
        fetch("http://localhost:8000/items")
            .then((r) => r.json())
            .then((items) => setTodos(items));
    }, []);

    const onChange = (e) => {
        setInputVal(e.target.value);
    };

    const handleClick = () => {
        if (!isEdited) {
            setTodos([
                ...todos,
                {val: inputVal, isDone: false, id: new Date().getTime()}
            ]);
        } else {
            setTodos([...todos, {val: inputVal, isDone: false, id: editedId}]);
        }
        setInputVal("");
        setIsEdited(false);
    };

    const onDelete = (id) => {
        const newTodos = todos.filter((todo) => todo.id !== id);
        setTodos(newTodos);
    };

    const handleDone = (id) => {
        const updated = todos.map((todo) => {
            if (todo.id === id) {
                todo.isDone = !todo.isDone;
            }
            return todo;
        });
        setTodos(updated);
    };

    const handleEdit = (id) => {
        const newTodos = todos.filter((todo) => todo.id !== id);
        const editVal = todos.find((todo) => todo.id === id);
        setEditedId(editVal.id);
        setInputVal(editVal.val);
        setTodos(newTodos);
        setIsEdited(true);
    };

    return (
        <Container sx={{width: 800}}>
            <List>
                {todos.map((todo) => {
                    return (
                        <>
                            <ListItem divider="bool">
                                <Card>
                                    <Checkbox
                                        onClick={() => handleDone(todo.id)}
                                        checked={todo.isDone}
                                    />
                                    <Typography
                                        style={{color: todo.isDone ? "green" : ""}}
                                        key={todo.id}
                                    >
                                        {todo.manufacturer}
                                    </Typography>
                                    <Stack direction="row">
                                        {todo.model.map((model) => {
                                            return <Chip color="primary" label={model} size="small"/>
                                        })}
                                        <Chip color="secondary" label={todo.year_range.min + "-" + todo.year_range.max} size="small"/>
                                        <Chip color="secondary" label={todo.price_range.min + "-" + todo.price_range.max} size="small"/>
                                        <Chip color="secondary" label={todo.mileage_range.min + "-" + todo.mileage_range.max} size="small"/>
                                    </Stack>
                                    <Button
                                        onClick={() => handleEdit(todo.id)}
                                        variant="contained"
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        onClick={() => onDelete(todo.id)}
                                        color="secondary"
                                        variant="contained"
                                    >
                                        delete
                                    </Button>
                                </Card>
                            </ListItem>
                        </>
                    );
                })}
            </List>
        </Container>
    );
}