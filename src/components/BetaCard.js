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
import LikeItem from '../mutations/LikeItem.graphql';
import UnlikeItem from '../mutations/UnlikeItem.graphql';
import {useMutation} from "@apollo/client";

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
      color: props.likedByUser? red[500] : grey[500]
  })
}));

export default function Card1(props) {
  const { itemName, price, seller, description, imageUrl, date, daysAgo, itemId, likes } = props;
  const [likeItemMutation] = useMutation(LikeItem);
  const [unlikeItemMutation] = useMutation(UnlikeItem);

  const [likedByUser, setLikedByUser] = useState(likes.includes(seller.id));

  const likeItemHandler = () => {
    setLikedByUser(true);
    likeItemMutation({
      variables: {
        input: {
          likerId: seller.id,
          storeItemId: itemId
        }
      }
    });
  };

  const unlikeItemHandler = () => {
    setLikedByUser(false);
    unlikeItemMutation({
      variables: {
        input: {
          likerId: seller.id,
          storeItemId: itemId
        }
      }
    });
    //setItemLiked(itemsLiked + 1);
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

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={imageUrl}
        title={itemName}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {`$${price} ${itemName}`}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="like dislike" className={classes.heartButton} onClick={toggleLikeHandler}>
          <FavoriteIcon />
        </IconButton>
        <Typography>
          {
            date == 'Invalid Date'? 
            'no date'
            :
            daysAgo<1 ? 'listed today' : `listed ${Math.round(daysAgo)} days ago`
          }
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
          <Typography>{`Listed by: ${seller.firstName} ${seller.lastName}`} </Typography>
          <Typography>{`Contact: ${seller.emailAddress}`} </Typography>
          <Typography>{`Description: ${description}`} </Typography>
          <Typography>{`Date posted: ${date}`} </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}