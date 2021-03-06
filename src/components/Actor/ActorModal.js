import React, { Component } from 'react';
import { connect } from "react-redux";
import { updateActor, addActor, resetErrors, setUpdateModal } from "../../actions/actorActions.js";
import { Button, Input, Modal, Header, Message} from 'semantic-ui-react';
import PropTypes from "prop-types";
import axios from "axios";

class ActorModal extends Component {

  state = {
    actorData: {
        firstName: "",
        lastName: "",
      },
  };

  componentDidMount() {
    if(this.props.id !== undefined)
        {
            axios.get(this.props.url + "/actor/"+ this.props.id).then((res) => {
                let { actorData } = this.state;
                actorData.firstName = res.data.firstName;
                actorData.lastName = res.data.lastName;
                this.setState({ actorData });
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
    let data = this.state.actorData;
    if(this.props.id !== undefined){
        this.props.updateActor(this.props.id, data.firstName, data.lastName);
    }else{
        this.props.addActor(data.firstName, data.lastName);
        let { actorData } = this.state;
        actorData.firstName = "";
        actorData.lastName = "";
        this.setState({ actorData });
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
                <Modal.Header>{this.props.name} actor</Modal.Header>
                <Modal.Content image>
                    <Modal.Description >
                    {Object.keys(this.props.errors).length === 0? (""):(
                    <Message
                      error
                      header='There was some errors with your submission'
                      list={[
                        this.props.errors.FirstName,
                        this.props.errors.LastName,
                      ]}
                    />)}
                    {this.props.error !== '' ? (
                     <Message error>{this.props.error}</Message>
                    ): ("")}
                    <Header>FirstName</Header>
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
                    <Header>LastName</Header>
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

ActorModal.propTypes = {
    updateActor: PropTypes.func.isRequired,
    addActor: PropTypes.func.isRequired,
    resetErrors: PropTypes.func.isRequired,
    setUpdateModal: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    error: PropTypes.string.isRequired,
  };
  
  const mapStateToProps = (state) => ({
    modal: state.movies.modal,
    errors: state.actors.errors,
    error: state.actors.error,
  });
  
  export default connect(mapStateToProps, { addActor, updateActor, resetErrors, setUpdateModal })(ActorModal);