import React, {useContext, useEffect, useState} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from '@material-ui/core/Grid';
import Avatar from "@material-ui/core/Avatar";
import {userInitials} from "../utils/stringMethods";
import {deepOrange} from "@material-ui/core/colors";
import CloseIcon from '@material-ui/icons/Close';
import Typography from "@material-ui/core/Typography";
import MuiLink from "@material-ui/core/Link";
import {sessionContext} from "./SessionContext";
import DeleteComment from '../mutations/DeleteComment.graphql';
import {useMutation} from "@apollo/client";
import AreYouSure from "./AreYouSure";


const useStyles = makeStyles(theme => ({
    container: {
        bottom: 0
        // position: "fixed" // remove this so we can apply flex design
    },
    bubbleContainer: {
        width: "100%",
        display: "flex" //new added flex so we can put div at left and right side
        //check style.css for left and right classnaeme based on your data
    },
    bubble: {
        border: "0.5px solid lightgray",
        borderRadius: "10px",
        margin: "5px",
        padding: "5px",
        display: "inline-block"
    },
    orange: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
        size: '',
        marginTop: "8px",
        width: theme.spacing(4),
        height: theme.spacing(4),
    },
    // deleteComment: {
    //     paddingTop: 10
    // }
}));

const ChatLayout = ({itemId, commentId, commenterId, commenterName, commentText, commenterImageUrl, refetch}) => {
    const classes = useStyles();
    const {sessionContextValue} = useContext(sessionContext);
    const [deleteComment, {data}] = useMutation(DeleteComment);
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);

    useEffect(() => {
        if (data) {
            refetch();
        }
    }, [data]);

    const deleteHandler = () => {
        setConfirmModalOpen(true);
    };

    const deleteConfirm = () => {
        deleteComment({
            variables: {
                input: {
                    itemId,
                    commentId
                }
            }
        }).then(setConfirmModalOpen(false))
    };

    return (
      <div className={classes.container}>
          <div className={`${classes.bubbleContainer}`}>
              <Grid container>
                  <Grid item>
                      {
                          commenterImageUrl === 'not available'
                            ? <Avatar className={classes.orange}>{
                                userInitials(commenterName.split(' ').slice(0, -1).join(' '),
                                  commenterName.split(' ').slice(-1).join(' '))}
                            </Avatar>
                            : <Avatar className={classes.orange} src={commenterImageUrl} alt={commenterImageUrl} />
                      }
                  </Grid>
                  <Grid item xs={11} style={{ display: "flex", alignItems: "center" }}>
                      <div className={classes.bubble}>
                          <Typography variant="subtitle2">
                              {commenterName + ': ' + commentText}

                          </Typography>
                      </div>
                      {
                          commenterId === sessionContextValue.userId &&
                          <MuiLink color="initial" onClick={deleteHandler}>
                              <CloseIcon />
                          </MuiLink>
                      }
                  </Grid>
              </Grid>
          </div>
          <AreYouSure isOpen={confirmModalOpen} onClose={() => {setConfirmModalOpen(false)}} deleteHandler={deleteConfirm} />
      </div>
    )
};

export default ChatLayout;
