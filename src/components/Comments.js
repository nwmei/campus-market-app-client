import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const Comments = ({commentsList}) => {
    return (
        <>
            <Typography variant="subtitle1">
                Comments
            </Typography>
            <Paper style={{maxHeight: 400, minHeight: 400, maxWidth:600, minWidth:600, overflow: 'auto'}} >
                {commentsList.map((comment, key) => {
                    return (<p key={key}>{comment.commenterFullName + ': ' + comment.commentText}</p>)
                })}
            </Paper>
        </>
    )
}

export default Comments;
