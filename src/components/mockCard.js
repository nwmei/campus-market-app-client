import React, {useContext, useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red, grey } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CardActionArea from '@material-ui/core/CardActionArea';
import { Link, useHistory } from 'react-router-dom';
import MuiLink from '@material-ui/core/Link';
import LikeItem from '../mutations/LikeItem.graphql';
import UnlikeItem from '../mutations/UnlikeItem.graphql';
import {useMutation} from "@apollo/client";
import {getAlternateImageUrl} from "../utils/HelperMethods";
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import AddCommentIcon from '@material-ui/icons/AddComment';
import {sessionContext} from "./SessionContext";
import {createMuiTheme, ThemeProvider} from "@material-ui/core/styles";
import EditCard from "./EditCard";
import ImageGallery from "./ImageGallery";

const useStyles = makeStyles((theme) => ({
  root: (props) => ({
    maxWidth: 345,
  }),
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  heartButton: props => ({
    color: red[500],
    paddingRight: 3,
    paddingLeft: 7
  }),
  comment: {
    color: grey[500],
    paddingRight: 7,
    paddingLeft: 3
  },
  description: {
    paddingTop: 10,
    paddingBottom: 0
  },
  bottomBar: {
    paddingTop: 0,
    paddingBottom: 0
  }
}));

const theme = createMuiTheme({
  typography: {
    fontSize: 12,
  },
});

export default function Card1() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const seller = {
    firstName: 'Nelson',
    lastName: 'Mei',
    imageUrl: "https://lh3.googleusercontent.com/a-/AOh14Gjnsz19TcAIvCQV7q3bnlT8vSaddl69HQgkUmHIzA=s96-c"
  };

  return (
    <Card className={classes.root}>
      <CardMedia> <ImageGallery imageUrls={['https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRQkEkxv3nvu4_AUretYQvt8fCuvQkiECqbMKQQ90X1JhTJAYOzWtTRS-IOFIQ8hSSLFLta3pKgsCHKV-qpWkZr9BAheWivOq5NCsXxL4w1&usqp=CAc']}
                                itemName='desk chair (like new)' seller={seller} price={4} toggleExpanded={handleExpandClick}/> </CardMedia>
      <CardActions disableSpacing className={classes.bottomBar}>
        <IconButton aria-label="like dislike" className={classes.heartButton} >
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="comment" className={classes.comment} >
          <AddCommentIcon />
        </IconButton>
        <Typography>
          listed 2 days ago
        </Typography>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <ThemeProvider theme={theme}>
            <Typography >{`Owner: ${seller.firstName} ${seller.lastName}`} </Typography>
            <Typography>{`Contact: ${seller.emailAddress}`} </Typography>
            <Typography>{`Category: furniture`} </Typography>
            <Typography>{`Neighborhood: Warren Towers`} </Typography>
            <Typography>{`Description: A nice item`} </Typography>
            <Typography>{`Date posted: 01/02/21`} </Typography>
            <Typography className={classes.root} style={{ cursor: 'pointer' }}>
              <MuiLink>
                view comments
              </MuiLink>
            </Typography>
          </ThemeProvider>
        </CardContent>
      </Collapse>
    </Card>
  );
}