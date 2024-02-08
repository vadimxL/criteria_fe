import {Box, CircularProgress, FormControl, InputLabel, ListSubheader, MenuItem, Select} from "@mui/material";
import Chip from "@mui/material/Chip";
import React, {useEffect, useState} from "react";
import {
    useQueries,
} from '@tanstack/react-query'


const MODEL_API_URL = 'http://127.0.0.1:8000/models/';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const Models = ({manufacturers, setModels}) => {
    const [selectedModels, setSelectedModels] = useState([]);

    const onModels = (event) => {
        console.log("Event: " + event.target.value)
        setSelectedModels(event.target.value);
        setModels(event.target.value);
    }

    console.log("Manufacturers: " + manufacturers)
    const results = useQueries({
        queries: manufacturers.map((manufacturer) => {
            return {
                queryKey: ['models', manufacturer],
                queryFn: () =>
                    fetch(MODEL_API_URL + manufacturer.value).then((res) =>
                        res.json(),
                    ),
            }
        })
    })

    useEffect(() => {
            setSelectedModels([]);
    }, [manufacturers]);

    let items = [].concat(...results.map(({data}) => (data)))

    const isLoading = results.some(result => result.isLoading)

    if (isLoading) return <CircularProgress/>

    console.log("Items: " + JSON.stringify(items))

    const groupedItems = items.reduce((acc, item) => {
        const breadcrumbKey = item.breadcrumbs[0];

        if (!acc[breadcrumbKey]) {
            acc[breadcrumbKey] = [];
        }

        acc[breadcrumbKey].push({
            text: item.text,
            value: item.value
        });

        return acc;
    }, {});

    console.log("Grouped items: " + JSON.stringify(groupedItems))

    return (
        <FormControl fullWidth>
            <InputLabel>Model</InputLabel>
            <Select
                multiple
                onChange={(e) => onModels(e)}
                renderValue={(selected) => (
                    <Box>
                        {selected.map((value) => (
                            <Chip key={value} label={value}/>
                        ))}
                    </Box>
                )}
                value={selectedModels}
                label="Model"
            >
                {Object.keys(groupedItems).length > 0 ? (
                    [].concat(
                        ...Object.entries(groupedItems).map(([breadcrumb, items]) => [
                            <ListSubheader key={breadcrumb}>{breadcrumb}</ListSubheader>,
                            ...items.map((item) => (
                                <MenuItem key={item.value} value={item.text}>
                                    {item.text}
                                </MenuItem>
                            )),
                        ])
                    )
                ) : (
                    <MenuItem key={1} value={"No models"}>
                        No models
                    </MenuItem>
                )}
            </Select>
        </FormControl>
    )
}

export default Models;