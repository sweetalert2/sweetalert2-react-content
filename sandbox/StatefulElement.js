import { Component } from 'react'

export class StatefulElement extends Component {
  constructor() {
    super()
    this.state = { number: 0 }
  }
  render() {
    return (
      <div>
        <span>nummer: {this.state.number} </span>
        <button
          onClick={() => this.setState({ number: this.state.number - 1 })}
        >
          {'-'}
        </button>
        <button
          onClick={() => this.setState({ number: this.state.number + 1 })}
        >
          {'+'}
        </button>
      </div>
    )
  }
}
