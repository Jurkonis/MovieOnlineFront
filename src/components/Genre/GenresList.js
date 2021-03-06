import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchGenres, addGenre, setUpdateModal } from "../../actions/genreActions.js";
import { Button } from 'semantic-ui-react';
import PropTypes from "prop-types";
import GenreModal from "./GenreModal.js";
import Genre from "./Genre.js";

class GenresList extends Component {

  componentDidMount() {
    this.props.fetchGenres();
  }

  setOpen(){
    this.props.setUpdateModal(true);
  }

  render() {

    let genres = this.props.genres.map((genre, index) => (
        <Genre key={genre.id} genre={genre} index={index}/>
    ));
    return (
        <div className="container">
          <div className="genre flex">
            <h1>Genres</h1>
            <div className="btn-add"><Button circular icon='plus' onClick={this.setOpen.bind(this)} /></div>
          </div>
          {this.props.genres.length === 0 ?( 
            <div className="genre-list">
              List is empty
            </div>
          ):(
            <div className="genre-list">
              {genres}
            </div>
          )}
          <GenreModal id={this.props.match.params.id} url={this.props.url} name='Add'/>
        </div>
    )
  }
}

GenresList.propTypes = {
    fetchGenres: PropTypes.func.isRequired,
    addGenre: PropTypes.func.isRequired,
    setUpdateModal: PropTypes.func.isRequired,
    genres: PropTypes.array.isRequired,
  };
  
  const mapStateToProps = (state) => ({
    genres: state.genres.genres,
  });
  
  export default connect(mapStateToProps, { fetchGenres, addGenre, setUpdateModal })(GenresList);