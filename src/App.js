
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { LandingPage } from './components/LandingPage/LandingPage';
import Pagination from './components/Pagination/Pagination';

function App() {
  //importing useState so we can store some data when we retrive it from server
  //and it allows our component to be functional
  //pokemon-our data
  //setPokemon-allow us to update that data (that state), for example, if we go to different page it updates
  const [pokemon, setPokemon] = useState([]);

  const fetchPokemons = () => {
    //    making a get request to the server to get all the pokemons
    const URL = "https://pokeapi.co/api/v2/pokemon";
    axios.get(URL).
      then((response) => {

        console.log(response);
        console.log("Stigao je odgovor sa glavnog fetcha... " + response);


        setPokemon(response.data.results)

      })
  };

  useEffect(() => {
    fetchPokemons();
  }, [])


  return (
    <>
      <div className="App">
        <Header />
        <LandingPage pokemon={pokemon} />
        <Pagination />
        <Footer />

      </div>
    </>
  );
}

export default App;
