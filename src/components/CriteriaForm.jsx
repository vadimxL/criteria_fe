import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import {pink} from "@mui/material/colors";
import PageviewIcon from "@mui/icons-material/Pageview";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Manufacturers from "./Manufacturers";
import Models from "./Models";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import * as React from "react";

export default function CriteriaForm(props) {
    return <Box
        sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        }}
    >
        <Avatar sx={{bgcolor: pink[500]}}>
            <PageviewIcon/>
        </Avatar>
        <Typography component="h1" variant="h5">
            יצירת קריטריון
        </Typography>
        <Box component="form" noValidate onSubmit={props.onSubmit} sx={{mt: 3}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Manufacturers setManufs={props.manufs}/>
                </Grid>
                <Grid item xs={12}>
                    <Models manufacturers={props.manufacturers} setModels={props.models}/>
                </Grid>
                <Grid item xs={6}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Start year"
                            id="start_year"
                            name="start_year"
                            views={["year"]}
                            renderInput={props.renderInput}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={6}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="End year"
                            id="end_year"
                            name="end_year"
                            views={["year"]}
                            renderInput={props.renderInput}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                    />
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
    </Box>;
}