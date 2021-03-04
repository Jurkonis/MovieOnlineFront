import React, { Component } from "react";
import { connect } from "react-redux";
import { removeGenre } from "../../actions/movieActions.js";
import PropTypes from "prop-types";
import { Icon } from 'semantic-ui-react';
import { Link } from "react-router-dom";
import axios from "axios";

class GenreName extends Component {

    state = {
        open: false,
        genre:{},
    };

    componentDidMount(){
    axios.get("http://localhost:50569/api/genre/"+this.props.genreId).then((res) => {
        let { genre } = this.state;
        genre = res.data;
        this.setState({ genre });
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

    handleDelete(e){
        this.props.removeGenre(this.props.id, this.props.movieId);
    }

  render() {

    return (
        <div className="flex">
            <Link className="nav-link" to={`/genre/${this.props.genreId}`}>
                <div className="genre-name">
                    {this.state.genre.name}
                </div>
            </Link>
            <div className="cursor" onClick={this.handleDelete.bind(this)}>
                <Icon name='remove circle' />
            </div>
        </div>
    );
  }
}

GenreName.propTypes = {  
    removeGenre: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { removeGenre })(GenreName);