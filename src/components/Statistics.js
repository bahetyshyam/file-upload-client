import React, { useEffect, useState } from "react";
import Chart from "react-google-charts";
import axios from "axios";

const Statistics = () => {
  const [statsData, setStatsData] = useState([]);
  const [Loading, setLoading] = useState(true);

  const getAllData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/files`
      );
      console.log(response.data);
      let pdfCount = 0;
      let mp4Count = 0;
      let jpegCount = 0;

      response.data.forEach((item) => {
        if (item.contentType === "image/jpeg") {
          jpegCount++;
        }
        if (item.contentType === "application/pdf") {
          pdfCount++;
        }
        if (item.contentType === "video/mp4") {
          mp4Count++;
        }
      });
      const data = [
        ["FileType", "Count"],
        ["PDF", pdfCount],
        ["MP4", mp4Count],
        ["JPEG", jpegCount],
      ];
      setStatsData(data);
      setLoading((state) => !state);
    } catch (e) {
      console.log(e.response);
    }
  };

  useEffect(() => {
    getAllData();
  }, []);
  return (
    <div>
      {Loading ? (
        <div>Loding...</div>
      ) : (
        <Chart
          width={"500px"}
          height={"300px"}
          chartType="BarChart"
          loader={<div>Loading Chart</div>}
          data={statsData}
          options={{
            title: "Counts of JPEG/MP4/PDF",
            chartArea: { width: "50%" },
            hAxis: {
              minValue: 4,
            },
          }}
          rootProps={{ "data-testid": "1" }}
        />
      )}
    </div>
  );
};

export default Statistics;
