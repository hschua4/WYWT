//Home page

import React from 'react'
import './WeightInput.css'

function WeightInput(props) {
  return (
    <div className='center-container'>
      <h1>What is your weight today?</h1>
      <input 
        type='number' 
        placeholder='Your weight' 
        autoComplete='off'
        name='weight'
        value={props.weight}
        onChange={props.handleInput}
      />
      <button 
        className='btn' 
        onClick={props.handleSubmit}
      >Submit
      </button>
      {/* <button 
        className='btn' 
        onClick={props.handleClear}
      >Clear All
      </button>
      <button 
        className='btn'
        id='btn-test'
        onClick={props.handleTest}
      >Store Test Data
      </button> */}
    </div>
  )
}
  
export default WeightInput
