import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchActor, setUpdateModal, setDeleteModal, url } from "../../actions/actorActions.js";
import PropTypes from "prop-types";
import { Button } from 'semantic-ui-react';
import ActorModal from "./ActorModal.js";
import ActorDeleteModal from "./ActorDeleteModal.js";
import Movie from '../Movie/Movie.js'

class ActorInfo extends Component {

    componentDidMount() {
       this.props.fetchActor(this.props.match.params.id);
      }

      setOpen(){
        this.props.setUpdateModal(true);
      }

      setDeleteOpen(){
        this.props.setDeleteModal(true);
      }

  render() {

    let movies = this.props.actorMovies.map((actor, index) => (
        <Movie key={actor.id} id={actor.movieId} index={index}/>
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
                        <h2>{this.props.actor.firstName + " " + this.props.actor.lastName}</h2>
                        <div className="btns">
                            <Button circular icon='edit' onClick={this.setOpen.bind(this)} />
                            <Button circular icon='remove' onClick={this.setDeleteOpen.bind(this)} />
                        </div>
                    </div>
                    <div className="movie-list">
                        {movies}
                    </div>
                </div>
                <ActorModal id={this.props.match.params.id} url={this.props.url} name='Edit'/>
                <ActorDeleteModal id={this.props.match.params.id} />
            </>
            )}
        </div>
    );
  }
}

ActorInfo.propTypes = {  
    fetchActor: PropTypes.func.isRequired,
    setUpdateModal: PropTypes.func.isRequired,
    setDeleteModal: PropTypes.func.isRequired,
    actor: PropTypes.object.isRequired,
    actorMovies: PropTypes.array.isRequired,
    url: PropTypes.string.isRequired,
    error: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
    actor: state.actors.actor,
    error: state.actors.error,
    actorMovies: state.actors.actorMovies,
    url,
});

export default connect(mapStateToProps, { fetchActor, setUpdateModal, setDeleteModal, url })(ActorInfo);