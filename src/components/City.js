import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios";
import Weather from "./Weather";
import Row from 'react-bootstrap/Row';

import Card from 'react-bootstrap/Card';


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
          movieState:[]
        }
    }
    LookingForCity =async (e)=>{
        e.preventDefault();
        try{
        const cityName=e.target.city.value;
        const Key=process.env.REACT_APP_API_KEY;
        const URL=` https://us1.locationiq.com/v1/search?key=1dd8e75b81483f&q=${cityName}&format=json`
        
       
        const result= await axios.get(URL);
     
        const weatherUrl=`${process.env.REACT_APP_URL}weather?Latitude=${result.data[0].lat}&Longitude=${result.data[0].lon}&searchQuery=${cityName}`
       let weatherObject = await axios.get(weatherUrl);
       const movieUrl=`${process.env.REACT_APP_URL}movies?city=${cityName}`
       let moviesObj=await axios.get(movieUrl);
        //https://weather-api146.herokuapp.com
        console.log(weatherObject.data[0]);
        this.setState({
            display_name:result.data[0].display_name,
            lat:result.data[0].lat,
            long:result.data[0].lon,
            find:true,
            flag:true,
           wheatherState:weatherObject.data[0],
           movieState:moviesObj.data
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
          <img alt="hi there" src={`https://maps.locationiq.com/v3/staticmap?key=1dd8e75b81483f&center=${this.state.lat},${this.state.long}&zoom=7`}></img>}
         
      
          </div>
          <p>{this.state.display_name}</p>
          <h3>lat:{this.state.lat}</h3>
          <h3>long:{this.state.long}</h3>


<Weather sweather={this.state.wheatherState}/>

<Row xs={1} md={2} className="g-4">
        {
             
  this.state.movieState.map(item=>{

    return(
      <>
    
      <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500/${item.image_url}`} class="poster"/>
      <Card.Body>
        <Card.Title>{item.title}</Card.Title>
        <Card.Text >
        overview:{item.overview}
        </Card.Text>
      <h3 class="text-muted"style={{ fontSize: '15px' }} >total votes:{item.total_votes}</h3>
      <h3 class="text-muted"style={{ fontSize: '15px' }} >average votes:{item.average_votes}</h3>
      <h3 class="text-muted"style={{ fontSize: '15px' }} >popularity:{item.popularity}</h3>
      <h3 class="text-muted"style={{ fontSize: '15px' }} >released_on:{item.released_on}</h3>
      </Card.Body>
    </Card>
    
      </>
    )
  })

}
</Row>
          </>
          
       ) 
        }
}
export default City;