import React, { useEffect, useState } from "react";
import { getDashboardStats } from "../../../services/userService";
import DashboardChart from "./DashboardChart"; // component biểu đồ
import { toast } from "react-toastify";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [groupBy, setGroupBy] = useState("day");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const res = await getDashboardStats(groupBy);
        if (res && res.data && res.errCode === 0) {
          setData(res.data);
          console.log("resdung", res);
          console.log("resdata", res.data);
          console.log("Gọi API với groupBy:", groupBy);
        } else {
          console.log("Gọi API với groupBy:", groupBy);
          toast.error("Không lấy được dữ liệu thống kê!");
          console.log("res", res); // Thêm log này
        }
      } catch (error) {
        toast.error("Lỗi khi lấy dữ liệu dashboard");
        console.error("getDashboardStats error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [groupBy]);

  const totalRevenue = data.reduce(
    (sum, item) => sum + parseFloat(item.total),
    0
  );

  return (
    <div style={{ padding: 20 }}>
      <h2>Thống kê doanh thu</h2>

      <div style={{ marginBottom: 20 }}>
        <label htmlFor="groupBy">Nhóm theo: </label>
        <select
          id="groupBy"
          value={groupBy}
          onChange={(e) => setGroupBy(e.target.value)}
        >
          <option value="day">Ngày</option>
          <option value="week">Tuần</option>
          <option value="month">Tháng</option>
          <option value="year">Năm</option>
        </select>
      </div>

      <div style={{ marginBottom: 20, fontSize: "18px", fontWeight: "bold" }}>
        Tổng doanh thu: {totalRevenue.toLocaleString("vi-VN")} VND
      </div>

      {loading ? <p>Đang tải dữ liệu...</p> : <DashboardChart data={data} />}
    </div>
  );
};

export default Dashboard;
