import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios";


class City extends React.Component{
    constructor(props){
        super(props);
        this.state={
          display_name:'',
          lat:'',
          long:' ' ,
          find:false,
          flag:false

        }
    }
    LookingForCity =async (e)=>{
        e.preventDefault();
        const cityName=e.target.city.value;
        const Key='pk.0b303c30bbc00eb6cbd73e2dba4d22a5';
        const URL=` https://us1.locationiq.com/v1/search?key=${Key}&q=${cityName}&format=json`
        try{
        const result= await axios.get(URL);

        this.setState({
            display_name:result.data[0].display_name,
            lat:result.data[0].lat,
            long:result.data[0].lon,
            find:true,
            flag:true
        })
       
}


catch{
   console.log("error"); 
}
    }

    render(){
        return(
<><div class="w-25 p-3">
            <Form onSubmit={this.LookingForCity}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Enter yout city</Form.Label>
              <Form.Control type="text" placeholder="lets go" name="city" class="mb-3"/>
            </Form.Group>
      
            <Button variant="primary" type="submit">
              explore!
            </Button>
          </Form>
          {this.state.find &&
          <h1>We find it ✌️✌️</h1>}
          {this.state.flag &&
          <img alt="hi" src={`https://maps.locationiq.com/v3/staticmap?key=pk.0b303c30bbc00eb6cbd73e2dba4d22a5&center=${this.state.lat},${this.state.long}&zoom=7`}></img>}
          
          <p>{this.state.display_name}</p>
          <h3>lat:{this.state.lat}</h3>
          <h3>long:{this.state.long}</h3>
          </div>

   
          </>
        )
    }
}
export default City;