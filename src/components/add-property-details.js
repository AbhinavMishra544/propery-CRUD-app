import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { StepProgress } from './step-progress';
import StepOne from './step-one.js';
import StepTwo from './step-two.js';
import StepThree from './step-three.js';
import PropertyList from './list-property';
class AddPropertyDetails extends React.Component {
    render() {
        return (
            <>
                <div className="container">
                    <Switch>
                        <Route exact path="/" component={StepOne} />
                        <Route exact path="/step-two" component={StepTwo} />
                        <Route exact path="/step-three" component={StepThree} />
                        <Route exact path="/property-list" component={PropertyList} />
                    </Switch>
                    {/* <StepThree/> */}
                </div>
                
                </>
        )
    }
}

export default AddPropertyDetails