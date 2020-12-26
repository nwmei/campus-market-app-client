import React, {useState} from 'react';
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
  }
}));

export default function Card1(props) {
  const history = useHistory();
  const { itemId, itemName, price, seller, description, imageUrl, date, daysAgo, likes, enterable, category, neighborhood } = props;
  const [likeItemMutation] = useMutation(LikeItem);
  const [unlikeItemMutation] = useMutation(UnlikeItem);

  const [likedByUser, setLikedByUser] = useState(likes.includes(seller.id));

  const likeItemHandler = () => {
    likeItemMutation({
      variables: {
        input: {
          likerId: seller.id,
          storeItemId: itemId
        }
      }
    }).then(() => setLikedByUser(true));
  };

  const unlikeItemHandler = () => {
    unlikeItemMutation({
      variables: {
        input: {
          likerId: seller.id,
          storeItemId: itemId
        }
      }
    }).then(() => setLikedByUser(false));
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
      {
        enterable?
            <Link to={`/item/${itemId}`} >
              <CardMedia
                  className={classes.media}
                  image={imageUrl.length>3 ? imageUrl : getAlternateImageUrl()}
                  title={itemName}
              />
            </Link>
            :
            <CardMedia
                className={classes.media}
                image={imageUrl.length>3 ? imageUrl : getAlternateImageUrl()}
                title={itemName}
            />
      }
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {`$${price} ${itemName}`}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
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
            daysAgo<1 ? 'listed today' : `listed ${Math.round(daysAgo)} days ago`
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
          <Typography>{`Listed by: ${seller.firstName} ${seller.lastName}`} </Typography>
          <Typography>{`Contact: ${seller.emailAddress}`} </Typography>
          <Typography>{`Category: ${category}`} </Typography>
          <Typography>{`Neighborhood: ${neighborhood}`} </Typography>
          <Typography>{`Description: ${description}`} </Typography>
          <Typography>{`Date posted: ${date}`} </Typography>
          <Typography className={classes.root} style={{ cursor: 'pointer' }}>
            {
              enterable &&
              <MuiLink onClick={cardClickHandler}>
                view comments
              </MuiLink>
            }
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}