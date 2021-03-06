import React, { Component } from "react";
import { connect } from "react-redux";
import { resetErrors, setUpdateModal, updateMovie, addMovie, addErrors, addError } from "../../actions/movieActions.js";
import { addActorToState } from "../../actions/actorActions.js";
import PropTypes from "prop-types";
import { Button, Input, Modal, TextArea, Form, Dropdown, Header, Message } from 'semantic-ui-react';
import _ from 'lodash';
import axios from "axios";

class MovieModal extends Component {

    state = {
        movieData: {
            name: '',
            description: '',
            year: '',
        },
        actorData: {
            firstName: '',
            lastName: '',
        },
        createActor: false,
        genres:[],
        actors:[],
    };

    componentDidMount(){
        if(this.props.id !== undefined)
        {
            axios.get(this.props.url + "/movie/"+ this.props.id).then((res) => {
                let { movieData } = this.state;
                movieData.name = res.data.name;
                movieData.description = res.data.description;
                movieData.year = res.data.releaseYear;
                this.setState({ movieData });
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
    }
    
    edit(){
    let editMovie = this.state.movieData;
    let genres = this.state.genres;
    let actors = this.state.actors;
    if(this.props.id !== undefined){
        this.props.updateMovie(this.props.id, editMovie.name, editMovie.description, Number(editMovie.year ?? 0), genres, actors);
    }else{
        this.props.addMovie(editMovie.name, editMovie.description, Number(editMovie.year ?? 0), genres, actors);
        let { movieData} = this.state;
        movieData.name = "";
        movieData.description = "";
        movieData.year = "";
        genres = [];
        actors = [];
        this.setState({ movieData, genres, actors});
        }
    }   

    setClose(){
        this.props.resetErrors();
        this.props.setUpdateModal(false);
    }

    add(){
        let { createActor } = this.state;
        createActor = true;
        this.setState({ createActor });
    }

    create(){
        let { actorData } = this.state;
        axios.post(this.props.url + "/actor", {firstName: actorData.firstName, lastName: actorData.lastName}).then((res) => {
            this.props.addActorToState(res.data);
            actorData.firstName = "";
            actorData.lastName = "";
            this.setState({ actorData });
              })
              .catch((error) => {
                if (error.response) {
                  if(typeof error.response.data !== 'string'){
                    this.props.addErrors(error);
                  }else{
                    this.props.addError(error, actorData.firstName, actorData.lastName);
                  }
                } else if (error.request) {
                  console.log(error.request);
                } else {
                  console.log("Error", error.message);
                }
              });
    }

    handleChange (e, { value }){
    this.setState({ genres: value});
    }

    handleActorChange (e, { value }){
        this.setState({ actors: value});
        }

  render() {

    let genreOptions =
      _.map(this.props.genres, (genre, index) => ({
        key: genre.id,
        text: genre.name,
        value: genre,
    }))

    let actorOptions =
      _.map(this.props.actors, (actor, index) => ({
        key: actor.id,
        text: actor.firstName + " " + actor.lastName,
        value: actor,
    }))

    return (
            <Modal
            open={this.props.modal}
            onClose={this.setClose.bind(this)}
            centered={false}
            dimmer='blurring'
            size='tiny'
            >
            <Modal.Header>{this.props.name} movie</Modal.Header>
            <Modal.Content image>
                <Modal.Description >
                {Object.keys(this.props.errors).length === 0? (""):(
                <Message
                    error
                    header='There was some errors with your submission'
                    list={[
                    this.props.errors.Name, 
                    this.props.errors.ReleaseYear, 
                    this.props.errors.Description,
                    this.props.errors.FirstName,
                    this.props.errors.LastName,
                    ]}
                />)}
                 {this.props.error !== '' ? (
                     <Message error>{this.props.error}</Message>
                    ): ("")}
                    <div className="name-year flex">
                        <div>
                        <Header>Name</Header>
                        <Input type='text' placeholder='Name' 
                        value={this.state.movieData.name}
                        onChange={(e) => {
                            let { movieData } = this.state;
                            movieData.name = e.target.value;
                            this.setState({ movieData });
                        }}
                        style={{ marginRight: 10 }}>
                            <input />
                        </Input>
                        </div>
                        <div>
                        <Header>Year</Header>
                        <Input type='text' placeholder='Year'
                        value={this.state.movieData.year}
                            onChange={(e) => {
                                let { movieData } = this.state;
                                movieData.year = e.target.value;
                                this.setState({ movieData });
                            }}>
                            <input />
                        </Input>
                        </div>
                    </div>
                    <Form>
                        <Header>Description</Header>
                        <TextArea placeholder='Description'
                        value={this.state.movieData.description}
                        onChange={(e) => {
                        let { movieData } = this.state;
                        movieData.description = e.target.value;
                        this.setState({ movieData });
                        }}
                        style={{ marginBottom: 10, minHeight: 100  }}/>
                    </Form>
                    <Header>Genres</Header>
                    <Dropdown placeholder='Genre' 
                    onChange={this.handleChange.bind(this)}
                    fluid
                    multiple
                    search
                    selection
                    options={genreOptions}
                    />
                     <Header>Actors</Header>
                    <Dropdown placeholder='Actor' 
                    onChange={this.handleActorChange.bind(this)}
                    fluid
                    multiple
                    search
                    selection
                    options={actorOptions}
                    />

                   {this.state.createActor ? (
                        <div className="create-actor"> 
                        <Header>Create actor</Header>
                        <div className="flex" >
                            <div>
                                <Header>First name</Header>
                                <Input type='text' placeholder='First name' 
                                value={this.state.actorData.firstName}
                                onChange={(e) => {
                                    let { actorData } = this.state;
                                    actorData.firstName = e.target.value;
                                    this.setState({ actorData });
                                }}
                                style={{ marginRight: 10 }}>
                                    <input />
                                </Input>
                            </div>
                            <div>
                                <Header>Last name</Header>
                                <Input type='text' placeholder='Last name' 
                                value={this.state.actorData.lastName}
                                onChange={(e) => {
                                    let { actorData } = this.state;
                                    actorData.lastName = e.target.value;
                                    this.setState({ actorData });
                                }}
                                style={{ marginRight: 10 }}>
                                    <input />
                                </Input>
                            </div>
                        </div>
                    </div>
                   ):("")}
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button color='black' onClick={this.setClose.bind(this)}>
                Close
                </Button>
                {this.state.createActor ? (
                    <Button color='green' onClick={this.create.bind(this)}>
                    Save actor
                    </Button>
                ):(
                    <Button color='green' onClick={this.add.bind(this)}>
                    Add actor
                    </Button>
                )}
                <Button
                content={this.props.name}
                labelPosition='right'
                icon='checkmark'
                onClick={this.edit.bind(this)}
                positive
                />
            </Modal.Actions>
        </Modal>
    );
  }
}

MovieModal.propTypes = {  
    updateMovie: PropTypes.func.isRequired,
    setUpdateModal: PropTypes.func.isRequired,
    resetErrors: PropTypes.func.isRequired,
    addActorToState: PropTypes.func.isRequired,
    addErrors: PropTypes.func.isRequired,
    addError: PropTypes.func.isRequired,
    addMovie: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    error: PropTypes.string.isRequired,
    modal: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
    errors: state.movies.errors,
    error: state.movies.error,
    modal: state.movies.modal
});

export default connect(mapStateToProps, {resetErrors, setUpdateModal, updateMovie, addMovie, addErrors, addError, addActorToState })(MovieModal);