import React, {useContext} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from '@material-ui/core/Grid';
import Avatar from "@material-ui/core/Avatar";
import {userInitials} from "../utils/stringMethods";
import {deepOrange} from "@material-ui/core/colors";

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
    },
    orange: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
        size: ''
    },
}));

const ChatLayout = ({commenterName, commentText, commenterImageUrl}) => {
    const classes = useStyles();

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
                              : <Avatar src={commenterImageUrl} alt={commenterImageUrl} />
                        }
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
