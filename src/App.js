import './App.css';
import Main from './Main';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Gallery from './Gallery';
import { useState } from 'react';

function App() {
  const [images, setImages] = useState([]);
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<Main images={images} setImages={setImages}/>} />
          <Route path='/gallery' element={<Gallery images={images}/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;