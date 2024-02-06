import {Box, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import Chip from "@mui/material/Chip";
import React, {useEffect, useState} from "react";
import {
    useQuery,
} from '@tanstack/react-query'


const MODEL_API_URL = 'http://127.0.0.1:8000/models/';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const ModelsSelect = ({manufacturer}) => {
    const [selectedModels, setSelectedModels] = useState([]);

    console.log("selected manufs: " + manufacturer)

    const { isPending, error, data } = useQuery({
        queryKey: ['repoData', manufacturer],
        queryFn: () =>
            fetch(MODEL_API_URL + manufacturer).then((res) =>
                res.json(),
            ),

    })
    useEffect(() => {
            setSelectedModels([]);
    }, [manufacturer]);

    if (isPending) return 'Loading...'
    if (error) return 'An error has occurred: ' + error.message

    return (
        <FormControl sx={{m: 1, width: 300}}>
            <InputLabel id="select-model-label">Model</InputLabel>
            <Select
                labelId="select-model"
                id="select-model"
                multiple
                isLoading={isPending}
                onChange={(event) => setSelectedModels(event.target.value)}
                renderValue={(selected) => (
                    <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                        {selected.map((value) => (
                            <Chip key={value} label={value}/>
                        ))}
                    </Box>
                )}
                value={selectedModels}
                label="Model"
                MenuProps={MenuProps}
            >
                {Array.isArray(data) ? (
                    data.map((item) => (
                        <MenuItem key={item.value} value={item.text}>
                            {item.text}
                        </MenuItem>
                    ))
                ) : (
                    <MenuItem key={1} value={"No models"}>
                        No models
                    </MenuItem>
                )}
            </Select>
        </FormControl>
    )
}

export default ModelsSelect;