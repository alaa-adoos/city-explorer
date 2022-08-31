import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios";
import Weather from "./Weather";

class City extends React.Component{
    constructor(props){
        super(props);
        this.state={
          display_name:'',
          lat:'',
          long:' ' ,
          find:false,
          flag:false,
          wheatherState: {},
        }
    }
    LookingForCity =async (e)=>{
        e.preventDefault();
        try{
        const cityName=e.target.city.value;
        const Key=process.env.REACT_APP_API_KEY;
        const URL=` https://us1.locationiq.com/v1/search?key=${Key}&q=${cityName}&format=json`
        
       
        const result= await axios.get(URL);
        const weatherUrl=`https://weather-api146.herokuapp.com/weather?Latitude=${result.data[0].lat}&Longitude=${result.data[0].lon}&searchQuery=${cityName}`
        let weatherObject = await axios.get(weatherUrl);
        console.log(weatherObject.data[0]);
        this.setState({
            display_name:result.data[0].display_name,
            lat:result.data[0].lat,
            long:result.data[0].lon,
            find:true,
            flag:true,
           wheatherState:weatherObject.data[0]
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
          <img alt="hi there" src={`https://maps.locationiq.com/v3/staticmap?key=pk.0b303c30bbc00eb6cbd73e2dba4d22a5&center=${this.state.lat},${this.state.long}&zoom=7`}></img>}
          
          <p>{this.state.display_name}</p>
          <h3>lat:{this.state.lat}</h3>
          <h3>long:{this.state.long}</h3>
          <Weather sweather={this.state.wheatherState}/>
          </div>

   
          </>
        )
    }
}
export default City;