import React, { Component } from "react";
import { connect } from "react-redux";
//import { } from "../../actions/movieActions.js";
// import PropTypes from "prop-types";
import axios from "axios";
import { Link } from "react-router-dom";

class Movie extends Component {

    state = {
        open: false,
        movie:{},
    };

    componentDidMount(){
    axios.get("http://localhost:50569/api/movie/"+this.props.id).then((res) => {
        let { movie } = this.state;
        movie = res.data;
        this.setState({ movie });
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
      });
    }

  render() {

    let movie = this.state.movie;

    return (
        <Link className="nav-link" to={`/movie/${movie.id}`}>
            <div className="movie">
                <img src={process.env.PUBLIC_URL + '/images/default.jpg'} alt={movie.name}/>
                <div className="movie-info">
                    <h3>
                        {movie.name}
                    </h3>
                    <span>
                    ({movie.releaseYear})
                    </span>
                    <div className="description"> 
                        <h3>Description:</h3>
                        <p>{movie.description}</p>
                    </div>
                </div>
            </div>
        </Link>
    );
  }
}

Movie.propTypes = {  

};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { })(Movie);