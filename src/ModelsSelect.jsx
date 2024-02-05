import {Box, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import Chip from "@mui/material/Chip";
import React, {useState} from "react";
import ManufAutocomplete from "./ManufAutocomplete";

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

const ModelsSelect = ({selectedManufacturers}) => {
    const [models, setModels] = useState([]);
    const [selectedModels, setSelectedModels] = useState([]);
    const [loadingModels, setLoadingModels] = useState(false);

    const fetchModels = async () => {
        try {
            setLoadingModels(true);
            const response = await fetch(MODEL_API_URL + selectedManufacturers);
            if (!response.ok) {
                throw new Error('Failed to fetch options');
            }
            const jsonData = await response.json();
            setModels(jsonData);
        } catch (error) {
            console.error('Error fetching options:', error);
        } finally {
            console.log(models)
            setLoadingModels(false);
        }
    }

    return (
        <FormControl sx={{m: 1, width: 300}}>
            <InputLabel id="select-model-label">Model</InputLabel>
            <Select
                labelId="select-model"
                id="select-model"
                multiple
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
                {models.map((model) => (
                    <MenuItem key={model.value} value={model.text}>
                        {model.text}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

export default ModelsSelect;