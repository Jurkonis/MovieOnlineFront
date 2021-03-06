import React, { Component } from "react";
import { connect } from "react-redux";
import { removeActor, setDeleteModal} from "../../actions/actorActions.js";
import PropTypes from "prop-types";
import { Button, Modal} from 'semantic-ui-react';

class ActorDeleteModal extends Component {
    
      remove(){
        this.props.removeActor(this.props.id);
        window.location.href = "/actors";
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
                <Modal.Header>Delete actor</Modal.Header>
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

ActorDeleteModal.propTypes = {  
    removeActor: PropTypes.func.isRequired,
    setDeleteModal: PropTypes.func.isRequired,
    deleteModal: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
    deleteModal: state.movies.deleteModal,
});

export default connect(mapStateToProps, { removeActor, setDeleteModal })(ActorDeleteModal);