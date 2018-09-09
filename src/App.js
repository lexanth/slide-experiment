import React, { Component } from 'react'
import styled from 'styled-components'
import logo from './logo.svg'
import './App.css'
import Item from './Item'
import { Redirect } from 'react-router'

import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { SlidingSwitch, SlidingSwitchRoute } from './SlidingSwitch'

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  width: 80%;
`
const Button = styled(Link)`
  outline: none;
  border: none;
  border-radius: 3px;
  background-color: royalblue;
  color: #fff;
  flex: 0 1 50%;
  margin: 5px;
  padding: 10px;
  text-decoration: none;
`

const colourLetterItem = ({ colour, letter }) => ({ width }) => (
  <Item colour={colour} width={width}>
    {letter}
  </Item>
)

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <Route exact path="/" render={() => <Redirect to="/A" />} />
          <Main>
            <SlidingSwitch>
              <SlidingSwitchRoute path="/A">
                {colourLetterItem({ colour: '#29c72b', letter: 'A' })}
              </SlidingSwitchRoute>
              <SlidingSwitchRoute path="/B">
                {({ width }) => (
                  <Item colour="palevioletred" width={width}>
                    B
                  </Item>
                )}
              </SlidingSwitchRoute>
              <SlidingSwitchRoute path="/C">
                {({ width }) => (
                  <Item colour="rebeccapurple" width={width}>
                    C
                  </Item>
                )}
              </SlidingSwitchRoute>
            </SlidingSwitch>
          </Main>

          <Button to="/A">A</Button>
          <Button to="/B">B</Button>
          <Button to="/C">C</Button>
        </div>
      </Router>
    )
  }
}

export default App
