import './App.css';
import Nav from "./components/Nav.js";
import MovieList from "./components/Movie/MovieList.js";
import MovieInfo from "./components/Movie/MovieInfo.js";
import GenresList from "./components/Genre/GenresList.js";
import GenreInfo from "./components/Genre/GenreInfo.js";
import ActorsList from "./components/Actor/ActorsList.js";
import ActorInfo from "./components/Actor/ActorInfo.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route path="/" exact component={MovieList} />
          <Route path="/movie/:id" exact component={MovieInfo} />
          <Route path="/genres" exact component={GenresList} />
          <Route path="/genre/:id" exact component={GenreInfo} />
          <Route path="/actors" exact component={ActorsList} />
          <Route path="/actor/:id" exact component={ActorInfo} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
