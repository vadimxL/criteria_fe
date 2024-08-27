import {useState} from "react";
import {Accordion, AccordionDetails, AccordionSummary} from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";


function ArrowDownwardIcon() {
    return null;
}

export default function Tasks({todos, fetchTodos}) {
    const [inputVal, setInputVal] = useState("");
    const [isEdited, setIsEdited] = useState(false);
    const [editedId, setEditedId] = useState(null);

    console.log("Todos: " + JSON.stringify(todos))

    function DeleteTask({id}) {
        const deleteTodo = async () => {
            await fetch(`http://localhost:8000/tasks/${id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: { "id": id }
            })
            await fetchTodos()
        }

        return (
            <Button h="1.5rem" size="sm" onClick={deleteTodo}>Delete Todo</Button>
        )
    }

    return (
        <div>
            {todos.map((task) => {
                return (<Accordion>
                    <AccordionSummary
                        expandIcon={<ArrowDownwardIcon/>}
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        <Typography>{"id: " + task.id}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {/*{task.car_models.map((model) => (*/}
                        {/*    <Typography key={model} color="primary" variant="body2">*/}
                        {/*        {model}*/}
                        {/*    </Typography>*/}
                        {/*))}*/}
                        <Typography color="primary" level="title-lg">Manufacturers:</Typography>
                        <Typography level="body-lg"> {task.manufacturers} </Typography>
                        <Typography color="primary" level="title-lg">Models:</Typography>
                        <Typography level="body-lg"> {task.car_models} </Typography>
                        <Typography color="primary" level="title-lg">Submodels:</Typography>
                        <Typography level="body-lg"> {task.car_submodels} </Typography>
                        {/*<Typography color="primary" level="title-lg">Year Range:</Typography>*/}
                        {/*<Typography level="body-lg"> {task.year_range.min + "-" + task.year_range.max} </Typography>*/}
                        {/*<Typography color="primary" level="title-lg">Price Range:</Typography>*/}
                        {/*<Typography level="body-lg"> {task.price_range.min + "-" + task.price_range.max} </Typography>*/}
                        {/*<Typography color="primary" level="title-lg">Mileage Range:</Typography>*/}
                        {/*<Typography level="body-lg"> {task.mileage_range.min + "-" + task.mileage_range.max} </Typography>*/}
                        <DeleteTask id={task.id}/>
                    </AccordionDetails>
                </Accordion>)
            })}
        </div>
    )

    // return (
    //     <Container sx={{width: 800}}>
    //         <List>
    //             {todos.todos.map((todo) => {
    //                 return (
    //                     <>
    //                         <ListItem divider="bool">
    //                             <Card>
    //                                 <Checkbox
    //                                     onClick={() => handleDone(todo.id)}
    //                                     checked={todo.isDone}
    //                                 />
    //                                 <Typography
    //                                     style={{color: todo.isDone ? "green" : ""}}
    //                                     key={todo.id}
    //                                 >
    //                                     {todo.manufacturer}
    //                                 </Typography>
    //                                 <Stack direction="row">
    //                                     {todo.models.map((model) => {
    //                                         return <Chip color="primary" label={model} size="small"/>
    //                                     })}
    //                                     <Chip color="secondary" label={todo.year_range.min + "-" + todo.year_range.max} size="small"/>
    //                                     <Chip color="secondary" label={todo.price_range.min + "-" + todo.price_range.max} size="small"/>
    //                                     <Chip color="secondary" label={todo.mileage_range.min + "-" + todo.mileage_range.max} size="small"/>
    //                                 </Stack>
    //                                 <Button
    //                                     onClick={() => handleEdit(todo.id)}
    //                                     variant="contained"
    //                                 >
    //                                     Edit
    //                                 </Button>
    //                                 <Button
    //                                     onClick={() => onDelete(todo.id)}
    //                                     color="secondary"
    //                                     variant="contained"
    //                                 >
    //                                     delete
    //                                 </Button>
    //                             </Card>
    //                         </ListItem>
    //                     </>
    //                 );
    //             })}
    //         </List>
    //     </Container>
    // );
}