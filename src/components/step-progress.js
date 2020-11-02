export const  StepProgress = ({stepValue}) => (
    
    <div className="progress-bar">
        <div className="step">
            <p>Add Property</p>
            <div className={stepValue > 1 ? "bullet active" : "bullet"}>
                <span>1</span>
            </div>
            <div className={stepValue > 1 ? "check fas fa-check active" : "check fas fa-check"}></div>
        </div>
        <div className="step">
            <p>Contact</p>
            <div className={stepValue > 2 ? "bullet active" : "bullet"}>
                <span>2</span>
            </div>
            <div className={stepValue > 2 ? "check fas fa-check active" : "check fas fa-check"}></div>
        </div>
        <div className="step">
            <p>Birth</p>
            <div className={stepValue > 3 ? "bullet active" : "bullet"}>
                <span>3</span>
            </div>
            <div className={stepValue > 3 ? "check fas fa-check active" : "check fas fa-check"}></div>
        </div>
    </div>
)
