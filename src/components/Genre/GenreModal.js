import React, { Component } from 'react';
import { connect } from "react-redux";
import { updateGenre, addGenre, resetErrors, setUpdateModal } from "../../actions/genreActions.js";
import { Button, Input, Modal, Header, Message} from 'semantic-ui-react';
import PropTypes from "prop-types";
import axios from "axios";

class GenreModal extends Component {

  state = {
    genreData: {
        name: "",
      },
  };

  componentDidMount() {
    if(this.props.id !== undefined)
        {
            axios.get(this.props.url + "/genre/"+ this.props.id).then((res) => {
                let { genreData } = this.state;
                genreData.name = res.data.name;
                this.setState({ genreData });
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
    let data = this.state.genreData;
    if(this.props.id !== undefined){
        this.props.updateGenre(this.props.id, data.name);
    }else{
        this.props.addGenre(data.name);
        let { genreData } = this.state;
        genreData.name = "";
        this.setState({ genreData });
        }
    }

  setClose(){
    this.props.resetErrors();
    this.props.setUpdateModal(false);
  }

  render() {

    return (
            <Modal
            open={this.props.modal}
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
                    />
                    )}
                    {this.props.error !== '' ? (
                     <Message error>{this.props.error}</Message>
                    ): ("")}
                    <Header>Name</Header>
                      <Input type='text' placeholder='Name' 
                      value={this.state.genreData.name}
                      onChange={(e) => {
                          let { genreData } = this.state;
                          genreData.name = e.target.value;
                          this.setState({ genreData });
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
                    content={this.props.name}
                    labelPosition='right'
                    icon='checkmark'
                    onClick={this.edit.bind(this)}
                    positive
                    />
                </Modal.Actions>
            </Modal>
    )
  }
}

GenreModal.propTypes = {
    updateGenre: PropTypes.func.isRequired,
    addGenre: PropTypes.func.isRequired,
    resetErrors: PropTypes.func.isRequired,
    setUpdateModal: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    error: PropTypes.string.isRequired,
  };
  
  const mapStateToProps = (state) => ({
    modal: state.movies.modal,
    errors: state.genres.errors,
    error: state.genres.error,
  });
  
  export default connect(mapStateToProps, { addGenre, updateGenre, resetErrors, setUpdateModal })(GenreModal);