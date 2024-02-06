import React, {useEffect, useState} from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import {TextField} from "@mui/material";

const API_URL = 'http://127.0.0.1:8000/manufacturers';

const ManufAutocomplete = ({setManufs}) => {
    const [options, setOptions] = useState([]);


    const handleChange = (event, item) => {
        if (!item) {
            setManufs([]);
            return;
        }
        console.log("selected manufacturer:" + item.value)
        setManufs(item.value);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(API_URL);
                if (!response.ok) {
                    throw new Error('Failed to fetch options');
                }
                const jsonData = await response.json();
                setOptions(jsonData);
            } catch (error) {
                console.error('Error fetching options:', error);
            } finally {
                console.log(options)
            }
        };

        fetchData();
    }, []); // Empty dependency array means this effect runs once when the component mounts

    return (
        <Autocomplete
            disablePortal
            id="autocomplete-manufacturer"
            onChange={handleChange}
            options={options}
            getOptionLabel={(option) => option.text}
            renderInput={(params) => <TextField {...params} label="Manufacturer" />}
        />
    );
};

export default ManufAutocomplete;
