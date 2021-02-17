import React, {useContext, useEffect, useState, useRef} from 'react';
import {useParams} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Input from "./controls/Input";
import {useMutation, useQuery} from '@apollo/client';
import Button from "./controls/Button";
import StoreItem from '../queries/StoreItem.graphql';
import CreateComment from "../mutations/CreateComment.graphql";
import {sessionContext} from "./SessionContext";
import Comments from "./Comments";
import BetaCard from "./BetaCard";
import SendIcon from '@material-ui/icons/Send';
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
    },
    postButton: {
        marginTop: "80px"
    },
    input: {
        marginTop: "5px"
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
                    itemId: storeItemData.storeItem.id,
                    commentId: commentObject.id,
                    commenterId: commentObject.commenterId,
                    commenterFullName: commentObject.commenterFullName,
                    commentText: commentObject.commentText,
                    commenterImageUrl: commentObject.commenterImageUrl
                })
            }))
        }
    },[storeItemData]);

    const submitCommentHandler = () => {
        textInput.current.value = "";
        if (/[a-zA-Z]/g.test(addCommentText)) {
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

    const onKeyPress = (e) => {
        if (e.key === 'Enter') {
            submitCommentHandler();
        }
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
                            <Grid item xs={12} sm container direction="column">
                                <Grid item xs container direction="column" spacing={2}>
                                    <Grid item xs={12}>
                                        <Comments commentsList={commentsToDisplay} refetch={refetch}/>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Grid container >
                                        <Grid item xs={10}>
                                            <Input
                                                onKeyUp={onKeyPress}
                                                className={classes.input}
                                                rows={5}
                                                inputProps={{ maxLength: 700 }}
                                                multiline
                                                label="add comment"
                                                variant="standard"
                                                onChange={e => setAddCommentText(e.target.value)}
                                                inputRef={textInput}
                                                fullWidth />
                                        </Grid>
                                        <Grid item>
                                            <Button className={classes.postButton} startIcon={<SendIcon />} text="post" onClick={submitCommentHandler}/>
                                        </Grid>
                                    </Grid>
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
