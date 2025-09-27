// ManagePage.tsx
import { useEffect, useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import dayjs from "dayjs";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { getVisitCount } from "../api/ManageApi";
import type { VisitData } from "../type";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function ManagePage() {
  const [data, setData] = useState<VisitData>({ daily: [], monthly: [] });

  useEffect(() => {
    getVisitCount()
      .then(setData)
      .catch((err) => console.error("방문자 수 가져오기 실패:", err));
  }, []);

  const dailyChart = {
    labels: data.daily.map((d) => dayjs(d.date).format("MM-DD")),
    datasets: [
      {
        label: "일별 방문자 수",
        data: data.daily.map((d) => d.count),
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
      },
    ],
  };

  const monthlyChart = {
    labels: data.monthly.map((m) => dayjs(m.month + "-01").format("YYYY년 MM월")),
    datasets: [
      {
        label: "월별 방문자 수",
        data: data.monthly.map((m) => m.count),
        backgroundColor: "rgba(153,102,255,0.6)",
      },
    ],
  };

  return (
    <>
      <h2>방문자 통계</h2>
      <div style={{ width: "100%", maxWidth: "800px", marginBottom: "40px" }}>
        <Line data={dailyChart} />
      </div>
      <div style={{ width: "100%", maxWidth: "800px" }}>
        <Bar data={monthlyChart} />
      </div>
    </>
  );
}