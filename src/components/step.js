import React from 'react';
import {StepProgress} from './step-progress.js';

class Step extends React.Component {
    render() {
        return (
            <>  
                <header>{this.props.heading}</header>
                <StepProgress stepValue={this.props.stepValue}/>
                <div className="form-outer">
                        <form action="#">
                            {this.props.formDetails}
                        </form>
                </div>
            </>
        )
    }
}

export default Step