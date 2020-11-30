import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Input from "./controls/Input";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import Header from './Header';

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

export default function Single() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Header/>
            <div className={classes.content}>
                <Paper className={classes.paper}>
                    <Grid container spacing={2}>
                        <Grid item>
                            <ButtonBase className={classes.image}>
                                <img className={classes.img} alt="complex" src="https://us.123rf.com/450wm/sudowoodo/sudowoodo1712/sudowoodo171200018/90904858-stock-vector-sports-water-bottle-icon-blue-plastic-bottle-in-flat-cartoon-style-with-drops-of-water-.jpg?ver=6" />
                            </ButtonBase>
                        </Grid>
                        <Grid item xs={12} sm container>
                            <Grid item xs container direction="column" spacing={2}>
                                <Grid item xs>
                                    <Typography variant="subtitle1">
                                        Comments
                                    </Typography>
                                    <Paper style={{maxHeight: 400, minHeight: 400, maxWidth:600, minWidth:600, overflow: 'auto'}}>
                                        {/*    list of comments here*/}
                                    </Paper>
                                </Grid>
                                <Grid item>
                                    <Input label="add comment" variant="standard" fullWidth />
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
    );
}