import React from 'react'
import './FilterButtons.css'

function FilterButtons(props) {
  return (
    <div>
      <div className="btn-group">
        <button 
          onClick={props.handleFilter} 
          className={props.filter === "all"? "btn-active" : "btn-inactive"}
          value='all'
        >All
        </button>
        <button
          onClick={props.handleFilter} 
          className={props.filter === "thisMonth"? "btn-active" : "btn-inactive"}
          value='thisMonth'
        >This Month
        </button>
        <button
          onClick={props.handleFilter} 
          className={props.filter === "thisWeek"? "btn-active" : "btn-inactive"}
          value='thisWeek'
        >This Week
        </button>
      </div>
    </div>
  )
}

export default FilterButtons
