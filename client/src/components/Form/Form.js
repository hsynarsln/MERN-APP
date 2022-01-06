import { Button, Paper, TextField, Typography } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { makeStyles, ThemeProvider } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: 5
    }
  },
  paper: {
    padding: 10
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  fileInput: {
    width: '97%',
    margin: '10px 0'
  },
  buttonSubmit: {
    marginBottom: 10
  }
}));

const theme = createTheme({
  spacing: [0, 4, 8, 16, 32, 64]
});

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    title: '',
    message: '',
    tags: '',
    selectedFile: ''
  });
  //! edit tuşuna bastığımız zaman formun içerisine value'ların gelmesi için
  const post = useSelector(state => (currentId ? state.postReducer.find(p => p._id === currentId) : null));
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));
  console.log(user);

  useEffect(() => {
    if (post) {
      setPostData(post);
    }
  }, [post]);

  const handleSubmit = async e => {
    e.preventDefault();

    if (!currentId) {
      dispatch(createPost({ ...postData, name: user?.result?.name }));
      clear();
    } else {
      dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
      clear();
    }
  };

  const clear = () => {
    setCurrentId(null);
    setPostData({
      title: '',
      message: '',
      tags: '',
      selectedFile: ''
    });
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant='h6' align='center'>
          Please Sign In to create your own memories and like other's memories
        </Typography>
      </Paper>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Paper className={classes.paper}>
        <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
          <Typography variant='h6'>{currentId ? 'Editing' : 'Creating'} a Memory</Typography>
          <TextField name='title' variant='outlined' label='Title' fullWidth value={postData.title} onChange={e => setPostData({ ...postData, title: e.target.value })} />
          <TextField name='message' variant='outlined' label='Message' fullWidth value={postData.message} onChange={e => setPostData({ ...postData, message: e.target.value })} />
          <TextField name='tags' variant='outlined' label='Tags' fullWidth value={postData.tags} onChange={e => setPostData({ ...postData, tags: e.target.value.split(',') })} />
          <div className={classes.fileInput}>
            <FileBase type='file' multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />
          </div>
          <Button className={classes.buttonSubmit} variant='contained' color='primary' size='large' type='submit' fullWidth>
            Submit
          </Button>
          <Button variant='contained' color='secondary' size='small' onClick={clear} fullWidth>
            Clear
          </Button>
        </form>
      </Paper>
    </ThemeProvider>
  );
};

export default Form;
