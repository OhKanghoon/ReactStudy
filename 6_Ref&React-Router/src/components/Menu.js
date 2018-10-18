import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Home, About, Posts, Mypage, Login, Notfound, ListItemLink } from 'pages'
import Reference from 'components/Reference'
import './Menu.css'

const Menu = () => {
  const activeStyle = {
    color: 'black',
    fontSize: '2rem'
  }
  
  return (
    <div>
      <div>
        <Reference />
      </div>
      <div className="header">
          <NavLink exact to ="/" activeClassName="active" className="item">HOME</NavLink>
          <NavLink exact to ="/about" activeStyle={activeStyle} className="item"> About </NavLink>
          <NavLink to ="/about/Dongsu" activeStyle={activeStyle} className="item"> About Dongsu </NavLink>
          <NavLink to ="/posts" activeStyle={activeStyle} className="item">Posts</NavLink>
          <NavLink to ="/mypage" activeStyle={activeStyle} className="item">Mypage</NavLink>
          <NavLink to ="/login" activeStyle={activeStyle} className="item">Login</NavLink>
          <NavLink to="/anything" activeStyle={activeStyle} className="item"> children-Route </NavLink>
          <ListItemLink to="/home2" activeStyle={activeStyle} className="item"> children-Route-check </ListItemLink>
      </div>
    </div>
  )
}

export default Menu