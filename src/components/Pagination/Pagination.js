import React from 'react'
import './pagination.css'

export default function Pagination({ gotoNextPage, returntoPrevpage, goToPage, pageNumber, lastPageNumber }) {


  
  return (
    <div>
      {
        pageNumber > 1 && <button onClick={() => {
          goToPage(pageNumber -1)
        }}>Previous</button>
      }
      <button>{pageNumber}</button>
      {
        pageNumber < lastPageNumber && <button onClick={() => {
          goToPage(pageNumber + 1)
        }}>Next</button>
      }
      {/* This says if we have previous page to load then load, if we dont have than it will show nothing */}
      {/* {returntoPrevpage && <button onClick={returntoPrevpage}>Previous</button>}
      <button >{pageNum}</button>
      {gotoNextPage && <button onClick={() => { gotoNextPage(); showPageNumb();}}>Next</button>} */}
    </div>
  )
}
