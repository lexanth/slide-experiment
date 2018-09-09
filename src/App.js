import React, { Component } from 'react'
import styled from 'styled-components'
import logo from './logo.svg'
import './App.css'
import Item from './Item'
import Pager from './Pager'
import { SizeMe } from 'react-sizeme'

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <SizeMe>
          {({ size }) => (
            <Main className="App-intro">
              <Pager width={size.width}>
                <Item colour="#29c72b">A</Item>
                <Item colour="palevioletred">B</Item>
                <Item colour="rebeccapurple">C</Item>
              </Pager>
            </Main>
          )}
        </SizeMe>
      </div>
    )
  }
}

export default App
