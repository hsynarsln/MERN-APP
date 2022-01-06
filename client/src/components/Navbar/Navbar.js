import { AppBar, Avatar, Button, Toolbar, Typography } from '@mui/material';
import jwt_decode from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LOGOUT } from '../../actions/actionTypes';
import memories from '../../images/memories.png';
import useStyles from './styles';

const Navbar = () => {
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //! location kullanmamızın sebebi sayfa değiştiği zaman yani home sayfasına navigate olduğumuzda setUser içerisine user'ı yerleştiriyor. useEffect'e dependency olarak atıyoruz.
  const location = useLocation();

  // console.log(user);

  useEffect(() => {
    const token = user?.token;

    //! JWT token expired
    if (token) {
      const decodedToken = jwt_decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logout();
      }
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  const logout = () => {
    dispatch({ type: LOGOUT });

    navigate('/');

    setUser(null);
  };

  return (
    <AppBar position='static' className={classes.appBar} color='inherit'>
      <div className={classes.brandContainer}>
        <Typography component={Link} to='/' className={classes.heading} variant='h2' align='center'>
          Memories
        </Typography>
        <img className={classes.image} src={memories} alt='memories' height='60' />
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>
              {user.result.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant='h6'>
              {user.result.name}
            </Typography>
            <Button variant='contained' className={classes.logout} color='secondary' onClick={logout}>
              Logout
            </Button>
          </div>
        ) : (
          <Button component={Link} to='/auth' variant='contained' color='primary'>
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
