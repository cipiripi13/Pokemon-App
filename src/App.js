
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { LandingPage } from './components/LandingPage/LandingPage';
import Pagination from './components/Pagination/Pagination';
import { Route, Routes, useNavigate, useParams } from 'react-router';
import { PagePokemon } from './components/PagePokemon/PagePokemon';
import { SearchResult } from './components/SearchResult/SearchResult';

function App() {

  const [pageNumber, setPageNumber] = useState(1);
  function goToPage(n) {
    setPageNumber(n);
  }


  // const {page} = useParams();
  // useEffect(() => {
  //   if(page && page > 0) {
  //     setPageNumber(page)
  //   }
  // }, [page])
  // let initalUrl = "https://pokeapi.co/api/v2/pokemon";
  //importing useState so we can store some data when we retrive it from server
  //and it allows our component to be functional
  //pokemon-our data
  //setPokemon-allow us to update that data (that state), for example, if we go to different page it updates
  const [pokemon, setPokemon] = useState([]);
  const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon");
  const [nextPageUrl, setNextPageUrl] = useState('');
  const [prevPageUrl, setPrevPageUrl] = useState('');


  const [sortOrder, setSortOrder] = useState('DEFAULT');
  const [searchText, setSearchText] = useState('');

  const [pokemonsForSearch, setPokemonForSearch] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  function searchFetch() {
    const url = 'https://pokeapi.co/api/v2/pokemon?offset=' + 0 + '&limit=864';
    axios.get(url)
      .then((response) => {
        console.log('stigao response na landing stranicu', response);
        if (response && response.data && response.data.results && Array.isArray(response.data.results)) {
          //validation of response
          setPokemonForSearch(response.data.results);
        }
      })

  }

  useEffect(() => {
    searchFetch();
  }, [])


  useEffect(() => {
    // this useEffect will be called when we type something in search and it will filter and sort and give us smaller number of results --- lista pokemona prema pretrazi
    const listOfSearchedPokemons = pokemonsForSearch.filter((item) => {
      if (item.name.includes(searchText)) {
        //ostaje medju reyultatima pretrage
        return true;
      } else {
        return false;
      }
    });
    // setSearchResults(listOfSearchedPokemons); //za sada ih ne sortiramo
    //sada sortiramo ako treba 
    if (sortOrder === 'DEFAULT') {
      //bez sortiranja
      setSearchResults(listOfSearchedPokemons);
    } else {
      let sortedRes = listOfSearchedPokemons.sort((a, b) => {
        if (sortOrder === 'A-Z') {
          if (a.name < b.name) {
            return -1;
          } else if (a.name > b.name) {
            return 1;
          } else {
            return 0;
          }
        } else {
          //obtnuto sortiranje
          if (a.name < b.name) {
            return 1;
          } else if (a.name > b.name) {
            return -1;
          } else {
            return 0;
          }
        }
      });
      setSearchResults(sortedRes);
    }
  }, [searchText, sortOrder, pageNumber])




  const fetchPokemons = () => {
    //   before we make a request to server we set his state to be false--to be loading, because we haven sent request
    //after we fetch our data we set our state to be false --- line 42

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
        <Header setSortOrder={setSortOrder} sortOrder={sortOrder} searchText={searchText} setSearchText={setSearchText} />
        <Routes>
          <Route path='/'
            element={
              <>
                {/* here we do a cheking so our previous button will not show on first page and next on last page */}

                {
                  searchText === '' ? (
                    <Pagination
                      gotoNextPage={nextPageUrl ? gotoNextPage : currentPageUrl}
                      returntoPrevpage={prevPageUrl ? returntoPrevpage : null}
                      goToPage={goToPage}
                      pageNumber={pageNumber}
                      lastPageNumber={36}
                    />
                  ) : (
                    null
                  )
                }
                <div>
                  {/* down here we set if loading is true then show me a message that iti is loading and that we are waiting for the response */}
                  {
                    searchText === '' ? (
                      <LandingPage pokemon={pokemon} pageNumber={pageNumber} />
                    ) : (
                      <SearchResult searchResults={searchResults} />
                    )
                  }

                </div>
                {
                  searchText === '' ? (
                    <Pagination
                      gotoNextPage={nextPageUrl ? gotoNextPage : currentPageUrl}
                      returntoPrevpage={prevPageUrl ? returntoPrevpage : null}
                      goToPage={goToPage}
                      pageNumber={pageNumber}
                      lastPageNumber={36}
                    />
                  ) : (
                    null
                  )
                }
              </>
            }
          />
          <Route path='/pokemon/:id' element={<PagePokemon />} />

        </Routes>

        <Footer />


      </div>
    </>
  );
}

export default App;
