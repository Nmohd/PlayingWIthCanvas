import { Calender } from "./components/Calender";
import { data } from "./data";
import Chart from "./components/Chart";

function App() {

  //let count = Object.values(data.item_date)
  return (
    <div className="container">
      <div className="cal">
        
      </div>
      <div>
      <Chart />
      </div>
    </div>
  );
}

export default App;
