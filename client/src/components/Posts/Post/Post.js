import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography } from '@mui/material';
import moment from 'moment';
import React from 'react';
import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../../../actions/posts';
import { useStyles } from './styles';

const Post = ({ post, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));

  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find(like => like === (user?.result?.googleId || user?.result?._id)) ? (
        <>
          <FavoriteIcon fontSize='small' />
          &nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}`}
        </>
      ) : (
        <>
          <FavoriteBorderIcon fontSize='small' />
          &nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}
        </>
      );
    }

    return (
      <>
        <FavoriteBorderIcon fontSize='small' />
        &nbsp;Like
      </>
    );
  };

  return (
    <>
      <Card sx={{ maxWidth: 345 }} className={classes.card}>
        <CardHeader
          action={
            (user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
              <IconButton aria-label='settings' onClick={() => setCurrentId(post._id)}>
                <MoreHorizIcon />
              </IconButton>
            )
          }
          title={post.name}
          subheader={moment(post.createdAt).fromNow()}
        />
        {/* //! moment --> example; 5 seconds ago, 5 minutes ago gibi */}
        <CardMedia className={classes.media} image={post.selectedFile} title={post.title}></CardMedia>
        <CardContent>
          <Typography variant='body2' color='text.secondary'>
            {post.tags.map(tag => `#${tag}`)}
          </Typography>
        </CardContent>
        <Typography className={classes.title} variant='h6' gutterBottom>
          {post.title}
        </Typography>
        <CardContent>
          <Typography variant='body2' color='textSecondary' component='p' gutterBottom>
            {post.message}
          </Typography>
        </CardContent>
        <CardActions className={classes.cardActions} disableSpacing>
          <IconButton style={{ fontSize: '0.8em' }} size='small' color='error' disabled={!user?.result} onClick={() => dispatch(likePost(post._id))} aria-label='add to favorites'>
            <Likes />
          </IconButton>
          {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
            <IconButton style={{ fontSize: '0.8em' }} size='small' color='info' onClick={() => dispatch(deletePost(post._id))} aria-label='share'>
              <DeleteIcon fontSize='small' />
              &nbsp; DELETE &nbsp;
            </IconButton>
          )}
        </CardActions>
      </Card>
    </>
  );
};

export default Post;
