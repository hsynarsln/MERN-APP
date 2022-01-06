import { purple } from '@mui/material/colors';
import { makeStyles } from '@mui/styles';

export default makeStyles(() => ({
  appBar: {
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 50px'
  },
  heading: {
    color: 'rgba(0,183,255, 1)',
    textDecoration: 'none'
  },
  image: {
    marginLeft: '15px'
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '290px'
  },
  profile: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '400px'
  },
  userName: {
    display: 'flex',
    alignItems: 'center'
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  purple: {
    color: '#fff',
    backgroundColor: purple[500]
  }
}));
