import { CircularProgress, Grid } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import React from 'react';
import { useSelector } from 'react-redux';
import Post from './Post/Post';

const useStyles = makeStyles(theme =>
  createStyles({
    mainContainer: {
      display: 'flex',
      alignItems: 'center'
    },
    smMargin: {
      margin: 10
    },
    actionDiv: {
      textAlign: 'center'
    }
  })
);

// const theme = createTheme();

const Posts = ({ setCurrentId }) => {
  const classes = useStyles();

  const posts = useSelector(state => state.postReducer);
  // console.log(posts);

  return (
    // <ThemeProvider theme={theme}>
    //   <h1>Posts</h1>
    //   <Post />
    // </ThemeProvider>
    !posts.length ? (
      <CircularProgress />
    ) : (
      <Grid className={classes.container} container alignItems='stretch' spacing={3}>
        {posts.map(post => (
          <Grid key={post._id} item xs={12} sm={6}>
            <Post post={post} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default Posts;
