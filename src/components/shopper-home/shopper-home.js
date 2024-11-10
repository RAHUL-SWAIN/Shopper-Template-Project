import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";



export function ShopperHome(){
    const [cookies , setCookies , removeCookies ] = useCookies();
    const navigate = useNavigate();
    useEffect(()=>{
        if(cookies["userid"]==undefined){
            navigate("/login");
        }
    },[]);
    function SignoutClick(){
        removeCookies("userid");
        navigate("/login")
    }
    
    return(
        <div className="container-fluid d-flex justify-content-between">
         
         <div>   
          <div className="d-flex justify-content-between">
            <div>
                <img src="electronics.jpg" style={{width:'200px' , height:'300px'}} />
            </div>
            <div>
                <img src="mens.jpg" style={{width:'200px' , height:'300px'}} />
            </div>
            <div>
                <img src="women.jpg" style={{width:'200px' , height:'300px'}} />
            </div>
            <div>
                <img src="jewelery.jpg" style={{width:'200px' , height:'300px'}} />
            </div>
           </div>
         </div> 
            
            <div>
                <h4>Hello ! - {cookies["userid"]}</h4>


                <button onClick={SignoutClick}>Sign Out</button>
               
            </div>
        </div>
    );
}