import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import {green, pink} from '@mui/material/colors';
import PageviewIcon from '@mui/icons-material/Pageview';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import ManufAutocomplete from "./ManufAutocomplete";
import ModelsSelect from "./ModelsSelect";
import {useEffect, useState} from "react";
import TodoList from "./components/TodoList";
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'

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

export default function SignUp() {
    const [selectedManufacturers, setSelectedManufacturers] = useState([]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };
    useEffect(() => {

    }, []);

    const handleManufChange = (event, newValue) => {
        console.log('**selected mwnu', newValue, event);
        setSelectedManufacturers(event);
    }

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={defaultTheme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline/>
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{bgcolor: pink[500]}}>
                            <PageviewIcon/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            יצירת קריטריון
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <ManufAutocomplete setManufs={handleManufChange}/>
                                </Grid>
                                <Grid item xs={12}>
                                    <ModelsSelect manufacturer={selectedManufacturers} />
                                </Grid>
                                <Grid item xs={6}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            label="Start year"
                                            views={['year']}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item xs={6}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            label="End year"
                                            views={['year']}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={<Checkbox value="allowExtraEmails" color="primary"/>}
                                        label="I want to receive inspiration, marketing promotions and updates via email."
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                            >
                                צור קיטריון לקבלת התראות
                            </Button>
                            <Typography component="h1" variant="h5">
                                TODO List
                            </Typography>
                        </Box>
                    </Box>
                    <TodoList/>
                    <Copyright sx={{mt: 5}}/>
                </Container>
            </ThemeProvider>
        </QueryClientProvider>
    );
}