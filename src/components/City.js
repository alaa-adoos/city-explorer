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
          find:false
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
            find:true
        })
       
}


catch{
   console.log("error"); 
}
    }

    render(){
        return(
<>
            <Form onSubmit={this.LookingForCity}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Enter yout city</Form.Label>
              <Form.Control type="text" placeholder="lets go" name="city" />
            </Form.Group>
      
            <Button variant="primary" type="submit">
              explore!
            </Button>
          </Form>
          {this.state.find &&
          <h1>we find the city that you are looking for!</h1>}
          
          <p>{this.state.display_name}</p>
          <h3>lat:{this.state.lat}</h3>
          <h3>long:{this.state.long}</h3>
   
          </>
        )
    }
}
export default City;