import React, { useState, useEffect } from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';

import styles from './CountryPicker.module.css';

import { fetchCountries } from '../../api';

const CountryPicker = ({ handleCountryChange }) => {
    const [fetchedCountries, setFetchedCountries] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setFetchedCountries(await fetchCountries());
        }

        fetchAPI();
    }, [setFetchedCountries]);
    // if second parameter present, useEffect will only activate if the values CHANGE
    // (if not present now they stream endlessly)
    // now it will change only if setFetchedCountries change

    console.log(fetchedCountries);

    return (
        <FormControl className={styles.formControl}>
            <NativeSelect defaultValue="" onChange={(event) => handleCountryChange(event.target.value)}>
                <option value="">Global</option>
                {fetchedCountries.map((country, i) => <option key={i} value={country}>{ country }</option>)}
            </NativeSelect>
        </FormControl>
    )
}

export default CountryPicker;