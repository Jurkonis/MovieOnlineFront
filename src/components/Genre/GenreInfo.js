import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchGenre, setUpdateModal, setDeleteModal, url } from "../../actions/genreActions.js";
import PropTypes from "prop-types";
import { Button } from 'semantic-ui-react';
import GenreModal from "./GenreModal.js";
import GenreDeleteModal from "./GenreDeleteModal.js";
import Movie from '../Movie/Movie.js'

class GenreInfo extends Component {

    componentDidMount() {
       this.props.fetchGenre(this.props.match.params.id);
      }

      setOpen(){
        this.props.setUpdateModal(true);
      }

      setDeleteOpen(){
        this.props.setDeleteModal(true);
      }

  render() {

    let movies = this.props.genreMovies.map((genre, index) => (
        <Movie key={genre.id} id={genre.movieId} index={index}/>
    ));

    return (
        
        <div className="container">
            {this.props.error !== '' ? (
                <div className="error">
                    <h1>{this.props.error}</h1>
                </div>
            ):(
            <>
                <div className="genre">
                    <div className="flex">
                        <h2>{this.props.genre.name}</h2>
                        <div className="btns">
                            <Button circular icon='edit' onClick={this.setOpen.bind(this)} />
                            <Button circular icon='remove' onClick={this.setDeleteOpen.bind(this)} />
                        </div>
                    </div>
                    <div className="movie-list">
                        {movies}
                    </div>
                </div>
                <GenreModal id={this.props.match.params.id} url={this.props.url} name='Edit'/>
                <GenreDeleteModal id={this.props.match.params.id} />
            </>
            )}
        </div>
    );
  }
}

GenreInfo.propTypes = {  
    fetchGenre: PropTypes.func.isRequired,
    setUpdateModal: PropTypes.func.isRequired,
    setDeleteModal: PropTypes.func.isRequired,
    genre: PropTypes.object.isRequired,
    genreMovies: PropTypes.array.isRequired,
    url: PropTypes.string.isRequired,
    error: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
    genre: state.genres.genre,
    genreMovies: state.genres.genreMovies,
    error: state.genres.error,
    url,
});

export default connect(mapStateToProps, { fetchGenre, setUpdateModal, setDeleteModal, url })(GenreInfo);