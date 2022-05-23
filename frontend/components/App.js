import React, { useState } from "react";
import axios from "axios";
import './App.css';
import Form from './Form';
import Roster from './Roster';

const initalFormValues = {
  id: 0,
  name: '',
  series: ''
}

const dbLink = 'http://localhost:9000/api/smash'

function App() {
  const [fighters, setFighters] = useState([]);
  const [formValues, setFormValues] = useState(initalFormValues);
  const [message, setMessage] = useState('');
  const [disabled, setDisabled] = useState(true);

  const updateForm = (inputName, inputValue) => {
    setFormValues({ ...formValues, [inputName]: inputValue });
  }

  const addFighter = () => {
    const newFighter = {
      name: formValues.name.trim(),
      series: formValues.series.trim()
    }

    axios.post(`${dbLink}/add`, newFighter)
      .then(res => {
        setFighters(...fighters, res.data);
        setMessage(
          `${res.data.name} From  ${res.data.series} 
          Joins Your Brawl Team!!!`
        );
        setFormValues(initalFormValues);
        setDisabled(true);
      }).catch(err =>console.log(err));
  }

  const getAllFighters = () => {
    axios.get(`${dbLink}`)
      .then(res => {
        setFighters(res.data)
        setDisabled(false);
        setMessage('');
      }).catch(err => console.log(err));
  }


  const searchFighters = (id) => {
    axios.get(`${dbLink}/${id}`)
      .then(res => {
        setMessage(`Fighter Found_${res.data.name} From  ${res.data.series}`);
        setDisabled(true);
      })
  }

  const deleteFighter = (id) => {
    axios.delete(`${dbLink}/${id}`)
      .then(res => {
        console.log(res.data);
        setFighters(fighters.filter(fighter => {
          fighter.id !== id;
        }));
        setMessage(`${res.data.name} From  ${res.data.series} 
        Has Left Your Brawl Team!`);
        setFormValues(initalFormValues);
        setDisabled(true);
      }).catch(err => console.log(err.message));
  }

  return (
    <div className="App">
      <header>
        <h1>Smash Bros Ultimate Personal Database</h1>
        <h2>Track, Add And Delete Fighters To Your Roster</h2>
      </header>
      
    <Form 
      add={addFighter} 
      search={searchFighters}
      update={updateForm}
      values={formValues} 
    />
      
    <Roster
      dele={deleteFighter}
      disabled={disabled} 
      getAll={getAllFighters} 
      team={fighters}
    />

    <h2>{message}</h2>
  </div>
  );
}

export default App;
