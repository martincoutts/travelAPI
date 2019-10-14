import React from "react";

const CarriersList = props => {
  const topTenCarriers = props.sliceArr(props.carriersList, 10);

  return (
    <div className="info-card" id="carriers-list">
      <h2>Most Popular Carriers</h2>
      <ol>
        {topTenCarriers.map((carrier, index) => {
          return <li key={index + 1}>{carrier}</li>;
        })}
      </ol>
    </div>
  );
};

export default CarriersList;
