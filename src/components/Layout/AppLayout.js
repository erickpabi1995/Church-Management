import { Route, Routes } from "react-router-dom";
import LeadCapture from "../../Views/LeadCapture/LeadCapture";
import Login from "../Auth/login/Login";
import Homepage from "../../Views/Homepage/Homepage";

const AppLayout = () => {
    return(
<Routes>
    

<Route  path={"/"} element={<Login/>}>
                  
                  </Route>
                <Route path={"/app/"} element={<Homepage/>}>
          <Route path="leadCapture" element={<LeadCapture/>} />
         </Route>
          
        </Routes>  
    )
}

export default AppLayout 