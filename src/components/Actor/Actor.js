import React, { Component } from "react";
import { connect } from "react-redux";
import Movie from '../Movie/Movie.js'
import { Link  } from "react-router-dom";

class Genre extends Component {

  render() {

    let movies = this.props.actor.actorMovies.slice(0,5).map((movie, index) => (
        <Movie key={movie.id} id={movie.movieId} index={index}/>
    ));

    return (
        <div className="genre">
            <Link  className="nav-link" to={`/actor/${this.props.actor.id}`}>
                <h2 className="genre-name">{this.props.actor.firstName + " " + this.props.actor.lastName}</h2>
            </Link>
            {this.props.actor.actorMovies.length === 0 ?( 
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