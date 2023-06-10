
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
    //    making a get request to the server to get all the pokemons

    axios.get(currentPageUrl).then((response) => {
      console.log(response);
      console.log("Stigao je odgovor sa glavnog fetcha... " + response);
      // next and previous variable we get from or url
      setNextPageUrl(response.data.next);
      console.log(response.data.next);
      setPrevPageUrl(response.data.previous);
      setPokemon(response.data.results);
      //        setting the current page url to the initial url 
      //        setCurrentPageUrl(initalUrl);
      setLoading(false);

    })
  };

  //   useEffect is a hook that allows us to run some code when the component is mounted
  useEffect(() => {
    fetchPokemons();
    // when te url of page changes reload whole page and fetch new data
  }, [currentPageUrl])

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
