import React, {Component} from "react";
import Stripe from "./Stripe";
import Paypal from "./Paypal";

export default function Payment(){
    return ( 
      <div style ={{width: "400px"}}> 
        <Stripe/>
        <Paypal/> 
      </div>
    );
} 

Payment.displayName = "Payment"; 