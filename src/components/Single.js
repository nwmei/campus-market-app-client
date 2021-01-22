import React, {useContext, useEffect, useState, useRef} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Input from "./controls/Input";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import {useMutation, useQuery} from '@apollo/client';
import Button from "./controls/Button";
import StoreItem from '../queries/StoreItem.graphql';
import CreateComment from "../mutations/CreateComment.graphql";
import {sessionContext} from "./SessionContext";
import Comments from "./Comments";
import BetaCard from "./BetaCard";
import lodash from 'lodash';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    content: {
        paddingTop: "80px"
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 1200,
        boxShadow: "none"
    },
    image: {
        width: 500,
        height: 700,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
    report: {
        paddingTop: 0
    }
}));

const Single = () => {
    const storeItemId = useParams().itemId;
    const {data: storeItemData, refetch} = useQuery(StoreItem,
      {
          variables: {
            input: {
              id: storeItemId
            }
          },
          fetchPolicy: "no-cache"
          }
    );
    const [createComment] = useMutation(CreateComment);
    const {sessionContextValue} = useContext(sessionContext);
    const [itemData, setItemData] = useState({});
    const [commentsToDisplay, setCommentsToDisplay] = useState([]);
    const [addCommentText, setAddCommentText] = useState("");
    const classes = useStyles();

    let textInput = useRef(null);

    useEffect(() => {
        if (storeItemData) {
            setItemData(storeItemData.storeItem);
            setCommentsToDisplay(storeItemData.storeItem.comments.map((commentObject) => {
                return ({
                    commenterFullName: commentObject.commenterFullName,
                    commentText: commentObject.commentText,
                    commenterImageUrl: commentObject.commenterImageUrl
                })
            }))
        }
    },[storeItemData]);

    const submitCommentHandler = () => {
        setTimeout(() => {
            textInput.current.value = "";
        }, 100);
        if (addCommentText !== "") {
            createComment({
                variables: {
                    input: {
                        commenterId: sessionContextValue.userId,
                        commenterFullName: sessionContextValue.userFirstName + ' ' + sessionContextValue.userLastName,
                        storeItemId,
                        commentText: addCommentText,
                        commenterImageUrl: sessionContextValue.imageUrl
                    }
                }
            }).then(() => {
                const newComments = lodash.cloneDeep(commentsToDisplay);
                newComments.push({commentText: addCommentText, commenterFullName: sessionContextValue.userFirstName + ' ' + sessionContextValue.userLastName, commenterImageUrl: sessionContextValue.imageUrl})
                setCommentsToDisplay(newComments);
            })
        }
        setAddCommentText("");
    };

    return (
        <>
        {
            itemData.id && (
            <div className={classes.root}>
                <div className={classes.content}>
                    <Paper className={classes.paper}>
                        <Grid container spacing={2}>
                            <Grid item>
                                <BetaCard
                                    enterable={false}
                                    date={new Date(parseInt(itemData.date))}
                                    daysAgo={(Date.now() - parseInt(itemData.date))/86400000}
                                    itemId={itemData.id}
                                    itemName={itemData.name}
                                    description={itemData.description}
                                    price={itemData.price}
                                    seller={itemData.seller}
                                    likes={itemData.likes}
                                    imageUrls={itemData.imageUrls}
                                    category={itemData.category}
                                    neighborhood={itemData.neighborhood}
                                    refetch={() => refetch()}
                                />
                            </Grid>
                            <Grid item xs={12} sm container>
                                <Grid item xs container direction="column" spacing={2}>
                                    <Grid item xs={12}>
                                        <Comments commentsList={commentsToDisplay}/>
                                    </Grid>
                                    <Grid item>
                                        <Grid container >
                                            <Grid item xs={10}>
                                                <Input label="add comment" variant="standard" onChange={(e) => setAddCommentText(e.target.value)} inputRef={textInput} fullWidth />
                                            </Grid>
                                            <Grid item>
                                                <Button text="post" onClick={submitCommentHandler}/>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <IconButton className={classes.report}>
                                        <MoreVertIcon />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </div>
            </div>
        )
        }
        </>
    );
};

export default Single;
