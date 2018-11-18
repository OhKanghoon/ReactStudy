import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import withSpliting from 'lib/WithSpliting';
import './Menu.css'

const Split = withSpliting(() => import('components/Split'))

class Menu extends Component {
  state = {
    visible: false,
  }
  
  handleClick = () => {
      this.setState({
        visible: true,
      })
  };

  render() {
    const { visible } = this.state
    return (
      <div className='Menu'>
        <div className='MenuItem'>
          <Link to="/">Home</Link>
        </div>
        <div className='MenuItem'>
          <Link to="/about">About</Link>
        </div>
        <div className='MenuItem'> <Link to="/about/foo">About Foo</Link> </div>
        <div className='MenuItem'> <Link to="/posts">LinkToPosts</Link> </div>
        <div className='MenuItem'> <Link to="/users">Users Data Loading</Link> </div>
        <button className='MenuItem' onClick={this.handleClick}> Click Me </button>
        {visible && <Split />}
        <hr/>
      </div>
  );
  }
}

export default Menu;