import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css'
import Button from '@mui/material/Button';
import Addcar from './Addcar';
import Editcar from './Editcar';


export default function Carlist() {
    const [cars, setCars] = useState([]);

    useEffect(() => fetchData(), []);

    const fetchData = () => {
        fetch('https://carstockrest.herokuapp.com/cars')
            .then(response => response.json())
            .then(data => setCars(data._embedded.cars))
    }
    const deleteCar = (link) => {
        if (window.confirm('Do you want to delete')) {
            fetch(link, { method: 'DELETE' })
                .then(res => fetchData())
                .catch(err => console.error(err))
        }
    }
    const saveCar = (car) => {
        fetch('https://carstockrest.herokuapp.com/cars', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(car)
        })
            .then(res => fetchData())
            .catch(err => console.error(err))
    }

    const updateCar = (car, link) => {
        fetch(link, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(car)
        })
        .then (res => fetchData())
        .catch(err => console.errer(err))
    }


const columns = [
    {
        Header: 'Brand',
        accessor: 'brand'
    },
    {
        Header: 'Model',
        accessor: 'model'
    },
    {
        Header: 'Color',
        accessor: 'color'
    },
    {
        Header: 'Fuel',
        accessor: 'fuel'
    },
    {
        Header: 'Year',
        accessor: 'year'
    },
    {
        Header: 'Price',
        accessor: 'price'
    },
    {
        sortable: false,
        filterable: false,
        widht: 100,
        Cell: row => <Editcar updateCar={updateCar} car={row.original} />
    },
    {
        sortable: false,
        filterable: false,
        widht: 100,
        accessor: '_links.self.href',
        Cell: ({ value }) => <Button color='error' size='small' onClick={() => deleteCar(value)}>Delete</Button>
    }
]

return (
    <div>
        <Addcar saveCar={saveCar} />
        <ReactTable filterable={true} data={cars} columns={columns} />
    </div>
)
}