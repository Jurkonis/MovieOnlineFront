import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchMovies, addMovie, resetErrors} from "../../actions/movieActions.js";
import { fetchGenres } from "../../actions/genreActions.js";
import { Button, Input, Modal, TextArea, Form, Dropdown, Header, Message } from 'semantic-ui-react';
import PropTypes from "prop-types";
import Movie from "./Movie.js";
import _ from 'lodash';

class MovieList extends Component {

  state = {
    open: false,
    addMovieData: {
        name: "",
        description: "",
        year: "",
        actors: "",
      },
      genres:[],
  };

  componentDidMount() {
    this.props.fetchGenres();
  }

  setOpen(){
    let { open } = this.state;
    open = true;
    this.setState({ open });
  }

  add(){
    let data = this.state.addMovieData;
    let genres = this.state.genres;
    this.props.addMovie(data.name, data.description, Number(data.year) , data.actors, genres);
  }

  setClose(){
      let { open } = this.state;
      let { addMovieData } = this.state;
      addMovieData.name = "";
      addMovieData.description = "";
      addMovieData.year = "";
      open = false;
      this.setState({ addMovieData, open });
      this.props.resetErrors();
  }

  handleChange (e, { value }){
    this.setState({ genres: value});
  }

  render() {
    let movies = this.props.movies.map((movie, index) => (
        <Movie key={movie.id} id={movie.id} movie={movie} index={index}/>
    ));

    let genreOptions =
      _.map(this.props.genres, (genre, index) => ({
        key: genre.id,
        text: genre.name,
        value: genre,
    }))

    return (
        <div className="container">
          <div className="flex">
            <h1>Movies</h1>
            <div className="btn-add"><Button circular icon='plus' onClick={this.setOpen.bind(this)} /></div>
          </div>
              {this.props.movies.length !== 0 ? (
                <div className="movie-list">
                  {movies}
                </div>
              ):(
                <p>Empty movie list</p>
              )}
            <Modal
            open={this.state.open}
            onClose={this.setClose.bind(this)}
            centered={false}
            dimmer='blurring'
            size='tiny'
            >
                <Modal.Header>Add movie</Modal.Header>
                <Modal.Content image>
                    <Modal.Description>
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
                          onChange={(e) => {
                              let { addMovieData } = this.state;
                              addMovieData.name = e.target.value;
                              this.setState({ addMovieData });
                            }}
                            style={{ marginRight: 10 }}>
                              <input />
                          </Input>
                          </div>
                          <div>
                          <Header>Year</Header>
                          <Input type='text' placeholder='Year'
                            onChange={(e) => {
                                let { addMovieData } = this.state;
                                addMovieData.year = e.target.value;
                                this.setState({ addMovieData });
                              }}>
                              <input />
                          </Input>
                          </div>
                        </div>
                        <Form>
                          <Header>Description</Header>
                          <TextArea placeholder='Description'
                          onChange={(e) => {
                            let { addMovieData } = this.state;
                            addMovieData.description = e.target.value;
                            this.setState({ addMovieData });
                          }}
                          style={{ marginBottom: 10, minHeight: 100  }}/>
                        </Form>
                        <Form>
                          <Header>Actors</Header>
                          <TextArea placeholder='Actors'
                          onChange={(e) => {
                            let { addMovieData } = this.state;
                            addMovieData.actors = e.target.value;
                            this.setState({ addMovieData });
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
                    content="Add"
                    labelPosition='right'
                    icon='checkmark'
                    onClick={this.add.bind(this)}
                    positive
                    />
                </Modal.Actions>
            </Modal>
        </div>
    )
  }
}

MovieList.propTypes = {
    fetchMovies: PropTypes.func.isRequired,
    fetchGenres: PropTypes.func.isRequired,
    resetErrors: PropTypes.func.isRequired,
    addMovie: PropTypes.func.isRequired,
    movies: PropTypes.array.isRequired,
    genres: PropTypes.array.isRequired,
    errors: PropTypes.object.isRequired,
  };
  
  const mapStateToProps = (state) => ({
    movies: state.movies.movies,
    genres: state.genres.genres,
    errors: state.movies.errors,
  });
  
  export default connect(mapStateToProps, { fetchMovies, addMovie, fetchGenres, resetErrors })(MovieList);