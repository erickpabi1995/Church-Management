
import { Outlet } from "react-router-dom";
import Navbar from "../../components/Layout/Navbar";

const Homepage = () => {
    return(
      <>
        <div className="grid-container">
          <p></p>
<div className="main-content">
  <Navbar/>
  <div className="divider"></div>
 <Outlet/>
      </div>
    </div>
    
      </>
      
  );
        
       
    
}

export default Homepage