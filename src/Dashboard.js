import { useEffect, useMemo, useState } from "react";
import { Chart } from "./Chart";

export function DashBoard() {
  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ],
    []
  );

  const [urlCount, setUrlCount] = useState([]);
  useEffect(() => {
    fetch("https://pk-bike-service.herokuapp.com/user/countService", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("usertoken")
      }
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        //console.log(data);
        const urlList = data.sort(function (a, b) {
          return a._id - b._id;
        });
        urlList.map((item) =>
          setUrlCount((prev) => [
            ...prev,
            {
              name: MONTHS[item._id - 1],
              "No: of service": item.total,
              count: item.total
            }
          ])
        );
      })
      .catch((e) => console.log(e));
  }, [MONTHS]);

  return (
    <div className="dashboard">
      <Chart
        data={urlCount}
        title="Service done per Month"
        grid
        dataKey="No: of service"
      />
    </div>
  );
}
