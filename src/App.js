import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Stock from './components/Stock';
import About from './components/About';
import Menu from './components/Menu';

function App() {
  return (
    <Router>
      <div className='App'>
        <header>
          <h2>Store System</h2>
          <Menu />
        </header>

        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/stock" element={<Stock />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
