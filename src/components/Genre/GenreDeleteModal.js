import React, { Component } from "react";
import { connect } from "react-redux";
import { removeGenre, setDeleteModal} from "../../actions/genreActions.js";
import PropTypes from "prop-types";
import { Button, Modal} from 'semantic-ui-react';

class GenreDeleteModal extends Component {
    
      remove(){
        this.props.removeGenre(this.props.id);
        window.location.href = "/genres";
      }
    
      setClose(){
        this.props.setDeleteModal(false);
      }

  render() {

    return (
            <Modal
            open={this.props.deleteModal}
            onClose={this.setClose.bind(this)}
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
                    <Button color='black'onClick={this.setClose.bind(this)}>
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
    );
  }
}

GenreDeleteModal.propTypes = {  
    removeGenre: PropTypes.func.isRequired,
    setDeleteModal: PropTypes.func.isRequired,
    deleteModal: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
    deleteModal: state.movies.deleteModal,
});

export default connect(mapStateToProps, { removeGenre, setDeleteModal })(GenreDeleteModal);