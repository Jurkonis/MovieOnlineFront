import './App.css';
import Nav from "./components/Nav.js";
import MovieList from "./components/Movie/MovieList.js";
import GenresList from "./components/Genre/GenresList.js";
import MovieInfo from "./components/Movie/MovieInfo.js";
import GenreInfo from "./components/Genre/GenreInfo.js";
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
          {/* <Route path="/EnableAuth" component={EnableAuth} />
          <Route path="/DisableAuth" component={DisableAuth} />
          <Route path="/VerifyAuth" component={VerifyAuth} />
          <Route path="/Shop" component={Shop} />
          <Route path="/MyIcons" component={MyIcons} />
          <Route path="/Schedule" component={Schedule} />
          <Route path="/Tournaments" exact component={Tournaments} />
          <Route path="/Tournament/details/:tid" component={Tournament} />
          <Route path="/AddTournament" component={AddTournament} />
          <Route path="/Login" component={Login} />
          <Route path="/Profile" component={Profile} />
          <Route path="/Register" component={Register} />
          <Route path="/MyFantasyTeam" component={Fantasy} />
          <Route path="/User/:id/:username/FantasyTeam" component={CompareFantasyTeams} />
          <Route path="/Team/:tid" exact component={SelectPlayer} /> */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
