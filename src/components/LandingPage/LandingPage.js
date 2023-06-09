import './landingPage.css'

export const LandingPage = (props) => {
  const pokemon = props.pokemon;
  // console.log("pokemon objekat je" + pokemon);
  return (
    <div className="landingPage">
      {
      <div className='pokemonList'>
        {pokemon.map(p => {
         return(
         <div key={p.id} className='pokemonItem'> {p.name} </div>
         
         )
        })}
      </div>
        
      
      }
    </div>
  );
}