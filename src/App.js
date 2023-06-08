
import './App.css';
import axios from 'axios';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { LandingPage } from './components/LandingPage/LandingPage';

function App() {

  // making request using axios
  axios.get("https://pokeapi.co/api/v2/pokemon").
  then(function(response){
    
    console.log(response);
    console.log(response.data.results);
    // var name = response.data.result.name;
    // var ul = document.createElement('ul');
    // document.body.appendChild(ul);
    // // looping through the data and creating a list of pokemon names
    // for(var i = 0; i < response.data.results.length; i++){
    //   var li = document.createElement('li');
    //   //      li.innerHTML = response.data.results[i].name
    //        li.innerHTML = response.data.results[i].name;
    //        ul.appendChild(li);

    //}
    });
  
  return (
    <div className="App">
      <Header/>
      <LandingPage/>
      <Footer/>
      
    </div>
  );
}

export default App;
