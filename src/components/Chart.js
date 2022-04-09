import React, { useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import CanvasJSReact from "./canvasjs.react";
import { data } from "../data";
import SmallCanvas from "./SmallCanvas";
import "./style.css";

var CanvasJSChart = CanvasJSReact.CanvasJSChart;
function Chart() {
  const [date, setDate] = useState("2021-05-26");
  let arrayOfDate = getItemDates(data);
  let { count, fulldata } = conSizeData(data, date);
  let countedData = counting(count);

  let example = "";

  var chart = useRef();

  // The initial values animate, as expected
  const [dataPoints, setDataPoints] = useState();

  const [title, setTitle] = useState("Customer Scheduling Pattern");

  const [initialized, setInitialized] = useState(false);
  const options = {
    animationEnabled: true,
    //exportEnabled: true,
    theme: "light2", //"light1", "dark1", "dark2"
    title: {
      text: title,
    },
    data: [
      {
        type: "column",
        dataPoints: countedData,
      },
    ],
  };

  let lastDate = parseInt(date.slice(8));
 
  let smallCanvasDate = [lastDate - 1, lastDate - 2, lastDate - 3];

  const containerProps = {
    height: "calc(100vh - 150px)",
  };
  const handleChange =(e) =>{
    e.preventDefault();
    // console.log(e.target.value);
    setDate(e.target.value);
  }
  return (
    <div className="App">
      <div>
        <div className="date-widget">
    
          <input type="date" 
          onChange={(e) => {
            
            handleChange(e)
          }}
          />
        </div>
        <h1 className="dateDisplay">{date}</h1>
      </div>
      <div>
        <CanvasJSChart
          containerProps={containerProps}
          options={options}
          onRef={(ref) => (chart.current = ref)}
        />
      </div>
      <div>
    <br />
      <div className="smallCanvas">
      
        <div className="cas1">
        
          <SmallCanvas data={fulldata} date={smallCanvasDate[0]} />
        </div>
        <div className="cas2">
          <SmallCanvas data={fulldata} date={smallCanvasDate[1]} />
        </div>
        <div className="cas3">
        <SmallCanvas data={fulldata} date={smallCanvasDate[2]} />
        </div>
        </div>
      </div>
    </div>
  );
}

export default Chart;

function getItemDates(data) {
  let array = [];
  for (let i of data) {
    // console.log(i)
    if (!array.includes(i.item_date)) {
      array.push(i.item_date);
    }
  }
  // console.log(array.length)
  // for(let j of array){
  // 	console.warn(j)
  // }
  return array;
}

function conSizeData(data, date) {
  // let date ="2021-05-21";
  let startingDate = date.slice(0, 8);
  let lastDate = parseInt(date.slice(8));
  // console.log(startingDate, lastDate, typeof lastDate)
  let count = [];
  let fulldata = [];

  for (let i = 1; i <= 3; i++) {
    data.forEach((date) => {
      let item_date = date.item_date;
      if (item_date == `${startingDate}${lastDate - i}`) {
        count[item_date] = (count[item_date] || 0) + 1;
        fulldata.push(date);
        // dsate.slot
      }
    });
  }
  // console.log(count, typeof count)
  // console.log(fulldata, typeof fulldata)
  return { count, fulldata };
}
function counting(count) {
  let array = [];
  for (let i in count) {
    let obj = { label: i, y: count[i] };

    let result = obj;

    array.push(result);
  }

  return array;
}
