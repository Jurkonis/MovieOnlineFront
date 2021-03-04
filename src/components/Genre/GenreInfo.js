import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchGenre, updateGenre, removeGenre, resetErrors } from "../../actions/genreActions.js";
import PropTypes from "prop-types";
import { Button, Input, Modal, Header, Message} from 'semantic-ui-react';
import Movie from '../Movie/Movie.js'

class GenreInfo extends Component {

    state = {
        open: false,
        openDelete: false,
        editGenreData: {
            name: this.props.genre.name,
          },
    };

    componentDidMount() {
       this.props.fetchGenre(this.props.match.params.id);
      }

      setOpen(){
        let { open } = this.state;
          let { editGenreData } = this.state;
          editGenreData.name = this.props.genre.name;
          open = true;
          this.setState({ editGenreData, open });
      }
    
      edit(){
        let data = this.state.editGenreData;
        this.props.updateGenre(this.props.match.params.id, data.name);
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
        this.props.removeGenre(this.props.match.params.id);
        window.location.href = "/genres";
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

    let movies = this.props.genreMovies.map((genre, index) => (
        <Movie key={genre.id} id={genre.movieId} index={index}/>
    ));

    return (
        <div className="container">
            <div className="genre">
            <div className="flex">
                <h2>{this.props.genre.name}</h2>
                <div className="btns">
                    <Button circular icon='edit' onClick={this.setOpen.bind(this)} />
                    <Button circular icon='remove' onClick={this.setDeleteOpen.bind(this)} />
                </div>
            </div>
            <div className="movie-list">
                {movies}
            </div>
        </div>
            <Modal
            open={this.state.open}
            onClose={this.setClose.bind(this)}
            centered={false}
            dimmer='blurring'
            size='tiny'
            >
                <Modal.Header>Edit genre</Modal.Header>
                <Modal.Content image>
                    <Modal.Description >
                    {Object.keys(this.props.errors).length === 0? (""):(
                    <Message
                      error
                      header='There was some errors with your submission'
                      list={[
                        this.props.errors.Name,
                      ]}
                    />)}
                        <Header>Name</Header>
                        <Input type='text' placeholder='Name' 
                        value={this.state.editGenreData.name}
                        onChange={(e) => {
                            let { editGenreData } = this.state;
                            editGenreData.name = e.target.value;
                            this.setState({ editGenreData });
                            }}
                            style={{ marginRight: 10 }}>
                            <input />
                        </Input>
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
                <Modal.Header>Delete genre</Modal.Header>
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

GenreInfo.propTypes = {  
    fetchGenre: PropTypes.func.isRequired,
    removeGenre: PropTypes.func.isRequired,
    updateGenre: PropTypes.func.isRequired,
    genre: PropTypes.array.isRequired,
    genreMovies: PropTypes.array.isRequired,
    resetErrors: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    genre: state.genres.genre,
    genreMovies: state.genres.genreMovies,
    errors: state.genres.errors,
});

export default connect(mapStateToProps, { removeGenre ,fetchGenre, updateGenre, resetErrors })(GenreInfo);