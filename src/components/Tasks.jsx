import {useEffect, useState} from "react";
import {Accordion, AccordionDetails, AccordionSummary} from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Navbar from "../Navbar";


function ArrowDownwardIcon() {
    return null;
}

export default function Tasks() {
    const [tasks, setTasks] = useState([]);

    const fetchTasks = () => {
        fetch("http://localhost:8000/tasks")
            .then((r) => r.json())
            .then((tasks) => setTasks(tasks));
    }

    console.log("Fetching tasks...." + tasks);
    useEffect(() => {
        fetchTasks();
    }, []);


    function DeleteTask({id}) {
        const deleteTodo = async () => {
            await fetch(`http://localhost:8000/tasks/${id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: { "id": id }
            })
            await fetchTasks()
        }

        return (
            <Button h="1.5rem" size="sm" onClick={deleteTodo}>Delete Todo</Button>
        )
    }

    return (
        <div>
            <Navbar />
            {tasks.map((task) => {
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
                        <DeleteTask id={task.id}/>
                    </AccordionDetails>
                </Accordion>)
            })}
        </div>
    )
}