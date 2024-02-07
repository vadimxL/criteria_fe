import {Box, CircularProgress, FormControl, InputLabel, ListSubheader, MenuItem, Select} from "@mui/material";
import Chip from "@mui/material/Chip";
import React, {useEffect, useState} from "react";
import {
    useQueries,
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

const Models = ({manufacturers}) => {
    const [selectedModels, setSelectedModels] = useState([]);

    // const { isPending, error, data } = useQuery({
    //     queryKey: ['models'],
    //     queryFn: () =>
    //         fetch(MODEL_API_URL + manufacturers).then((res) =>
    //             res.json(),
    //         ),
    // })

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

    // return <span>Models</span>

    // if (isPending) return 'Loading...'
    // if (error) return 'An error has occurred: ' + error.message

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