import React, { useState, useEffect } from 'react';
import './App.css';

function App() {

  const [records, setRecords] = useState([]);
  const [filterdata, setFilterdata] = useState([]);
  const [query, setQuery] = useState('');

  const [modeldata, setModeldata] = useState({
    Mfr_Name: "",
    Country: "",
    VehicleTypes:""

  })
  useEffect(() => {
    fetch("https://vpic.nhtsa.dot.gov/api/vehicles/getallmanufacturers?ManufacturerType=Intermediate&format=json")
      .then(response => response.json())
      .then(data => {

        setRecords(data.Results)
        setFilterdata(data.Results)
      })

  }, [])

  const showDetail = (Mfr_Name) => {
    fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/getallmanufacturers?ManufacturerType=Intermediate&format=json/${Mfr_Name}`)
      .then(response => response.json())
      .then(res => { setModeldata(res) })
  }

  const handleSearch = (e) => {
    const getsearch = e.target.value;
    if (getsearch.length > 0) {

      const serachdata = records.filter((item) => item.Mfr_Name.toLowerCase().includes(getsearch));
      setRecords(serachdata);

    } else {
      setRecords(filterdata);
    }
    setQuery(getsearch);
  }

  return (
    <div className="App">

      <h1>VEHICLE MANUFACTURERS</h1>
      <div className='search-box'>
        <label>Search:</label>
        <input type="text" value={query} placeholder='search' onChange={(e) => handleSearch(e)}></input>
        <label>Filter by vehicle type:</label>
        <select>
          <option value="All">All</option>
          <option value="Passenger car">Passenger car</option>
          <option value="Truck">Truck</option>
          <option value="Trailer">Trailer</option>
          <option value="Multipurpose vehicle">Multipurpose vehicle</option>
          <option value="Bus">Bus</option>
        </select>

      </div>

      <table className='table'>
        <thead>
          <tr>
            <th>NAME</th>
            <th>COUNTRY</th>
            <th>TYPE</th>
            <th>Show Details</th>
          </tr>
        </thead>
        <tbody>
          {
            records.map((record, i) => (
              <tr key={i} >
                <td>{record.Mfr_Name}</td>
                <td>{record.Country}</td>
                <td>{record.VehicleTypes.Name ? record.VehicleTypes.Name : "Passenger car"}</td>
                <td><button onClick={(e) => showDetail(record.Mfr_Name)} data-toggle="model" data-target="#mymodel">Details</button></td>
              </tr>
            ))
          }
        </tbody>
      </table>

      <div className='model-box' id='mymodel'>
        <p>{modeldata.Mfr_Name}</p>
       

      </div>

    </div>
  );
}

export default App;
