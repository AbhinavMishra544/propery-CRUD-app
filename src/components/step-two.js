import React from 'react';
import Step from './step.js';
import { Link } from 'react-router-dom';
import axios from 'axios';

class StepTwo extends React.Component {
    constructor(props) {
		super(props);
		this.state = {
            address:"",
			bedroom: "",
			bathroom: "",
            description: "",
            error:"",
            loading : false
		}
    }
    onChangeHandler = (e) => {
		const { name, value } = e.target;
		let state = this.state;
        state[name] = value
        console.log(name, value,"name, value");
    }

    addProperty = (propertyDetails) => {
        axios({
            method: 'POST',
            url: 'http://localhost:3000/addproperty',
            headers: {
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',   
            }
        })
        .then((res) => {
            console.log(res,"res------------");
            if(res.status == 200){
                this.props.history.push(`/step-three`);
            }
        }).
        catch((error)=>{
            console.log(error,"error---------------");
        });
    }
    
    submitValue = (e) => {
        console.log("submit clicled");
        this.setState({
            loading : true
        })
        e.preventDefault();
        if(this.state.address && this.state.bathroom && this.state.bedroom){
            const reqBody = {
                address : this.state.address,
                description : this.state.description
            };
            if(this.state.bathroom.length > 0 && this.state.bathroom.length <= 5){
                reqBody["bathroom"] = this.state.bathroom;
                this.setState({
                    error: ""
                })
            } else{
                this.setState({
                    error: "bathroom maximum character limit is 5",
                    loading : false
                }) 
            }
            if(this.state.bedroom.length > 0 && this.state.bedroom.length <= 10){
                reqBody["bathroom"] = this.state.bedroom;
                this.setState({
                    error: ""
                }) 
            } else {
                this.setState({
                    error: "bedrooom maximum character limit is 10",
                    loading : false
                }) 
            }
            if(!this.state.error){
                this.addProperty()
                // this.props.history.push(`/step-three`);
            }
        } else{
            console.log("else");
            this.setState({
                error:"Please fill out required(*) fields",
                loading : false
            })
        }
        if(!!this.state.error){
            console.log(this.state.error,"last if");
            this.props.history.push(`/step-three`);
        }
        
    }
    formDetails = ( ) => {
        return (
            <div className="page">
                <div className="title">Contact Info:</div>
                <div className="field">
                    <div className="label">Address  <span style={{"color":"red"}}>*</span></div>
                    <input type="text" name="address" onChange = { this.onChangeHandler } id="address" required/>
                </div>
                <div className="field">
                    <div className="label">BedRoom <span style={{"color":"red"}}>*</span></div>
                    <input type="Number" maxLength="10" name="bedroom" onChange = { this.onChangeHandler }  id="bedroom" required/>
                </div>
                <div className="field">
                    <div className="label">BathRoom <span style={{"color":"red"}}>*</span></div>
                    <input type="Number" name="bathroom" maxength="5" onChange = { this.onChangeHandler }  id="bathroom" required/>
                </div>
                <div className="field">
                    <div className="label">Description of property</div>
                    <textarea id="property-description" name="description" onChange = { this.onChangeHandler } ></textarea>
                </div>
                <span style={{color : "red"}}>{this.state.error ? this.state.error : ""}</span>
                <div className="field btns">
                    <Link to={{ 
                        "pathname": "/step-three", 
                        "state":  {"d":"1","c":"w"}
                        }}
                    >
                        <button className="next-1 next" onClick={(e) => this.submitValue(e)}>Submit</button>
                    </Link>  
                </div>
            </div>  
        )
    }
    render() {
        return (
            <> 
               <Step heading={"Fill Form Details"} formDetails={this.formDetails( )}  loading = {this.state.loading} stepValue={2}/>
            </>
        )
    }
}

export default StepTwo