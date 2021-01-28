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
      color: props.likedByUser? red[500] : grey[500],
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

export default function Card1(props) {
  const history = useHistory();
  const { itemId, itemName, price, seller, description, imageUrls, date, daysAgo, likes, enterable, category, neighborhood, refetch } = props;
  const {sessionContextValue} = useContext(sessionContext);
  let splitDate = date.toString().split(' ');
  const formattedDate = splitDate[0] + ' ' + splitDate[1] + ' ' + splitDate[2]
  const [likeItemMutation, {data: likeData}] = useMutation(LikeItem);
  const [unlikeItemMutation, {data: unlikeData}] = useMutation(UnlikeItem);
  const [likedByUser, setLikedByUser] = useState(likes.includes(sessionContextValue.userId));

  useEffect(() => {
    if (likeData || unlikeData) {
      refetch();
    }
  }, [likeData, unlikeData]);

  useEffect(() => {
    setLikedByUser(likes.includes(sessionContextValue.userId));
  }, [likes]);

  const likeItemHandler = () => {
    console.log("like")
    likeItemMutation({
      variables: {
        input: {
          likerId: sessionContextValue.userId,
          storeItemId: itemId
        }
      }
    });
  };

  const unlikeItemHandler = () => {
    unlikeItemMutation({
      variables: {
        input: {
          likerId: sessionContextValue.userId,
          storeItemId: itemId
        }
      }
    });
  };

  const toggleLikeHandler= () => {
    if (likedByUser) {
      unlikeItemHandler();
    } else {
      likeItemHandler();
    }
  };

  const classes = useStyles({likedByUser});
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const cardClickHandler = () => {
    history.push(`/item/${itemId}`)
  };

  return (
    <Card className={classes.root}>
      {/*{*/}
      {/*  enterable?*/}
      {/*      <Link to={`/item/${itemId}`} >*/}
      {/*        <CardMedia*/}
      {/*            className={classes.media}*/}
      {/*            image={imageUrls[0] !== undefined? imageUrls[0] : getAlternateImageUrl()}*/}
      {/*            title={itemName}*/}
      {/*        />*/}
      {/*      </Link>*/}
      {/*      :*/}
      {/*      <CardMedia*/}
      {/*          className={classes.media}*/}
      {/*          image={imageUrls[0] !== undefined? imageUrls[0] : getAlternateImageUrl()}*/}
      {/*          title={itemName}*/}
      {/*      />*/}
      {/*}*/}

      <CardMedia> <ImageGallery imageUrls={imageUrls} itemName={itemName} seller={seller} price={price} /> </CardMedia>

      {/*<CardContent className={classes.description}>*/}
      {/*  <Typography variant="body2" color="textSecondary" component="p">*/}
      {/*    {`$${price} ${itemName}`}*/}
      {/*  </Typography>*/}
      {/*</CardContent>*/}
      <CardActions disableSpacing className={classes.bottomBar}>
        <IconButton aria-label="like dislike" className={classes.heartButton} onClick={toggleLikeHandler}>
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="comment" className={classes.comment} onClick={enterable? cardClickHandler : ()=>{}}>
          <AddCommentIcon />
        </IconButton>
        <Typography>
          {
            date == 'Invalid Date'? 
            'no date'
            :
            daysAgo<1 ? 'listed today' : `${Math.round(daysAgo)} days ago`
          }
        </Typography>
        {
          enterable &&
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
        }
      </CardActions>
      <Collapse in={!enterable || expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <ThemeProvider theme={theme}>
          <Typography >{`Owner: ${seller.firstName} ${seller.lastName}`} </Typography>
          <Typography>{`Contact: ${seller.emailAddress}`} </Typography>
          <Typography>{`Category: ${category}`} </Typography>
          <Typography>{`Neighborhood: ${neighborhood}`} </Typography>
          <Typography>{`Description: ${description}`} </Typography>
          <Typography>{`Date posted: ${formattedDate}`} </Typography>
          <Typography className={classes.root} style={{ cursor: 'pointer' }}>
            {
              enterable &&
              <MuiLink onClick={cardClickHandler}>
                view comments
              </MuiLink>
            }
          </Typography>
          <Typography className={classes.root} style={{ cursor: 'pointer' }}>
            {
              (sessionContextValue.userId === seller.id) &&
                <EditCard {...props} />
            }
          </Typography>
          </ThemeProvider>
        </CardContent>
      </Collapse>
    </Card>
  );
}