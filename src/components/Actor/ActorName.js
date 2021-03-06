import React, { Component } from "react";
import { connect } from "react-redux";
import { removeActor, url } from "../../actions/movieActions.js";
import PropTypes from "prop-types";
import { Icon } from 'semantic-ui-react';
import { Link } from "react-router-dom";
import axios from "axios";

class ActorName extends Component {

    state = {
        actor:{},
    };

    componentDidMount(){
    axios.get(this.props.url + "/actor/"+this.props.actorId).then((res) => {
        let { actor } = this.state;
        actor = res.data;
        this.setState({ actor });
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
        this.props.removeActor(this.props.id, this.props.index);
    }

  render() {

    return (
        <div className="flex">
            <Link className="nav-link" to={`/actor/${this.props.actorId}`}>
                <div className="genre-name">
                    {this.state.actor.firstName} {this.state.actor.lastName}
                </div>
            </Link>
            <div className="cursor" onClick={this.handleDelete.bind(this)}>
                <Icon name='remove circle' />
            </div>
        </div>
    );
  }
}

ActorName.propTypes = {  
    removeActor: PropTypes.func.isRequired,
    url: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({url});

export default connect(mapStateToProps, { removeActor, url })(ActorName);