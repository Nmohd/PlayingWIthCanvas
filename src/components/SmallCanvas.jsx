import React, { useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import CanvasJSReact from "./canvasjs.react";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function SmallCanvas({ data, date }) {
  var chart = useRef();
  let graphData = timeSlot(data, date);

  // console.log(data,date)
 let titleDate = ((data[0].item_date).slice(0,8))+date;
//  console.log(titleDate)

  const [initialized, setInitialized] = useState(false);
  const options = {
    animationEnabled: true,
    //exportEnabled: true,
    theme: "light2", //"light1", "dark1", "dark2"
    title: {
      text: titleDate,
    },
    data: [
      {
        type: "column",
        dataPoints: graphData,
      },
    ],
  };

  // This effect simulates dynamic data updates via fetch

  const containerProps = {
    height: "calc(100vh - 150px)",
  };
  return (
    <div className="App">
      <CanvasJSChart
        containerProps={containerProps}
        options={options}
        onRef={(ref) => (chart.current = ref)}
      />
    </div>
  );
}

export default SmallCanvas;
function timeSlot(data, date) {
  // console.log(data,date);
  let arr = [];
  for (let i of data) {
    // console.log(i.item_date.slice(8))
    if (i.item_date.slice(8) == date) {
      arr.push(i.schedule_time.slice(11));
    }
  }
  //console.log("All date", arr)
 let result= countingTime(arr);
  return result;
}

function counting (count){

    let array =[]
  for(let i in count){
  let obj ={"label":i,"y":count[i]}

  let result = obj

  array.push(result)
  }

      return array;
  }

function countingTime(dates) {
  let groupArray = [];
  let namTo12am = 0;
  let tamTo3pm = 0;
  let tpmTo6pm = 0;
  let spmTo9pm = 0;


  for (let i of dates) {
      let j = i.slice(0,2)
      if(j == 0){
          j =13
      }
  
    if (j >= 9 && j <= 12) {
      namTo12am += 1;
    //   console.log("1",j,i)
    } else if (j >= 12 && j <= 15) {
        // console.log("2",j,i)
        tamTo3pm += 1;
    } else if (j >= 15 && j <= 18) {
        // console.log("3",j,i)
      tpmTo6pm += 1;
    } else if(j>=18 && j<=21) {
      spmTo9pm += 1;
    //   console.log("4",j,i)
    }
  }
  let output =[
     { "label":"9am to 12am","y":namTo12am},
     { "label":"12am to 3pm","y":tamTo3pm},
     { "label":"3pm to 6pm","y":tpmTo6pm},
     { "label":"6pm to 9pm","y":spmTo9pm},
]

  return output;
}
