import React, {useCallback, useEffect, useState} from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import {CircularProgress, TextField} from "@mui/material";
import {useQuery} from "@tanstack/react-query";

const API_URL = 'http://127.0.0.1:8000/manufacturers';

const Manufacturers = ({setManufs}) => {
    let limit = 3;


    const [limitReached, setLimitReached] = useState(false);
    const [values, setValues] = useState([]);
    const onSelect = (event, newValues) => {
        setValues(newValues);
        setLimitReached(newValues.length >= limit);
        console.log("selected manufacturers: " + newValues)
        setManufs(newValues);
    };

    const checkDisable = useCallback(option => limitReached && !values.includes(option), [limitReached, values]);

    const { isLoading, isError, data, error } = useQuery({
        queryKey: ['manufacturers'],
        queryFn: () =>
            fetch(API_URL).then((res) =>
                res.json(),
            ),
    })


    if (isError) return 'An error has occurred: ' + error.message

    return (<Autocomplete
            multiple
            getOptionDisabled={checkDisable}
            onChange={onSelect}
            id="multiple-limit-tags"
            options={data || []}
            getOptionLabel={(data) => data.text}
            loading={isLoading}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Manufacturers"
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                />
            )}
            sx={{width: '500px'}}
        />
    );
};

export default Manufacturers;
