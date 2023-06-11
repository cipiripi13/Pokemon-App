
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { LandingPage } from './components/LandingPage/LandingPage';
import Pagination from './components/Pagination/Pagination';
import { Route, Routes, useNavigate } from 'react-router';

function App() {
  // let initalUrl = "https://pokeapi.co/api/v2/pokemon";
  //importing useState so we can store some data when we retrive it from server
  //and it allows our component to be functional
  //pokemon-our data
  //setPokemon-allow us to update that data (that state), for example, if we go to different page it updates
  const [pokemon, setPokemon] = useState([]);
  const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon");
  const [nextPageUrl, setNextPageUrl] = useState('');
  const [prevPageUrl, setPrevPageUrl] = useState('');
  const [loading, setLoading] = useState(true);



  const fetchPokemons = () => {
    //   before we make a request to server we set his state to be false--to be loading, because we haven sent request
    //after we fetch our data we set our state to be false --- line 42
    setLoading(true);
    //    making a get request to the server to get all the pokemons
    axios.get(currentPageUrl).then((response) => {
      console.log(response.data);

      // next and previous variable we get from our url
      setNextPageUrl(response.data.next);
      setPrevPageUrl(response.data.previous);
      //setting the pokemon to the data we get from the server

      setPokemon(response.data.results);
      //        setting the current page url to the initial url 
      //        setCurrentPageUrl(initalUrl);

      setLoading(false);

    })
  };

  //   useEffect is a hook that allows us to run some code when the component is mounted
  useEffect(() => {
    fetchPokemons();
    // when te url of page changes reload whole page and fetch new data, if it doesent change dont bother doing anything
  }, [currentPageUrl])

  // **********************************************************************************************************************
  // creating simple function for going to next and previous page
  function gotoNextPage() {
    setCurrentPageUrl(nextPageUrl);
  }

  function returntoPrevpage() {
    setCurrentPageUrl(prevPageUrl);
  }


  return (
    <>
      <div className="App">
        <Header />
        <Routes>
          <Route path='/'

            element={
              <>
                <Pagination gotoNextPage={gotoNextPage} returntoPrevpage={returntoPrevpage} />
                <div>
                  {/* down here we set if loading is true then show me a message that iti is loading and that we are waiting for the response */}
                  {loading ? <h1>Loading...</h1> : (
                    <LandingPage pokemon={pokemon} />
                  )}
                </div>

                <Pagination gotoNextPage={gotoNextPage} returntoPrevpage={returntoPrevpage} />
              </>
            }

          />

        </Routes>

        <Footer />


      </div>
    </>
  );
}

export default App;
