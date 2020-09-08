import axios from 'axios'; // used to make api requests

const url = 'https://covid19.mathdro.id/api';

// async deals with promises the same way as .then and .catch does, but much easier to r/w
export const fetchData = async (country) => {
    let changeableURL = url;

    if (country) {
        changeableURL = `${url}/countries/${country}`;
    }
    // if fetch is successful
    try {
        // const response = await axios.get(url);
        // console.log(response);
        // return response;

        // destructurize data property (reponse.data) from response Object
        const { data: { confirmed, recovered, deaths, lastUpdate } } = await axios.get(changeableURL);

        // const modifiedData = {
        //     confirmed: data.confirmed,
        //     recovered: data.recovered,
        //     deaths: data.deaths,
        //     lastUpdate: data.lastUpdate
        // }

        const modifiedData = {
            confirmed, // same as confirmed: confirmed
            recovered,
            deaths,
            lastUpdate
        }

        return modifiedData;

    } catch (error) {
        console.log(error);
    }
}

export const fetchDailyData = async () => {
    try {
        // const response = await axios.get('${url}/daily');
        const { data } = await axios.get(`${url}/daily`);
        console.log('fetchDailyData(): ');
        console.log(data);

        const modifiedData = data.map((dailyData) => ({ // ({}) means that we return an object!
            confirmed: dailyData.confirmed.total,
            deaths: dailyData.deaths.total,
            date: dailyData.reportDate,
        }));

        return modifiedData;

    } catch (error) {

    }
}

export const fetchCountries = async () => {
    try {
        const { data: { countries } } = await axios.get(`${url}/countries`);
        // console.log(response);

        return countries.map((country) => country.name);

    } catch (error) {

    }
}