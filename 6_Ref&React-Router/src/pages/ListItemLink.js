import React, { Component } from 'react'
import { Route, Switch, Link} from 'react-router-dom'

const ListItemLink = ({ ...rest }) => (
  <Route path={rest.to} children={({ match }) => (
    <li className={match ? 'active' : ''}>
      { console.log('rest spread', rest) }
      <Link to={rest.to} {...rest}/>
    </li>
  )}/>
)

export default ListItemLink