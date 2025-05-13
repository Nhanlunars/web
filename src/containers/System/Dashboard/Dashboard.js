import React, { Component } from "react";
import { connect } from "react-redux";
import { USER_ROLE } from "../../../utils";
import { toast } from "react-toastify";
import DashboardChart from "./DashboardChart";
import {
  getDashboardStats,
  getDashboardStatsByOwnerId,
} from "../../../services/userService";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      groupBy: "day",
      loading: false,
    };
  }

  async componentDidMount() {
    await this.fetchStats();
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.groupBy !== this.state.groupBy) {
      await this.fetchStats();
    }
  }

  fetchStats = async () => {
    const { userInfo } = this.props;
    const { groupBy } = this.state;
    console.log("userId", userInfo.id);
    this.setState({ loading: true });

    try {
      let res;
      if (userInfo.roleId === USER_ROLE.ADMIN) {
        res = await getDashboardStats(groupBy);
      } else if (userInfo.roleId === USER_ROLE.OWNER) {
        res = await getDashboardStatsByOwnerId({
          userId: userInfo.id,
          type: groupBy,
        });
      }

      if (res && res.errCode === 0 && res.data) {
        this.setState({ data: res.data });
        console.log("resdung", res);
        console.log("resdata", res.data);
        console.log("Gọi API với groupBy:", groupBy);
      } else {
        toast.error("Không lấy được dữ liệu thống kê!");
        console.log("Gọi API với groupBy:", groupBy);
        console.log("res", res); // Thêm log này
      }
    } catch (error) {
      toast.error("Lỗi khi lấy dữ liệu dashboard");
      console.error("Dashboard fetchStats error:", error);
    } finally {
      this.setState({ loading: false });
    }
  };

  handleGroupByChange = (event) => {
    this.setState({ groupBy: event.target.value });
  };

  render() {
    const { data, groupBy, loading } = this.state;

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
            onChange={this.handleGroupByChange}
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
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.user.userInfo,
  };
};

export default connect(mapStateToProps)(Dashboard);
