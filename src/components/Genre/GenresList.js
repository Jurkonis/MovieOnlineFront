import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchGenres, addGenre, resetErrors } from "../../actions/genreActions.js";
import { Button, Input, Modal, Header, Message} from 'semantic-ui-react';
import PropTypes from "prop-types";
import Genre from "./Genre.js";

class GenresList extends Component {

  state = {
    open: false,
    addGenreData: {
        name: "",
      },
      file:{},
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
    let data = this.state.addGenreData;
    this.props.addGenre(data.name);
  }

  setClose(){
      let { open } = this.state;
      let { addGenreData } = this.state;
      addGenreData.name = "";
      addGenreData.description = "";
      addGenreData.year = "";
      open = false;
      this.setState({ addGenreData, open });
      this.props.resetErrors();
  }

  onChange(e) {
    this.setState({ file: e.target.files[0]});
  }

  render() {

    let genres = this.props.genres.map((genre, index) => (
        <Genre key={genre.id} genre={genre} index={index}/>
    ));
    return (
        <div className="container">
          <div className="genre flex">
            <h1>Genres</h1>
            <div className="btn-add"><Button circular icon='plus' onClick={this.setOpen.bind(this)} /></div>
          </div>
          {this.props.genres.length === 0 ?( 
            <div className="genre-list">
              List is empty
            </div>
          ):(
            <div className="genre-list">
              {genres}
            </div>
          )}
            <Modal
            open={this.state.open}
            onClose={this.setClose.bind(this)}
            centered={false}
            dimmer='blurring'
            size='tiny'
            >
                <Modal.Header>Add genre</Modal.Header>
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
                      onChange={(e) => {
                          let { addGenreData } = this.state;
                          addGenreData.name = e.target.value;
                          this.setState({ addGenreData });
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

GenresList.propTypes = {
    fetchGenres: PropTypes.func.isRequired,
    addGenre: PropTypes.func.isRequired,
    resetErrors: PropTypes.func.isRequired,
    genres: PropTypes.array.isRequired,
    errors: PropTypes.object.isRequired,
  };
  
  const mapStateToProps = (state) => ({
    genres: state.genres.genres,
    errors: state.genres.errors,
  });
  
  export default connect(mapStateToProps, { fetchGenres, addGenre, resetErrors })(GenresList);