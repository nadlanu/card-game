import React, { Component } from 'react'

export class Card extends Component {
    constructor(props){
        super(props);
        this.state = {
            value: this.props.value,
            correct: this.props.correct,
            clicked: false
        };
    }

    // componentDidUpdate(){
    //     if (this.props.prevKey != -1 && !this.props.correct.includes(this.state.value)){
    //         this.setState({
    //             clicked: false
    //         })
    //     }
    // }

    clicked = () => {
        this.props.clicked(this.state.value , this.props.kei);
        this.setState({
            clicked: true,
            correct: this.props.correct
        })
    }

    render() {
        return (
            <div className={"flip-card " + ( this.props.correct.includes(this.state.value) ? "correct " : " " ) + ( this.props.clickedList.includes(this.props.kei) || this.props.correctClick.includes(this.props.kei) ? "clicked " : " " )} onClick={this.clicked}>
            <div className="flip-card-inner">
                <div className="flip-card-front">
                    <h1>flip me</h1>
                </div>
                <div className="flip-card-back">
                <h1>{this.state.value}</h1>
                </div>
                </div>
            </div>
        )
    }
}

export default Card
