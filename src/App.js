import { Component } from 'react';
import React from 'react';
import './App.css';
import './styling/app.css';
import Card from './components/Card'
// import useWindowSize from './useWindowSize';
import Confetti from 'react-confetti'

export class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      preValue: 0,
      correct: [],
      prevKey: -1,
      clickedList: [],
      correctClick: [],
      cards: 3,
      gameStart: false,
      finishedGame: false,
      values: [],
      karte: []
    }
    var igra = document.getElementById("card-game");
  }

  clicked = (value, key) => {
    if (this.state.correct.includes(value)){
      console.log("jok")
    } else if (this.state.preValue == 0) {
    this.setState({
      preValue: value,
      prevKey: key,
      clickedList: [key, ...this.state.clickedList]
    })
    } else {
      if (this.state.preValue == value && key != this.state.prevKey) {
        console.log("tacno");
        console.log(this.state.correct.length)
        if (this.state.correct.length == this.state.cards-1) {
          this.setState({
            preValue: 0,
            correct: [value, ...this.state.correct],
            correctClick: [this.state.prevKey, key, ...this.state.correctClick],
            prevKey: -1,
            clickedList: [],
            finishedGame: true
          })
        } else {
          this.setState({
            preValue: 0,
            correct: [value, ...this.state.correct],
            correctClick: [this.state.prevKey, key, ...this.state.correctClick],
            prevKey: -1,
            clickedList: []
          })
        }

        console.log(this.state.correct.length)
      } else {
        console.log("netacno")
        console.log(this.state.clickedList.length)
          this.setState({
            preValue: 0,
            prevKey: -1,
            clickedList: [key, ...this.state.clickedList]
          })
        this.returnClicks();
        }
    }
  }

  async returnClicks(){
    setTimeout(function(){ 
      this.setState({
        clickedList: []
      })
     }.bind(this), 1500);
  }

  componentDidMount(){
    this.setState({
      cards: 2
    })
  }

  handleFieldChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }


  restartGame = () => {
    this.setState({
      gameStart: false,
      correct: [],
      clickedList: [],
      correctClick: [],
      finishedGame: false
    })
  }

  getRndInteger = (values) => {
    let a = Math.floor(Math.random() * (values.length - 0) ) + 0;
    let b = values[a]

    let niz = {
      "vrednost": b,
      "splajsuj": a
    }
    return niz;
  }

  handleGameStart = (event) => {
    event.preventDefault();

    let values = [];
    let karte = [];
    for (let index = 1; index <= this.state.cards; index++) {
      values.push(index)
      values.push(index)
    }
    console.log("ovo", values)
    for (let index = 0; index < this.state.cards*2; index++) {
      let a = this.getRndInteger(values);
      values.splice(a.splajsuj, 1)
      karte.push(a.vrednost)

    }
    
    this.setState({
      gameStart: true,
      karte: karte
    })
  }

  render() {

    let karte = [];
    { for (let index = 0; index < this.state.cards*2; index++) {
      karte.push(<div className="col-md-3" key={index}>
        <Card correctClick={this.state.correctClick} clickedList={this.state.clickedList} prevKey={this.state.prevKey} kei={index} preValue={this.state.preValue} value={this.state.karte[index]} clicked={this.clicked} correct={this.state.correct}/>
      </div>)
    } }
    if (this.state.gameStart) {
      return (
        <div className="App">
        { ( this.state.finishedGame ? <Confetti
         width={ 1980 }
       height={1080}
          /> : "" ) }
          { ( this.state.finishedGame ? <button className="btn btn-success button--newGame" onClick={this.restartGame}>New Game</button> : "" ) }
          <button className="btn btn-danger button--restart" onClick={this.restartGame}>X</button>
        <div className="section">
          <div className="container">
            <div className="card-game row" id="card-game">
            { karte } 
            </div>
          </div>
  
        </div>
      </div>
      )
    } else {
      return (
        <div className="App">
        <div className="section">
          <div className="container">
            <form onSubmit={this.handleGameStart}>
              <input type="text" value={this.state.cards} onChange={this.handleFieldChange} name="cards" id="cards"/>
              <button type="submit" className="btn btn-primary">Start</button>
            </form>
          </div>
  
        </div>
      </div>
      )
    }

  }
}

export default App