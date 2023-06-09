
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { LandingPage } from './components/LandingPage/LandingPage';

function App() {
  //  importing useState so we can store some data when we retrive it from server
   const [pokemon, setPokemon] = useState([]);

   const fetchPokemons = () => {
   //    making a get request to the server to get all the pokemons
    const url = "https://pokeapi.co/api/v2/pokemon";
    axios.get(url).
    then((response) => {
      
      
      console.log("Stigao je odgovor sa glavnog fetcha... " + response);
      

       setPokemon(response.data.results)
      
   })};

      useEffect (() => {
        console.log('fetchujemo kada se komp mountuje');
        fetchPokemons();
      }, [])
 
  
  return (
    <>
    <div className="App">
      <Header/>
      <LandingPage pokemon={pokemon}/>
      <Footer/>
      
    </div>
    </>
  );
}

export default App;
