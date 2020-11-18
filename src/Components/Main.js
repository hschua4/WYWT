import React from 'react'
import WeightInput from './WeightInput'
import LineChart from './LineChart'
import './Main.css'
import FilterButtons from './FilterButtons'

class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      weight: '', //Input from user
      weightData: [], //Saved data from localstorage
      filter: 'all', //Chart filter mode
      filteredData: [], //Filtered data ready to display to chart
      submitted: false
    }
    this.handleInput = this.handleInput.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleFilter = this.handleFilter.bind(this)
    this.handleTest = this.handleTest.bind(this)
  }

  //Get weight data from local storage and set state
  //If no data in local storage, return
  componentDidMount() {
    const storedWeight = JSON.parse(localStorage.getItem("weightData"))
    if (storedWeight == null) {
      return
    }

    //Convert date back into date object
    const newWeightData = storedWeight.map((item) => {
      const date = new Date(item.date)
      return {"date": date, "weight": item.weight}
    })

    const today = new Date()
    const todayDate = today.getDate()
    const todayMonth = today.getMonth()
    const todayYear = today.getYear()
    const index = newWeightData.length - 1

    function submitted() {
      if(newWeightData !== []){
        if(newWeightData[index].date.getDate() === todayDate && newWeightData[index].date.getMonth() === todayMonth && newWeightData[index].date.getYear() === todayYear) {
          return true
        }
        else {
          return false
        }
      }
    }

    this.setState({
      weightData: newWeightData,
      filteredData: newWeightData, //Default filter mode 'all' on mount
      submitted: submitted()
    }, () => console.log(submitted()))
  }
  
  //Handle weight input by user, limit to 4 digit numbers
  handleInput(event) {
    if (event.target.value.length > 4) {
      event.target.value = event.target.value.slice(0, 4)
    }
    
    const {name, value} = event.target
    this.setState({
      [name]: value
    })
  }

  //Save input weight into state and localstorage on clicking submit button
  handleSubmit() {
    const date = new Date()

    //Input validation
    if (this.state.weight > 999) {
      alert("Please enter a number between 0-999")
      return
    } else if (this.state.weight === '') {
      alert("Oops, it seems you forgot to type in a number")
      return
    }

    this.setState({
      weightData : this.state.weightData.concat({"date":date,"weight":this.state.weight}),
      filteredData : this.state.weightData.concat({"date":date,"weight":this.state.weight}), //<--needed for 'all' filter to function on load
      submitted: true
      },
      () => localStorage.setItem("weightData", JSON.stringify(this.state.weightData))
    )
  }

  //Manipulate the weighData based on filter mode choosen by user and store in filteredData
  handleFilter(event) {
    const value = event.target.value
    let filteredData = []

    if(value === 'all') {
      filteredData = this.state.weightData.slice()
    } else if (value === 'thisMonth') {
      const todayDate = new Date().getDate()
      const indexLastDay = this.state.weightData.length - 1
      const indexFirstDay = indexLastDay - todayDate
      filteredData = this.state.weightData.slice(indexFirstDay, indexLastDay + 1)
    } else if (value === 'thisWeek') {
      const indexLastDay = this.state.weightData.length - 1
      const indexFirstDay = indexLastDay - this.state.weightData[indexLastDay].date.getDay()
      filteredData = this.state.weightData.slice(indexFirstDay, indexLastDay + 1)
    }

    this.setState({
      filter: value,
      filteredData: filteredData
    })
  }

  //********************************<<<FOR TESTING>>>*************************************** 
  //Generate dummy data and store in local storage
  handleTest() {
    //Generate an array of dates for testing
    const startDate = new Date("2020-09-01"); //YYYY-MM-DD
    const endDate = new Date("2020-11-17"); //YYYY-MM-DD

    let getDateArray = function(start, end) {
      const arr = []
      const dt = new Date(start)
      while (dt <= end) {
        arr.push(new Date(dt))
        dt.setDate(dt.getDate() + 1)
      }
      return arr;
    }

    const dateArray = getDateArray(startDate, endDate)

    //Generate an array of decreasing weight values for testing
    let weight = 50
    const numberofItems = 77
    const dropStep = 0.5
    const riseStep = 0.3
    const weightArray = []

    for (let i=0; i <= numberofItems; i++) {
      if(Math.random() > 0.5) {
        weight = weight - (Math.random() * dropStep)
      } else{
        weight = weight + (Math.random() * riseStep)
      }
      weightArray.push(weight)
    }

    //Combine dateArray and weightArray into an array of objects, setstate and store into localstorage
    let weightDataArray = []

    for (let i=0; i<weightArray.length; i++) {
      weightDataArray = weightDataArray.concat({"date":dateArray[i],"weight":weightArray[i]} )
    }

    this.setState({
      weightData : weightDataArray }, 
      () => localStorage.setItem("weightData", JSON.stringify(this.state.weightData))
    )
  }

  //Clear all data in local storage on click
  handleClear() {
    localStorage.clear()
  }
  //********************************<<</FOR TESTING>>>**************************************

  render() {
    return (
      <div className="container">
        <div className={this.state.submitted? "weight-input-hidden" : "weight-input"}>
          <WeightInput 
            submitted={this.state.submitted}
            weight={this.state.weight}
            handleInput={this.handleInput} 
            handleSubmit={this.handleSubmit}
            handleClear={this.handleClear}
            handleTest={this.handleTest}
          />
        </div>
        <div className={this.state.submitted? "chart" : "chart-hidden"}>
          <h1 className='chart-title'>Weight History</h1>
          <LineChart 
            weightData={this.state.filteredData}
            filter={this.state.filter}
          />
          <FilterButtons 
            handleFilter={this.handleFilter} 
            filter = {this.state.filter}
          />
        </div>
      </div>
    )
  }
}

export default Main
