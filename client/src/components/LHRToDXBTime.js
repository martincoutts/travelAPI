import React from "react";

const LHRToDXBTime = props => {
  console.log(props);

  return (
    <div>
      <h2>Average Flight Time:</h2>
      <h4>LHR - DXB</h4>

      {`${props.averageTimeLHRtoDXB.hours} hours ${props.averageTimeLHRtoDXB.mins} minutes`}
    </div>
  );
};

export default LHRToDXBTime;
