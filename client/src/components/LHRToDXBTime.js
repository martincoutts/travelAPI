import React from "react";

const LHRToDXBTime = props => {
  return (
    <div className="info-card" id="lhr-dxb-time">
      <h2>Average Flight Time</h2>
      <h4>LHR - DXB</h4>

      <span>{`${props.averageTimeLHRtoDXB.hours} hours ${props.averageTimeLHRtoDXB.mins} minutes`}</span>
    </div>
  );
};

export default LHRToDXBTime;
