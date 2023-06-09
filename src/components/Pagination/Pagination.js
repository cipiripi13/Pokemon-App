import React from 'react'
import './pagination.css'

export default function Pagination({gotoNextPage, returntoPrevpage}) {
  return (
    <div>
     { returntoPrevpage && <button onClick={returntoPrevpage}>Previous</button>}
     
      <button onClick={gotoNextPage}>Next</button>
    </div>
  )
}
