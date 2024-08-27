import React, {useCallback, useEffect, useState} from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import {CircularProgress, TextField} from "@mui/material";
import {useQuery} from "@tanstack/react-query";

const API_URL = 'http://127.0.0.1:8000/manufacturers';
// const API_URL = 'https://gw.yad2.co.il/search-options/vehicles/cars?fields=manufacturer';

const Manufacturers = ({setManufs}) => {
    let limit = 3;


    const [limitReached, setLimitReached] = useState(false);
    const [values, setValues] = useState([]);
    // const onSelect = (event, newValues) => {
    //     setValues(newValues);
    //     setLimitReached(newValues.length >= limit);
    //     console.log("selected manufacturers: " + newValues)
    //     setManufs(newValues);
    // };

    const checkDisable = useCallback(option => limitReached && !values.includes(option), [limitReached, values]);

    const fetchManufacturers = async() => {
        const res = await fetch(API_URL)
        const res1 = await res.json()
        console.log("fetched manufacturers: " + res1)
        return res1
    };

    const { isLoading, isError, data, error } = useQuery({
        queryKey: ['manufacturers'],
        queryFn: fetchManufacturers
    })


    if (isError) return 'An error has occurred: ' + error.message

    // Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
    const top100Films = [
        { title: 'The Shawshank Redemption', year: 1994 },
        { title: 'The Godfather', year: 1972 },
        { title: 'The Godfather: Part II', year: 1974 },
        { title: 'The Dark Knight', year: 2008 },
        { title: '12 Angry Men', year: 1957 },
        { title: "Schindler's List", year: 1993 },
        { title: 'Pulp Fiction', year: 1994 },
        {
            title: 'The Lord of the Rings: The Return of the King',
            year: 2003,
        },
        { title: 'The Good, the Bad and the Ugly', year: 1966 },
        { title: 'Fight Club', year: 1999 },
        {
            title: 'The Lord of the Rings: The Fellowship of the Ring',
            year: 2001,
        }]

    return (<Autocomplete
        multiple
        id="tags-standard"
        options={data || []}
        onChange={(e, newVal) => {
            if (newVal > 3) {
                newVal.pop();
            }
            setAdded([...newVal]);
        }}
        getOptionLabel={(option) => option.text}
        getOptionDisabled={checkDisable}
        // defaultValue={[data[0]]}
        renderInput={(params) => (
            <TextField
                {...params}
                variant="standard"
                label="Multiple values"
                placeholder="Favorites"
            />
        )}
    />)


    // return (<Autocomplete
    //         multiple
    //         // getOptionDisabled={checkDisable}
    //         onChange={onSelect}
    //         id="multiple-limit-tags"
    //         options={data || []}
    //         getOptionLabel={(data) => data.text}
    //         loading={isLoading}
    //         renderInput={(params) => (
    //             <TextField
    //                 {...params}
    //                 label="Manufacturers"
    //                 placeholder="Manufacturers"
    //                 // InputProps={{
    //                 //     ...params.InputProps,
    //                 //     endAdornment: (
    //                 //         <React.Fragment>
    //                 //             {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
    //                 //             {params.InputProps.endAdornment}
    //                 //         </React.Fragment>
    //                 //     ),
    //                 // }}
    //             />
    //         )}
    //         sx={{width: '500px'}}
    //     />
    // );
};

export default Manufacturers;
