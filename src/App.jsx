import React, { useEffect } from 'react';
import Read from './Read';
import {BrowserRouter,Routes,Route} from 'react-router'
import Show from './Show';
import axios from 'axios';

const App = () => {
    useEffect(()=>{
        axios.delete('https://ooredooback.onrender.com/delete')
        .then(res=>console.log(res))
        .catch(e=>console.log(e))
    },[])
    return (
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<Read />}/>
      <Route path="/show" element={<Show />}/>
      </Routes>
      </BrowserRouter>
    );
}

export default App;
