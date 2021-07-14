import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {DropzoneArea} from 'material-ui-dropzone'

class Details extends Component {
    constructor(props) {
        super(props)
        console.log(props)
        this.state = {
            open: false,
            username: props.location.state.userName,
            userDetailId: props.location.state.userDetailId,
            console: "",
            game: "",
            rating: 0,
            redirect: false,
            consoleImage: [],
            gameImage: []
        }
    }

    handleConsoleUpdate = (event) => {
        this.setState({
            console: event.target.value
        })
    }

    handleGameUpdate = (event) => {
        this.setState({
            game: event.target.value
        })
    }

    handleRatingUpdate = (event) => {
        this.setState({
            rating: event.target.value
        })
    }

    handleGameImageUpdate = (files) => {
        this.setState({
            gameImage: files
        })
    }

    handleConsoleImageUpdate = (files) => {
        this.setState({
            consoleImage: files
        })
    }

    handleFinishSignUp = () => {
        const consoleRequestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                user_id: this.state.userDetailId,
                model: this.state.console,
            })
        };
        fetch("http://localhost:9393/consoles", consoleRequestOptions)
        .then((resp) => resp.json())
        .then((data) => {
            const gameRequestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    user_id: this.state.userDetailId,
                    console_id: data.message.id,
                    title: this.state.game,
                    rating: this.state.rating
                })
            };
            fetch("http://localhost:9393/games", gameRequestOptions)
            .then(() => {
                this.setState({
                    redirect: true
                })
            })
        })
    }

  render() {
    return (
        <div className="user-details">
            <h1>Welcome {this.state.username}</h1>
            <TextField id="standard-basic" label="Console" onBlur={this.handleConsoleUpdate} />
            <br></br>
            <TextField id="standard-basic" label="Game"  onBlur={this.handleGameUpdate}/>
            <br></br>
            <TextField id="standard-basic" label="Rating" onBlur={this.handleRatingUpdate} />
            <br></br>
            <h3>Upload an image of your console</h3>
            <DropzoneArea
                onChange={this.handleConsoleImageUpdate}
                filesLimit={1}
            />
            <h3>Upload an image of your game</h3>
            <DropzoneArea
                onChange={this.handleGameImageUpdate}
                filesLimit={1}
            />
    
                <Button className="button" onClick={this.handleFinishSignUp} color="primary" variant="contained">
                    Your Vault!
                </Button>
                
            {this.state.redirect && 
            <Redirect
                    to={{
                    pathname: "/yourvault",
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
 
export default Details;