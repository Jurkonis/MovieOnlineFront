import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchActors, addActor, setUpdateModal } from "../../actions/actorActions.js";
import { Button } from 'semantic-ui-react';
import PropTypes from "prop-types";
import ActorModal from "./ActorModal.js";
import Actor from "./Actor.js";

class ActorsList extends Component {

  componentDidMount() {
    this.props.fetchActors();
  }

  setOpen(){
    this.props.setUpdateModal(true);
  }

  render() {

    let actors = this.props.actors.map((actor, index) => (
        <Actor key={actor.id} actor={actor} index={index}/>
    ));
    return (
        <div className="container">
          <div className="genre flex">
            <h1>Actors</h1>
            <div className="btn-add"><Button circular icon='plus' onClick={this.setOpen.bind(this)} /></div>
          </div>
          {this.props.actors.length === 0 ?( 
            <div className="genre-list">
              List is empty
            </div>
          ):(
            <div className="genre-list">
              {actors}
            </div>
          )}
          <ActorModal id={this.props.match.params.id} url={this.props.url} name='Add'/>
        </div>
    )
  }
}

ActorsList.propTypes = {
    fetchActors: PropTypes.func.isRequired,
    addActor: PropTypes.func.isRequired,
    setUpdateModal: PropTypes.func.isRequired,
    actors: PropTypes.array.isRequired,
  };
  
  const mapStateToProps = (state) => ({
    actors: state.actors.actors,
  });
  
  export default connect(mapStateToProps, { fetchActors, addActor, setUpdateModal })(ActorsList);