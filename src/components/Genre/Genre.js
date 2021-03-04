import React, { Component } from "react";
import { connect } from "react-redux";
import Movie from '../Movie/Movie.js'
import { Link  } from "react-router-dom";

class Genre extends Component {

  render() {

    let movies = this.props.genre.genreMovies.slice(0,5).map((movie, index) => (
        <Movie key={movie.id} id={movie.movieId} index={index}/>
    ));

    return (
        <div className="genre">
            <Link  className="nav-link" to={`/genre/${this.props.genre.id}`}>
                <h2 className="genre-name">{this.props.genre.name}</h2>
            </Link>
            {this.props.genre.genreMovies.length === 0 ?( 
            <div className="empty-list">
              No movies assigned
            </div>
          ):(
            <div className="movie-list">
              {movies}
            </div>
          )}
        </div>
    );
  }
}

Genre.propTypes = {  

};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { })(Genre);