import './header.css';

export const Header = () => {
  return (
    <div className="header">
      <div className="logo">
        <img src='https://www.freepnglogos.com/uploads/pokemon-logo-text-png-7.png' className='logoImg' alt='logo'></img>
      </div>
      
      <div className='searchBar'>
      <input type='search'></input>
      </div>
      
    </div>
  )
}