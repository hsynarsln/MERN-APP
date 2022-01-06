import Container from '@mui/material/Container';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Auth from './components/Auth/Auth';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <Router>
      <Container maxWidth='lg'>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/auth' element={<Auth />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
