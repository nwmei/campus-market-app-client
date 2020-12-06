import React, {useContext} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from '@material-ui/core/Grid';
import Avatar from "@material-ui/core/Avatar";
import {sessionContext} from "./SessionContext";

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
        border: "0.5px solid black",
        borderRadius: "10px",
        margin: "5px",
        padding: "10px",
        display: "inline-block"
    }
}));

const ChatLayout = ({commenterName, commentText, commenterImageUrl}) => {
    const classes = useStyles();
    const {sessionContextValue, setSessionContext, clearSessionContext} = useContext(sessionContext);

    return (
        <div className={classes.container}>
            <div className={`${classes.bubbleContainer}`}>
                <Grid container>
                    <Grid item >
                        <Avatar  src={sessionContextValue.imageUrl} alt={sessionContextValue.imageUrl} />
                    </Grid>
                    <Grid item >
                        <div className={classes.bubble}>
                            {commenterName + ': ' + commentText}
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
};

export default ChatLayout;
