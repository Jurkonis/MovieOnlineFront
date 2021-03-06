import React, { Component } from "react";
import { connect } from "react-redux";
import {  setDeleteModal, removeMovie } from "../../actions/movieActions.js";
import PropTypes from "prop-types";
import { Button, Modal } from 'semantic-ui-react';

class MovieDeleteModal extends Component {
    
    remove(){
        this.props.removeMovie(this.props.id);
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
            <Modal.Header>Delete movie</Modal.Header>
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

MovieDeleteModal.propTypes = {  
    removeMovie: PropTypes.func.isRequired,
    setDeleteModal: PropTypes.func.isRequired,
    deleteModal: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
    deleteModal: state.movies.deleteModal,
});

export default connect(mapStateToProps, { setDeleteModal, removeMovie })(MovieDeleteModal);