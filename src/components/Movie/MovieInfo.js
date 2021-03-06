import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchMovie, setUpdateModal, setDeleteModal, url } from "../../actions/movieActions.js";
import { fetchLeftGenres } from "../../actions/genreActions.js";
import { fetchLeftActors } from "../../actions/actorActions.js";
import PropTypes from "prop-types";
import GenreName from "../Genre/GenreName.js";
import ActorName from "../Actor/ActorName.js";
import MovieModal from "./MovieModal.js";
import MovieDeleteModal from "./MovieDeleteModal.js";
import { Button, Loader } from 'semantic-ui-react';

class MovieInfo extends Component {


    componentDidMount() {
       this.props.fetchMovie(this.props.match.params.id);
      }

      setOpen(){
        this.props.fetchLeftGenres(this.props.movieGenres);
        this.props.fetchLeftActors(this.props.movieActors);
        this.props.setUpdateModal(true);
      }

      setDeleteOpen(){
        this.props.setDeleteModal(true);
      }

  render() {

    let movie = this.props.movie;

    let genres = this.props.movieGenres.map((genre, index) => (
          <GenreName  key={genre.genreId} id={genre.id} genreId={genre.genreId} movieId={genre.movieId} index={index}/>
      ));

      let actors = this.props.movieActors.map((actor, index) => (
        <ActorName  key={actor.actorId} id={actor.id} actorId={actor.actorId} movieId={actor.movieId} index={index}/>
    ));

    return (
        <div className="container">
            {this.props.error !== '' ? (
                <div className="error">
                    <h1>{this.props.error}</h1>
                </div>
            ):(
                this.props.movie === null? (
                <Loader active inline>Loading...</Loader>
                ):(
                    <div className="flex wrapper">
                        <img src={process.env.PUBLIC_URL + '/images/default.jpg'} alt={movie.name}/>        
                        <div className="movie-info">
                            <div className="flex">
                                <h1>{movie.name}</h1>
                                <div className="btn-edit">
                                    <Button circular icon='edit' onClick={this.setOpen.bind(this)} />
                                    <Button circular icon='remove' onClick={this.setDeleteOpen.bind(this)} />
                                </div>
                            </div>
                            <span>({movie.releaseYear})</span>
                            <h3>Genres:</h3>
                            <div className="flex">
                            {genres}
                            </div>
                            <div className="desc"> 
                                <h3>Description:</h3>
                                <p>{movie.description}</p>
                            </div>
                            <h3>Actors:</h3>
                            <div className="flex">
                            {actors}
                            </div>
                        </div>
                        <MovieModal genres={this.props.genres} actors={this.props.actors} id={this.props.match.params.id} url={this.props.url} name='Edit'/>
                        <MovieDeleteModal id={this.props.match.params.id} />
                    </div>
                    ))}
        </div>
    );
  }
}

MovieInfo.propTypes = {  
    fetchMovie: PropTypes.func.isRequired,
    fetchLeftGenres: PropTypes.func.isRequired,
    fetchLeftActors: PropTypes.func.isRequired,
    setUpdateModal: PropTypes.func.isRequired,
    setDeleteModal: PropTypes.func.isRequired,
    movie: PropTypes.object.isRequired,
    genres: PropTypes.array.isRequired,
    actors: PropTypes.array.isRequired,
    movieGenres: PropTypes.array.isRequired,
    movieActors: PropTypes.array.isRequired,
    url: PropTypes.string.isRequired,
    error: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
    movie: state.movies.movie,
    genres: state.genres.genres,
    actors: state.actors.actors,
    movieGenres: state.movies.movieGenres,
    movieActors: state.movies.movieActors,
    error: state.movies.error,
    url,
});

export default connect(mapStateToProps, { fetchMovie , fetchLeftGenres, fetchLeftActors, setUpdateModal, setDeleteModal, url })(MovieInfo);