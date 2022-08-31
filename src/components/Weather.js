import Card from 'react-bootstrap/Card';
import React from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';


class Weather extends React.Component {
    render(){
        return(
            <>
<Card>
        <Card.Body>
            <Card.Text>
               <p>description:Low of {this.props.sweather.low},high of {this.props.sweather.max} with {this.props.sweather.description}  </p>
               <p>{this.props.sweather.date}</p>
            </Card.Text>
        </Card.Body>
    </Card>
        
          
            </>
        )
    }
    /*
    constructor(props) {
        super(props);
        this.state = {
            dis: "",
            date: "",
            erorrFlag:false
        }
    }



    getWeather = async (event) => {
        event.preventDefault();
        // let newURL = `${process.env.REACT_APP_URL}weather?lat=${this.state.lat}&lon=${this.state.lon}`
        try {
            let newWeather = await axios.get(this.props.nURL);
            this.setState({
                dis: newWeather.data.description,
                date: newWeather.data.date
            });
        } catch {
            this.setState({
                erorrFlag: true,
            });
        }
    };


    render() {
        return (
            <div style={{ padding: '30px', justifyContent: "center" }}>
    <Button variant="danger" type="submit" onClick={this.getWeather}>
        weather
    </Button>
    <Card>
        <Card.Body>
            <Card.Text>
                <h1>weather : {this.state.dis}</h1>
                <h1>Date : {this.state.date}</h1>
            </Card.Text>
        </Card.Body>
    </Card>
</div >
               
        );

    }
    */
}

export default Weather;
