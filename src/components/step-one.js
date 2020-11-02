import React from 'react';
import Step from './step.js';
import { Link } from 'react-router-dom';
import { CSVReader } from 'react-papaparse'
 
const buttonRef = React.createRef()
class StepOne extends React.Component {
    constructor(props) {
		super(props);
		this.state = {
            address:"",
			bedroom: "",
			bathroom: "",
            description: "",
            error:"",
            loading : false,
            stepOneLoaded: true
		}
    }
    onChangeHandler = (e) => {
		const { name, value } = e.target;
		let state = this.state;
        state[name] = value
        this.setState({...state})
        console.log(name, value,"name, value");
    }
    
    submitValue = (e) => {
        console.log("submit clicled");
        const { name, value } = e.target;
        if(name == 'addfromscratch') {
            this.setState({
                stepOneLoaded: false
            })
        } else {
            this.setState({
                loading : true
            })
            e.preventDefault();
            if(this.state.address && this.state.bathroom && this.state.bedroom){
                let pattern = /^\d+$/;
                if(pattern.test(this.state.bathroom + this.state.bedroom)) {
                    if(this.state.bathroom.length > 0 && this.state.bathroom.length <= 5){
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
                        this.setState({
                            error: ""
                        }) 
                    } else {
                        this.setState({
                            error: "bedrooom maximum character limit is 10",
                            loading : false
                        }) 
                    }
                    if(this.state.error == ''){
                        console.log(this.state.error,"last if");
                        this.props.history.push(`/step-three`);
                    }
                    } else{
                    this.setState({
                        error:"bathroom and bedroom accepts numeric values",
                        loading : false
                    }) 
                }
            } else{
                console.log("else");
                this.setState({
                    error:"Please fill out required(*) fields",
                    loading : false
                })
            }
            
        }
        
    }
    handleGoBack = (e) => {
       this.setState({
        stepOneLoaded : true
       }) 
    }
    renderStepTwo = ( ) => {
        return (
            <> {console.log(this.state,"statwe step two ")}
            <div className="page">
            <button style={{"backgroundColor":"#d33f8d"}} onClick={(e) => this.handleGoBack(e)}><i className="fas fa-long-arrow-alt-left">&nbsp;Go Back</i></button>
                <div className="title">Contact Info:</div>
                <div className="field">
                    <div className="label">Address  <span style={{"color":"red"}}>*</span></div>
                    <input type="text" name="address" value={this.state.address} onChange = { this.onChangeHandler } id="address" required/>
                </div>
                <div className="field">
                    <div className="label">BedRoom <span style={{"color":"red"}}>*</span></div>
                    <input type="Number" maxLength="10" value={this.state.bedroom} name="bedroom" onChange = { this.onChangeHandler }  id="bedroom" required/>
                </div>
                <div className="field">
                    <div className="label">BathRoom <span style={{"color":"red"}}>*</span></div>
                    <input type="Number" name="bathroom" value={this.state.bathroom} maxength="5" onChange = { this.onChangeHandler }  id="bathroom" required/>
                </div>
                <div className="field">
                    <div className="label">Description of property</div>
                    <textarea id="property-description" value={this.state.description} name="description" onChange = { this.onChangeHandler } ></textarea>
                </div>
                <span style={{color : "red"}}>{this.state.error ? this.state.error : ""}</span>
                <div className="field btns">
                    <Link to={{ 
                        "pathname": "/step-three", 
                        "state":  {"d":"1","c":"w"}
                     }}
                    >
                        <button className="next" onClick={(e) => this.submitValue(e)}>Submit</button>
                    </Link>  
                </div>
            </div>  
        </>
        )
    }

    renderStepOne = () => {
        return (
            <div className="page slide-page">
                <div className="title"> Choose Action : </div>
                <div className="field">
                    <div className="label">Add From Scratch</div>
                    <button type="button" name="addfromscratch" onClick={(e) => this.submitValue(e)} id="add-from-scratch" className="my-btn">Add From Scratch</button>
                </div>
                
                <div style={{"margin":"0px 45px"}}>
                    <div className="label" style={{"textAlign": "left","fontWeight":"500","marginLeft": "37px","marginBottom":"2px"}}>Upload As CSV</div>
                    <CSVReader
                        ref={buttonRef}
                        onFileLoad={this.handleOnFileLoad}
                        onError={this.handleOnError}
                        noClick
                        noDrag
                        onRemoveFile={this.handleOnRemoveFile}
                    >
                    {({ file }) => (
                    <aside
                        style={{
                        display: 'flex',
                        flexDirection: 'row',
                        marginBottom: 10
                        }}
                    >
                    <button
                    type='button'
                    onClick={this.handleOpenDialog}
                    style={{
                        borderRadius: 0,
                        marginLeft: "2.5rem",
                        marginRight: 0,
                        width: '100%',
                        paddingLeft: 0,
                        paddingRight: 0,
                        backgroundColor:"#d33f8d",
                        color :"white"
                    }}
                    >
                    Browe file
                    </button>
                    <div
                    style={{
                        borderWidth: 1,
                        borderStyle: 'solid',
                        borderColor: '#ccc',
                        height: 45,
                        lineHeight: 2.5,
                        marginTop: 5,
                        marginBottom: 5,
                        paddingLeft: 13,
                        paddingTop: 3,
                        width: '60%'
                    }}
                    >
                    {file && file.name}
                    </div>
                    <button
                    style={{
                        borderRadius: 0,
                        marginLeft: 0,
                        marginRight: "2.4rem",
                        paddingLeft: 20,
                        paddingRight: 20,
                        backgroundColor:"#d33f8d",
                        color: "white"
                    }}
                    onClick={this.handleRemoveFile}
                    >
                    Remove
                    </button>
                </aside>
                )}
            </CSVReader>
                </div>
                
            </div>  
        )
    }

    // csv reader related functions
    handleOpenDialog = (e) => {
        // Note that the ref is set async, so it might be null at some point
        if (buttonRef.current) {
          buttonRef.current.open(e)
        }
      }
     
      handleOnFileLoad = (data) => {
        console.log('redaing ---------------------------')
        console.log(data)
        console.log('---------------------------')
          if(data){
            const csvIndexOneData = data[1] && data[1].data && data[1].data.slice(1,5);
            console.log(csvIndexOneData,"csvIndexOneData");
            let pattern = /^\d+$/;
            if(!pattern.test((csvIndexOneData && csvIndexOneData[1]) + (csvIndexOneData && csvIndexOneData[2]))) {
                this.setState({
                    error:"bathroom and bedroom values cannot be empty",
                    address : csvIndexOneData && csvIndexOneData[0],
                    description : csvIndexOneData && csvIndexOneData[3],
                    stepOneLoaded : false,
                    loading : false
                }) 
            }
            else{
                this.setState({
                    address : csvIndexOneData && csvIndexOneData[0],
                    bedroom : csvIndexOneData && csvIndexOneData[1],
                    bathroom : csvIndexOneData && csvIndexOneData[2],
                    description : csvIndexOneData && csvIndexOneData[3],
                    stepOneLoaded : false
                });
            }
          }
      }
     
      handleOnError = (err, file, inputElem, reason) => {
        console.log(err)
      }
     
      handleOnRemoveFile = (data) => {
        console.log('---------------------------')
        console.log(data)
        console.log('---------------------------')
      }
     
      handleRemoveFile = (e) => {
        if (buttonRef.current) {
          buttonRef.current.removeFile(e)
        }
      }

    //csv functions ended
    render() {
        return (
            <>  
                {this.state.stepOneLoaded ?
                        <Step 
                            heading={"Add Property Form"} 
                            formDetails={this.renderStepOne()}
                        />
                        :
                        <Step heading={"Fill Form Details"} formDetails={this.renderStepTwo()}  loading = {this.state.loading} stepValue={2}/>
                }
                
                
            </>
        )
    }
}

export default StepOne