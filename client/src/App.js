import React from 'react'
import Home from './Routes/Home/Home'
import { Switch, Route } from 'react-router-dom'
import Header from './components/Header'

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path='/' component={Home}></Route>
      </Switch>
    </div>
  );
}

export default App;
