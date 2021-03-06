import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchMovies, setUpdateModal, url} from "../../actions/movieActions.js";
import { fetchGenres } from "../../actions/genreActions.js";
import { fetchActors } from "../../actions/actorActions.js";
import { Button } from 'semantic-ui-react';
import MovieModal from "./MovieModal.js";
import PropTypes from "prop-types";
import Movie from "./Movie.js";

class MovieList extends Component {

  componentDidMount() {
    this.props.fetchGenres();
    this.props.fetchActors();
  }

  setOpen(){
    this.props.setUpdateModal(true);
  }

  render() {
    let movies = this.props.movies.map((movie) => (
        <Movie key={movie.id} id={movie.id}/>
    ));

    return (
        <div className="container">
          <div className="flex">
            <h1>Movies</h1>
            <div className="btn-add"><Button circular icon='plus' onClick={this.setOpen.bind(this)} /></div>
          </div>
              {this.props.movies.length !== 0 ? (
                <div className="movie-list">
                  {movies}
                </div>
              ):(
                <p>Empty movie list</p>
              )}
              <MovieModal genres={this.props.genres} actors={this.props.actors} url={this.props.url}  name='Create'/>
        </div>
    )
  }
}

MovieList.propTypes = {
    fetchMovies: PropTypes.func.isRequired,
    fetchGenres: PropTypes.func.isRequired,
    fetchActors: PropTypes.func.isRequired,
    setUpdateModal: PropTypes.func.isRequired,
    movies: PropTypes.array.isRequired,
    genres: PropTypes.array.isRequired,
    url: PropTypes.string.isRequired,
  };
  
  const mapStateToProps = (state) => ({
    movies: state.movies.movies,
    genres: state.genres.genres,
    actors: state.actors.actors,
    url,
  });
  
  export default connect(mapStateToProps, { fetchMovies, fetchGenres, fetchActors, setUpdateModal, url })(MovieList);