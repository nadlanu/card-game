import { Component } from 'react';
import React from 'react';
import './App.css';
import './styling/app.css';
import Card from './components/Card'
// import useWindowSize from './useWindowSize';
import Confetti from 'react-confetti'
import Cookies from 'js-cookie'

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
      karte: [],
      session: [],
      uname: "",
      tries: 0,
      correctCount: 0,
      disableClick: false,
      startingTime: 0,
      hints: []
    }
    var igra = document.getElementById("card-game");
  }

  clicked = (value, key) => {
    if (this.state.disableClick) {
      console.log("disabled")
    } else {
      if (this.state.correct.includes(value)){
        console.log("jok")
      } else if (this.state.preValue == 0) {
      this.setState({
        preValue: value,
        prevKey: key,
        clickedList: [key, ...this.state.clickedList],
        tries: this.state.tries +=1
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
              finishedGame: true,
              correctCount: this.state.correctCount+=1
            })
            this.handleGameFinish();
          } else {
            this.setState({
              preValue: 0,
              correct: [value, ...this.state.correct],
              correctClick: [this.state.prevKey, key, ...this.state.correctClick],
              prevKey: -1,
              clickedList: [],
              tries: this.state.tries +=1,
              correctCount: this.state.correctCount+=1
            })
          }
          console.log(this.state.correct.length)
        } else {
          console.log("netacno")
          console.log(this.state.clickedList.length)
            this.setState({
              preValue: 0,
              prevKey: -1,
              clickedList: [key, ...this.state.clickedList],
              tries: this.state.tries +=1,
              disableClick: true
            })
          this.returnClicks()
        }
      }
    }
  }

  handleGameFinish = () => {
    let acc = this.state.cards / Math.ceil(this.state.tries / 2) * 100;
    let endTime = new Date().getTime() / 1000;
    let duration = endTime - this.state.startingTime;
    let session = {
      uname: this.state.uname,
      tries: acc,
      level: this.state.cards,
      time: duration
    }
    this.setState({
      session: [session, ...this.state.session]
    })
    console.log(session)
  }

  returnClicks = async () => {
    await setTimeout(function(){ 
      this.setState({
        clickedList: [],
        disableClick: false
      })
     }.bind(this), 1000);
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
    let startingTime = new Date().getTime() / 1000;
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
      karte: karte,
      tries: 0,
      correctCount: 0,
      startingTime: startingTime,
      hints: []
    })
      window.addEventListener('keyup', function klik(e) {
        if (e.code === "KeyE"){
          this.hint();
        }
      }.bind(this))
      }

  hint = () => {
    console.log("ubaci hint")
    if (this.state.preValue == 0) {
      console.log("no hint available")
    } else {
      this.setState({
        hints: [this.state.preValue, ...this.state.hints]
      })
    }
  }

  render() {

    let karte = [];
    { for (let index = 0; index < this.state.cards*2; index++) {
      karte.push(<div className="col-md-3" key={index}>
        <Card hints={this.state.hints} correctClick={this.state.correctClick} clickedList={this.state.clickedList} prevKey={this.state.prevKey} kei={index} preValue={this.state.preValue} value={this.state.karte[index]} clicked={this.clicked} correct={this.state.correct}/>
      </div>)
    } }
    if (this.state.gameStart) {
      return (
        <div className="App">
          <div className="stats">
              <p className="uname">User: {this.state.uname}</p>
              <p className="level">Level: {this.state.cards}</p>
              <p className="tries">Tries: {Math.ceil(this.state.tries / 2)}</p>
              <p className="correct">correct: {this.state.correctCount}</p>
              <p className="acc">Accuracy: {this.state.correctCount / Math.ceil(this.state.tries / 2) * 100}%</p>
          </div>
        { ( this.state.finishedGame ? <Confetti
         width={ window.innerWidth }
       height={ window.innerHeight }
          /> : "" ) }
          { ( this.state.finishedGame ? <button className="btn btn-success button--newGame" onClick={this.restartGame}>New Game</button> : "" ) }
          <div className="options">
            <button className="btn btn-danger button--restart" onClick={this.restartGame}>X</button>
            <button onClick={this.hint} className="btn btn-info button--hint">?</button>
          </div>
        <section className="section">
          <div className="container">
            <div className="card-game row" id="card-game">
            { karte } 
            </div>
          </div>
          
        </section>
      </div>
      )
    } else {
      return (
        <div className="App">
        <section className="section section--home">
          <div className="container container--home">
            <form onSubmit={this.handleGameStart} className="info-form">
              <div className="input--wrapper">
                <div>
                  <label htmlFor="uname" className="mb-2"><strong>Username: </strong></label>
                  <input type="text" value={this.state.uname} onChange={this.handleFieldChange} name="uname" id="uname"/>
                </div>
                <div>
                  <label htmlFor="cards" className="mb-2"><strong>Number of combinations: </strong></label>
                  <input type="text" value={this.state.cards} onChange={this.handleFieldChange} name="cards" id="cards"/>
                </div>
              </div>
              <div className="button--wrapper">
                <button type="submit" className="btn btn-primary">Start</button>
              </div>
            </form>

          <table className="table table-striped table-dark mt-5">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Username</th>
      <th scope="col">Level</th>
      <th scope="col">Accuracy (%)</th>
      <th scope="col">Time (sec)</th>
    </tr>
  </thead>
  <tbody>
  { this.state.session.map(el => (
    <tr key={this.state.session.indexOf(el)}>
      <th scope="row">1</th>
      <td>{el.uname}</td>
      <td>{el.level}</td>
      <td>{el.tries}</td>
      <td>{el.time}</td>
    </tr>
    )) }
    
  </tbody>
</table>
          </div>
        </section>
      </div>
      )
    }

  }
}

export default App