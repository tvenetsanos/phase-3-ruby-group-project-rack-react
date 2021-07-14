import React, { Component } from "react";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';


class YourVault extends Component {
  constructor(props) {
    super(props)
    this.state = {
        username: props.location.state.username,
        userDetailId: props.location.state.userDetailId,
        consoles: [],
        games: [],
        input: 0,
    }
  }

  componentDidMount() {
    fetch(`http://localhost:9393/consoles/?userId=${this.state.userDetailId}`)
    .then((res) => res.json())
    .then((data) => {
      this.setState({
        consoles: data.message,
      })
    })
    fetch(`http://localhost:9393/games/?userId=${this.state.userDetailId}`)
    .then((res) => res.json())
    .then((data) => {
      this.setState({
        games: data.message,
      })
    })
  }

  renderGames = () => {
    return this.state.games.map(game => 
    <Grid item xs={12} md={4} key={game.id}>
      <img src="https://cf.ltkcdn.net/music/images/orig/161118-480x319-CD-burner.jpg"/>
      <Card className="card-root">
        <CardActionArea>
          <CardContent>
              Name:
            <Typography variant="body2" color="textSecondary" component="p">
              {game.title}
              </Typography>
              <br></br>
              Rating:
            <Typography variant="body2" color="textSecondary" component="p">
              {game.rating}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
        </CardActions>
      </Card>
    </Grid>
    );
  }

  renderConsoles = () => {
    return this.state.consoles.map(console => 
    <Grid item xs={12} md={4} key={console.id}>
      <img src="https://cdn.vox-cdn.com/thumbor/aBONboyG0SKkP4u96Z33f7ZPSvA=/0x0:2040x1360/1200x0/filters:focal(0x0:2040x1360):no_upscale()/cdn.vox-cdn.com/uploads/chorus_asset/file/21990362/vpavic_4261_20201023_0028.jpg"/>
      <Card className="card-root">
        <CardActionArea>
          <CardContent>
              Model:
            <Typography variant="body2" color="textSecondary" component="p">
              {console.model}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
        </CardActions>
      </Card>
    </Grid>
    );
  }

  render() {
    return (
      <div>
        <TextField id="standard-basic"/>
        <h2>Consoles</h2>
        <Grid container spacing={1}>
          {this.renderConsoles()}
        </Grid>
        <h2>Games</h2>
        <Grid container spacing={1}>
          {this.renderGames()}
        </Grid>
        <Link
          to={{
            pathname: "/details",
            state: {
              userDetailId: this.state.userDetailId,
              userName: this.state.username
          }
          }}>
            <Button onClick={this.handleSignUp} color="primary">
                Add another
            </Button>
          </Link>
      </div>
    );
  }
}
 
export default YourVault;