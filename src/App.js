import React, { Component } from 'react'
import styled from 'styled-components'
import logo from './logo.svg'
import './App.css'
import Item from './Item'
import Pager from './Pager'
import { SizeMe } from 'react-sizeme'
import { Switch, Redirect } from 'react-router'

import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`

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
          <SizeMe>
            {({ size }) => (
              <Main className="App-intro">
                <Pager width={size.width}>
                  <Item path="/A" colour="#29c72b">
                    A
                  </Item>
                  <Item path="/B" colour="palevioletred">
                    B
                  </Item>
                  <Item path="/C" colour="rebeccapurple">
                    C
                  </Item>
                </Pager>
              </Main>
            )}
          </SizeMe>
        </div>
      </Router>
    )
  }
}

export default App
