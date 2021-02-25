import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CommentUnit from './CommentUnit';

const Comments = ({commentsList, refetch}) => {
    return (
        <>
            <Typography variant="h4">
                Comments
            </Typography>
            <Paper style={{maxHeight: 400, minHeight: 400, overflow: 'auto'}} >
                {[...commentsList].reverse().map((comment, key) => {
                    return (
                      <CommentUnit key={key}
                                   itemId={comment.itemId}
                                   commentId={comment.commentId}
                                   commenterId={comment.commenterId}
                                   commentText={comment.commentText}
                                   commenterName={comment.commenterFullName}
                                   commenterImageUrl={comment.commenterImageUrl}
                                   refetch={refetch}
                      />
                    )
                })}
            </Paper>
        </>
    )
}

export default Comments;
