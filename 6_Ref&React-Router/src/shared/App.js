import React, { Component } from 'react'
import { Route, Switch, Link} from 'react-router-dom'
import { Home, About, Posts, Mypage, Login, Notfound, ListItemLink } from 'pages'
import { Menu } from 'components'
import './App.css'


class App extends Component {
  render() {
    const logged = true
    return (
      <div className="layout">
        <Menu />
          <div>
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route path="/about/:name" component={About}/>
              <Route path="/about" component={About}/>
              <Route path="/posts" component={Posts}/>
              <Route path="/mypage" render= {
                () => (<Mypage value={logged}/>)
              }/>
              <Route path="/login" component={Login}/>
              <Route component={Notfound} />
            </Switch>
          </div>
      </div>
    )
  }
}



App.defaultProps = {
  logged: false
}

export default App;