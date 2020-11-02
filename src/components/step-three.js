import React from 'react';
import Step from './step.js';
import Dropzone from 'react-dropzone-uploader'
import 'react-dropzone-uploader/dist/styles.css'



class StepThree extends React.Component {
    getUploadParams = ({ meta }) => { return { url: 'https://httpbin.org/post' } }

    handleChangeStatus = ({ meta, file }, status) => { console.log(status, meta, file) }

    handleSubmit = (files, allFiles) => {
        this.props.history.push('/property-list')
        allFiles.forEach(f => f.remove())
    }
    
    formDetails = () => {
        return (
            <div className="page">
                <div className="title">Upload Images</div>
                <div className="field">
                    <Dropzone
                        getUploadParams={this.getUploadParams}
                        onChangeStatus={this.handleChangeStatus}
                        onSubmit={this.handleSubmit}
                        accept="image/*,audio/*,video/*"
                    />
                </div>
                <div className="field btns">
                    <button className="prev-2 prev">Previous</button>
                    <button className="next-2 next">Next</button>
                </div>
            </div>  
        )
    }
    
    render() {
        console.log(this.props);
        return (
            <> 
               <Step heading={"Upload Images"} formDetails={this.formDetails()} stepValue={3}/>
            </>
        )
    }
}

export default StepThree