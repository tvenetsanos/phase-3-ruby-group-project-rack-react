import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Redirect } from "react-router-dom";

class SignUp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            email: "",
            password: "",
            username: "",
            userDetailId: 0,
            redirect: false
        }
    }

    handleClickOpen = () => {
        this.setState({
            open: true,
        })
      };
    
      handleClose = () => {
        this.setState({
            open: false,
        })
      };

      handleSignUp = () => {
          console.log(this.state.email)
          this.handleClose()
          const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              email: this.state.email,
              password: this.state.password, 
              username: this.state.username,
            })
          };
          fetch("http://localhost:9393/users", requestOptions)
          .then((res) => res.json())
          .then((data) => { 
            this.setState({
              userDetailId: data.message.id,
              redirect: true
            })
        })
      }

      handleEmailChange = (event) => {
          this.setState({
              email: event.target.value
          })
      }

      handlePasswordChange = (event) => {
        this.setState({
            password: event.target.value
        })
    }
      handleUserNameChange = (event) => {
        this.setState({
            username: event.target.value
        })
    }

  componentDidMount() {
  }

  render() {
    return (
     <div className="sign-up-button">
      <Button id="signup" variant="outlined" color="primary" onClick={this.handleClickOpen}>
        Sign up
      </Button>
      <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            onBlur={this.handleEmailChange}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Password"
            onBlur={this.handlePasswordChange}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Username"
            onBlur={this.handleUserNameChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleSignUp} color="primary">
                Sign Up
          </Button>
        </DialogActions>
      </Dialog>
      {this.state.redirect && 
      <Redirect
            to={{
            pathname: "/details",
            state: {
              userDetailId: this.state.userDetailId,
              userName: this.state.username
          }
          }}
        />}
    </div>
    );
  }
}
 
export default SignUp;