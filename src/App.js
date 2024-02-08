import * as React from 'react';
import {useEffect, useState} from 'react';
import axios from 'axios';

import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import * as PropTypes from "prop-types";
import CriteriaForm from "./components/CriteriaForm";
import TodoList from "./components/TodoList";
import AdvancedOptions from "./components/AdvancedOptions";
const CREATE_TASK_URL = 'http://127.0.0.1:8000/items';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();
const queryClient = new QueryClient()

CriteriaForm.propTypes = {
    onSubmit: PropTypes.func,
    manufs: PropTypes.func,
    manufacturers: PropTypes.arrayOf(PropTypes.any),
    models: PropTypes.func,
    renderInput: PropTypes.func
};
export default function SignUp() {
    const [selectedManufacturers, setSelectedManufacturers] = useState([]);
    const [selectedModels, setSelectedModels] = useState([]);
    const [todos, setTodos] = useState([]);

    const fetchTodos = () => {
        fetch("http://localhost:8000/items")
            .then((r) => r.json())
            .then((items) => setTodos(items));
    }

    console.log("Fetching todos...." + todos);
    useEffect(() => {
        fetchTodos();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const requestData = {
            id: todos.length + 1,
            email: data.get('email'),
            manufacturers: selectedManufacturers.map((manufs) => manufs.value),
            models: selectedModels.map((models) => models),
            year_range: {"min": data.get('start_year'), "max": data.get('end_year')},
            mileage_range: {"min": 0, "max": 100000},
            price_range: {"min": 0, "max": 100000},
        };

        console.log(requestData);

        try {
            const response = await axios.post(CREATE_TASK_URL, requestData);

            // Handle the response as needed
            console.log(response.data);
            fetchTodos();
        } catch (error) {
            // Handle errors
            console.error('Error sending PUT request:', error);
        }

    };
    useEffect(() => {

    }, []);

    const handleSetTodos = (newValues) => {
        console.log("**selected todos...." + todos);
        setTodos(newValues);
    }

    const  handleManufSelect = (newValues) => {
        console.log('**selected manufacturers: ', newValues);
        setSelectedManufacturers(newValues);
    }

    const handleModelSelect = (newValues) => {
        console.log('**selected models: ', newValues);
        setSelectedModels(newValues);
    }

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={defaultTheme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline/>
                    <CriteriaForm onSubmit={handleSubmit} manufs={handleManufSelect}
                                  manufacturers={selectedManufacturers} models={handleModelSelect}
                                  renderInput={(params) => <TextField {...params} />}/>
                    {todos.length > 0 ? (<TodoList todos={todos} fetchTodos={fetchTodos}/>) : (
                        <div> No todos found</div>)}
                    <AdvancedOptions/>
                    <Copyright sx={{mt: 5}}/>
                </Container>
            </ThemeProvider>
        </QueryClientProvider>
    );
}