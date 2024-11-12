
import './App.css';

import { BrowserRouter, Routes, Route } from  'react-router-dom'
import Home from './Home/home';
import Initial from  './Home/initial';
import ChiTiet from './Home/chi_tiet';
import Post from './Home/post';
function App() {
  
  
  return (

    <BrowserRouter>
      < Routes>
        <Route path='/home' exact element={<Home />} />
        <Route path='/chi_tiet/:id' exact element={<ChiTiet />} />
        <Route path='/post' exact element={<Post />} />
        <Route path='/initial' exact element={<Initial />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
