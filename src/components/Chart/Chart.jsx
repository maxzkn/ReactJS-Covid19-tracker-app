import React, { useState, useEffect } from 'react'; // needed for hooks
import { fetchDailyData } from '../../api';
import { Line, Bar } from 'react-chartjs-2';

import styles from './Chart.module.css';

const Chart = ({ data: { confirmed, recovered, deaths }, country }) => {
    // specify the state (once we fetch the data, we set it to state using hooks)
    const [dailyData, setDailyData] = useState([]); // initial value is empty object
    // also dailyData (which is in array) can be represented like this:
    // state = {
    //     dailyData: {}
    // }

    useEffect(() => { // can't use async on useEffect(), so use it inside on a function
        const fetchAPI = async () => {
            // const dailyData = await fetchDailyData(); // return is promise bc it's asynchronous
            setDailyData(await fetchDailyData()); // return is promise bc it's asynchronous
        }

        console.log(dailyData);

        fetchAPI();
    }, []); // empty array so it behaves like a componentDidMount, like it happens only once, otherwise it's endless

    const lineChart = (
        // if first data is available
        dailyData.length ? (
            <Line
                // initially no data, so add if statement
                data={{ // first {} indicate that this is dynamic (like all), witch second {} we indicate that this is the object
                    labels: dailyData.map(({ date }) => date),
                    // two datasets bc api doesn't provide data for recovered people
                    datasets: [{
                        data: dailyData.map(({ confirmed }) => confirmed),
                        label: 'Confirmed',
                        borderColor: 'rgba(255, 0, 0, 0.5)',
                        backgroundColor: 'rgba(255, 0, 0, 0.1)',
                        fill: true,
                    }, {
                        data: dailyData.map(({ deaths }) => deaths),
                        label: 'Deaths',
                        borderColor: 'rgba(0, 0, 0, 0.5)',
                        backgroundColor: 'rgba(0, 0, 0, 0.1)',
                        fill: true,
                    }],
                }}
            />) : null
    );

    const barChart = (
        confirmed ? (
            <Bar
                data={{
                    labels: ['Confirmed', 'Recovered', 'Deaths'],
                    datasets: [{
                        label: 'People',
                        backgroundColor: [
                            'rgba(255, 0, 0, 0.5)',
                            'rgba(0, 255, 0, 0.5)',
                            'rgba(0, 0, 0, 0.5)',
                        ],
                        data: [confirmed.value, recovered.value, deaths.value]
                    }]
                }}
                options={{
                    legend: { display: false },
                    title: { display: true, text: `Current state in ${country}` }
                }}
            />
        ) : null
    )

    return (
        <div className={styles.container}>
            {country ? barChart : lineChart}
        </div>
    )
}

export default Chart;