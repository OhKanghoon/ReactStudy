import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom';
import { Home, About, Posts, Users } from 'pages';
import Menu from 'components/Menu'

class App extends Component {
  state = {
    About: null,
    Home: null,
    Posts: null,
  }

  render() {
    return (
      <div>
        <Menu />
        <Route exact path="/" component={Home} />
        <Switch>
          <Route path="/about/:name" component={About}/>
          <Route path="/about" component={About} />
          <Route path="/posts" component={Posts}/>
        </Switch>
        <Route path="/users" component={Users}/>
      </div>

    )
  }
}

export default App