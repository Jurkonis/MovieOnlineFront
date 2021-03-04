import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchMovie, updateMovie, removeMovie, resetErrors } from "../../actions/movieActions.js";
import { fetchGenres } from "../../actions/genreActions.js";
import PropTypes from "prop-types";
import GenreName from "../Genre/GenreName.js";
import { Button, Input, Modal, TextArea, Form, Dropdown, Header, Message } from 'semantic-ui-react';
import _ from 'lodash';

class MovieInfo extends Component {

    state = {
        open: false,
        openDelete: false,
        editMovieData: {
            name: this.props.movie.name,
            description: this.props.movie.description,
            year: this.props.movie.releaseYear,
            actors: this.props.movie.actors,
          },
          genres:[],
    };

    componentDidMount() {
       this.props.fetchMovie(this.props.match.params.id);
       this.props.fetchGenres();
      }

      setOpen(){
        let { open } = this.state;
          let { editMovieData } = this.state;
          editMovieData.name = this.props.movie.name;
          editMovieData.description = this.props.movie.description;
          editMovieData.year = this.props.movie.releaseYear;
          editMovieData.actors = this.props.movie.actors;
          open = true;
          this.setState({ editMovieData, open });
      }
    
      edit(){
        let data = this.state.editMovieData;
        let genres = this.state.genres;
        this.props.updateMovie(this.props.match.params.id, data.name, data.description, Number(data.year), data.actors, genres);
      }
    
      setClose(){
        let { open } = this.state;
        open = false;
          this.setState({ open });
          this.props.resetErrors();
      }

      setDeleteOpen(){
        let { openDelete } = this.state;
        openDelete = true;
          this.setState({ openDelete });
      }
    
      remove(){
        this.props.removeMovie(this.props.match.params.id);
        window.location.href = "/";
      }
    
      setDeleteClose(){
          let { openDelete } = this.state;
          openDelete = false;
          this.setState({ openDelete });
      }
    
      handleChange (e, { value }){
        this.setState({ genres: value});
      }

  render() {

    let genreOptions =
      _.map(this.props.genres, (genre, index) => ({
        key: genre.id,
        text: genre.name,
        value: genre,
    }))

    let movie = this.props.movie;

    let genres = this.props.movieGenres.map((genre, index) => (
          <GenreName  key={genre.genreId} id={genre.id} genreId={genre.genreId} movieId={genre.movieId} index={index}/>
      ));

    return (
        <div className="container">
            <div className="flex wrapper">
                <img src={process.env.PUBLIC_URL + '/images/default.jpg'} alt={movie.name}/>        
                <div className="movie-info">
                    <div className="flex">
                        <h1>{movie.name}</h1>
                        <div className="btn-edit">
                            <Button circular icon='edit' onClick={this.setOpen.bind(this)} />
                            <Button circular icon='remove' onClick={this.setDeleteOpen.bind(this)} />
                        </div>
                    </div>
                    <span>({movie.releaseYear})</span>
                    <h3>Genres:</h3>
                    <div className="flex">
                    {genres}
                    </div>
                    <div className="desc"> 
                        <h3>Description:</h3>
                        <p>{movie.description}</p>
                    </div>
                    <div className="desc"> 
                        <h3>Starring:</h3>
                        <p>{movie.actors}</p>
                    </div>
                </div>
            </div>
            <Modal
            open={this.state.open}
            onClose={this.setClose.bind(this)}
            centered={false}
            dimmer='blurring'
            size='tiny'
            >
                <Modal.Header>Edit movie</Modal.Header>
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
                        this.props.errors.Actors,
                      ]}
                    />)}
                        <div className="name-year flex">
                          <div>
                          <Header>Name</Header>
                          <Input type='text' placeholder='Name' 
                          value={this.state.editMovieData.name}
                          onChange={(e) => {
                              let { editMovieData } = this.state;
                              editMovieData.name = e.target.value;
                              this.setState({ editMovieData });
                            }}
                            style={{ marginRight: 10 }}>
                              <input />
                          </Input>
                          </div>
                          <div>
                          <Header>Year</Header>
                            <Input type='text' placeholder='Year'
                            value={this.state.editMovieData.year}
                              onChange={(e) => {
                                  let { editMovieData } = this.state;
                                  editMovieData.year = e.target.value;
                                  this.setState({ editMovieData });
                                }}>
                                <input />
                            </Input>
                          </div>
                        </div>
                        <Form>
                          <Header>Description</Header>
                          <TextArea placeholder='Description'
                          value={this.state.editMovieData.description}
                          onChange={(e) => {
                            let { editMovieData } = this.state;
                            editMovieData.description = e.target.value;
                            this.setState({ editMovieData });
                          }}
                          style={{ marginBottom: 10, minHeight: 100  }}/>
                        </Form>
                        <Form>
                          <Header>Actors</Header>
                          <TextArea placeholder='Actors'
                          value={this.state.editMovieData.actors}
                          onChange={(e) => {
                            let { editMovieData } = this.state;
                            editMovieData.actors = e.target.value;
                            this.setState({ editMovieData });
                          }}
                          style={{ marginBottom: 10 }}/>
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
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='black'onClick={this.setClose.bind(this)}>
                    Close
                    </Button>
                    <Button
                    content="Update"
                    labelPosition='right'
                    icon='checkmark'
                    onClick={this.edit.bind(this)}
                    positive
                    />
                </Modal.Actions>
            </Modal>

            <Modal
            open={this.state.openDelete}
            onClose={this.setDeleteClose.bind(this)}
            centered={false}
            dimmer='blurring'
            size='tiny'
            >
                <Modal.Header>Delete movie</Modal.Header>
                <Modal.Content image>
                    <Modal.Description >
                        Are you sure want to delete?
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='black'onClick={this.setDeleteClose.bind(this)}>
                    Close
                    </Button>
                    <Button
                    content="Yes"
                    labelPosition='right'
                    icon='checkmark'
                    onClick={this.remove.bind(this)}
                    positive
                    />
                </Modal.Actions>
            </Modal>
        </div>
    );
  }
}

MovieInfo.propTypes = {  
    fetchMovie: PropTypes.func.isRequired,
    updateMovie: PropTypes.func.isRequired,
    fetchGenres: PropTypes.func.isRequired,
    removeMovie: PropTypes.func.isRequired,
    movie: PropTypes.array.isRequired,
    genres: PropTypes.array.isRequired,
    movieGenres: PropTypes.array.isRequired,
    errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    movie: state.movies.movie,
    genres: state.genres.genres,
    movieGenres: state.movies.movieGenres,
    errors: state.movies.errors,
});

export default connect(mapStateToProps, { fetchMovie, updateMovie ,fetchGenres, removeMovie, resetErrors })(MovieInfo);