import React, {useContext, useEffect, useState, useRef} from 'react';
import {useHistory} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Input from "./controls/Input";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import {useMutation, useQuery} from '@apollo/client';
import Header from './Header';
import Button from "./controls/Button";
import StoreItem from '../queries/StoreItem.graphql';
import {getImageUrl, PopulateSessionContext} from "../utils/HelperMethods";
import CreateComment from "../mutations/CreateComment.graphql";
import SessionUserDetails from "../queries/SessionUserDetails.graphql";
import {sessionContext} from "./SessionContext";
import Comments from "./Comments";
import lodash from 'lodash';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    content: {
        paddingTop: "70px"
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 1200,
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

const Single = ({match}) => {
    const history = useHistory();

    const accessToken = localStorage.getItem('accessToken');
    const storeItemId = match.params.itemId;
    const {data: sessionData, loading} = useQuery(SessionUserDetails, { variables: { input: { accessToken } }});
    const {data: storeItemData} = useQuery(StoreItem, {variables: {input: {id: storeItemId}}});
    const [createComment] = useMutation(CreateComment);
    const {sessionContextValue, setSessionContext, clearSessionContext} = useContext(sessionContext);
    const [userContextSet, setUserContextSet] = useState(false);
    const [helperFunctionDone, setHelperFunctionDone] = useState(false);
    const [commentsToDisplay, setCommentsToDisplay] = useState([]);
    const [addCommentText, setAddCommentText] = useState("");
    const classes = useStyles();

    let textInput = useRef(null);

    useEffect(()=> PopulateSessionContext(sessionData, setSessionContext, setUserContextSet, history, setHelperFunctionDone), [sessionData]);
    useEffect(() => {
        if (storeItemData) {
            setCommentsToDisplay(storeItemData.storeItem.comments.map((commentObject) => {
                return ({
                    commenterFullName: commentObject.commenterFullName,
                    commentText: commentObject.commentText
                })
            }))
        }
    },[storeItemData]);

    const submitCommentHandler = () => {
        setTimeout(() => {
            textInput.current.value = "";
        }, 100);
        createComment({
            variables: {
                input: {
                    commenterId: sessionContextValue.userId,
                    commenterFullName: sessionContextValue.userFirstName + ' ' + sessionContextValue.userLastName,
                    storeItemId,
                    commentText: addCommentText,
                }
            }
        }).then(() => {
            const newComments = lodash.cloneDeep(commentsToDisplay);
            newComments.push({commentText: addCommentText, commenterFullName: sessionContextValue.userFirstName + ' ' + sessionContextValue.userLastName,})
            setCommentsToDisplay(newComments);
        })
    };

    return (
        <>
        {
            storeItemData && (
            <div className={classes.root}>
                <Header/>
                <div className={classes.content}>
                    <Paper className={classes.paper}>
                        <Grid container spacing={2}>
                            <Grid item>
                                <ButtonBase className={classes.image}>
                                    <img
                                        className={classes.img}
                                        alt={"image not found"}
                                        src={getImageUrl(storeItemData.storeItem.imageUrl)}
                                    />
                                </ButtonBase>
                            </Grid>
                            <Grid item xs={12} sm container>
                                <Grid item xs container direction="column" spacing={2}>
                                    <Grid item xs>
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
