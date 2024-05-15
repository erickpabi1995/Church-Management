
import './App.css';
import React from "react";
import { BrowserRouter, } from "react-router-dom";

import AppLayout from './components/Layout/AppLayout';


function App() {
 
 
  return (
    <div className="App">
        <BrowserRouter>
       
        
 
                 <AppLayout/>
                    
                    
                
        </BrowserRouter>
  

    </div>
  );
}

export default App;
