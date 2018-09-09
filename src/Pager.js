import React from 'react'
import styled from 'styled-components'
import matchPath from 'react-router-dom/matchPath'
import { Route, Link } from 'react-router-dom'
import { Spring, animated } from 'react-spring'

const ItemsWrapper = styled.div`
  display: flex;
  overflow: hidden;
  width: ${props => props.width}px;
  height: 100px;
  position: relative;
`
const PagerWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
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

const Item = styled(animated.div)`
  position: absolute;
`

const ItemWrapper = ({ active, children, style }) => (
  <Item style={style}>{active ? children : null}</Item>
)

class PagerItems extends React.Component {
  static defaultProps = {
    // width is initially undefined, which sets prevLeft to NaN
    // Zero puts everything together and expands them
    // We want something big so everything is off the side
    width: 2000
  }
  render() {
    const { children, activeIndex, width } = this.props
    const startLeft = -width * activeIndex
    const lefts = React.Children
      .toArray(children)
      .map((child, index) => startLeft + index * width)

    return (
      <ItemsWrapper width={width}>
        {React.Children.map(children, (child, index) => (
          <Spring
            from={{
              x: -2000
            }}
            to={{
              x: lefts[index]
            }}
            config={{ duration: 2000 }}
            // native -
          >
            {({ x }) => (
              <ItemWrapper
                active={x > -width && x < width}
                style={{
                  transform: `translate3d(${x}px,0,0)`
                }}
              >
                {React.cloneElement(child, {
                  width
                })}
              </ItemWrapper>
            )}
          </Spring>
        ))}
      </ItemsWrapper>
    )
  }
}

// May need to polyfill findIndex
const getActiveIndex = (children, location) =>
  React.Children.toArray(children).findIndex(child =>
    matchPath(location.pathname, {
      exact: child.props.exact,
      path: child.props.path
    })
  )

class Pager extends React.Component {
  // state = {
  //   activeIndex: 0
  // }
  //
  // onLeft = () => {
  //   this.setState(prevState => ({
  //     activeIndex: prevState.activeIndex === 0 ? 0 : prevState.activeIndex - 1
  //   }))
  // }
  //
  // onRight = () => {
  //   this.setState(prevState => ({
  //     activeIndex:
  //       prevState.activeIndex >= React.Children.count(this.props.children) - 1
  //         ? prevState.activeIndex
  //         : prevState.activeIndex + 1
  //   }))
  // }
  //
  // onFirst = () => {
  //   this.setState({ activeIndex: 0 })
  // }
  //
  // onLast = () => {
  //   this.setState({
  //     activeIndex: React.Children.count(this.props.children) - 1
  //   })
  // }

  render() {
    const { children, width } = this.props
    return (
      <PagerWrapper>
        <Route>
          {({ location }) => (
            <PagerItems
              width={width}
              activeIndex={getActiveIndex(children, location)}
            >
              {children}
            </PagerItems>
          )}
        </Route>
        <ButtonRow>
          <Button to="/A">A</Button>
          <Button to="/B">B</Button>
          <Button to="/C">C</Button>
        </ButtonRow>
      </PagerWrapper>
    )
  }
}

export default Pager
