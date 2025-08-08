
import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";

const Navbar = ()=>{

  return(
    <>
    <section>
      <div>
        <img src={Logo} alt="Nexxa Logo" />

      </div>
      <div>
        <Link href="">Solutions</Link>
        <Link href="">Products</Link>
        <Link href="">Categories</Link>
        <Link href="">About us</Link>
        
      </div>
      
      <div>
        
      </div>
      
    </section>
    
    </>
  )
}

export default Navbar;