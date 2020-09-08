import React from 'react';

// import Cards from './components/Cards/Cards';
// import Chart from './components/Chart/Chart';
// import CountryPicker from './components/CountryPicker/CountryPicker';
import { Cards, Chart, CountryPicker } from './components';
import styles from './App.module.css';
import { fetchData } from './api';

import coronaImage from './images/image.png'

class App extends React.Component {
    // using state is more readable and easier instead of constructor
    // (it is created under the hood in the backend)
    state = {
        // at the beginning object is empty until it is populated later
        data: {},
        country: '',
    }

    // best place to fetch the data in class-based component is inside componentDidMount()
    // in componentDidMount() async keyword is written before it
    async componentDidMount() {
        const fetchedData = await fetchData(); // wait for data
        console.log('componentDidMount():');
        console.log(fetchedData);

        this.setState({ data: fetchedData }); // populate data object in state here
    }

    handleCountryChange = async (country) => {
        // fetch the data
        const fetchedData = await fetchData(country);
        console.log(fetchedData);
        // console.log(country);

        // set the state
        this.setState({ data: fetchedData, country: country });
    } 

    render() {
        const { data, country } = this.state; // take the data from state

        return (
            <div className={styles.container}>
                <img className={styles.image} src={coronaImage} alt="COVID-19"/>
                {/* <Cards data={this.state.data} /> */}
                <Cards data={ data } /> {/* goes to Cards = (props) (Cards.jsx) */}
                <CountryPicker handleCountryChange={this.handleCountryChange}/>
                <Chart data={ data } country={ country }/>
            </div>
        )
    }
}

export default App;