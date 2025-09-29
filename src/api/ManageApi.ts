
import axios from "axios";
import dayjs from "dayjs";
import { BASE_URL } from "./LoginApi";
import type { RawVisit, VisitData } from "../type";

export const getVisitCount = async (): Promise<VisitData> => {
  const token = sessionStorage.getItem("jwt");
  if (!token) throw new Error("로그인 토큰이 없습니다.");

  const res = await axios.get<RawVisit[]>(`${BASE_URL}/manage/visit`, {
    headers: {
      Authorization: token,
    },
  });

  const rawData = res.data;

  const daily = rawData.map((item) => ({
    date: item.visit_date,
    count: item.visits,
  }));

  const monthlyMap = new Map<string, number>();
  rawData.forEach(({ visit_date, visits }) => {
    const month = dayjs(visit_date).format("YYYY-MM");
    monthlyMap.set(month, (monthlyMap.get(month) || 0) + visits);
  });

  const monthly = Array.from(monthlyMap.entries()).map(([month, count]) => ({
    month,
    count,
  }));

  return { daily, monthly };
};