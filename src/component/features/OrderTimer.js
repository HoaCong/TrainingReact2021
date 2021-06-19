import React, { Component } from "react";
import Button from "../common/Button";
class OrderTimer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: this.props.listDate[0],
      open: false,
      timeStart: null,
      timeClose: null,
      listTimer: [],
    };
  }
  getOptionDate = (e) => {
    let t_Start = new Date();
    t_Start.setHours(7);
    t_Start.setMinutes(30);
    let t_Close = new Date();
    t_Close.setHours(20);
    t_Close.setMinutes(30);
    this.setState({
      timeStart: t_Start,
      timeClose: t_Close,
    });
    this.setState({
      currentDate: e.target.value,
    });
    if (e.target.value === this.props.today)
      this.showListTimer(e.target.value, 0, this.state.timeClose);
    else
      this.showListTimer(
        e.target.value,
        this.state.timeStart,
        this.state.timeClose
      );
  };
  openTimer = () => {
    let t_Start = new Date();
    t_Start.setHours(7);
    t_Start.setMinutes(30);
    let t_Close = new Date();
    t_Close.setHours(20);
    t_Close.setMinutes(30);
    this.setState({
      timeStart: t_Start,
      timeClose: t_Close,
    });
    this.setState({
      open: true,
    });
    if (this.props.today === this.state.currentDate)
      this.showListTimer(this.props.listDate[0], 0, t_Close);
    else this.showListTimer(this.props.listDate[0], t_Start, t_Close);
  };
  showListTimer = (today, t_Start, t_Close) => {
    let tmpArray = [];
    let nextTime = new Date();

    if (t_Start !== 0) nextTime = t_Start;
    if (today === this.props.today) {
      let a = new Date();
      a.setHours(a.getHours() + 3);
      a.setMinutes(0);
      for (
        nextTime.setMinutes(
          nextTime.getMinutes() > 30
            ? nextTime.getMinutes() - nextTime.getMinutes() + 105
            : nextTime.getMinutes() - nextTime.getMinutes() + 60
        );
        nextTime <= a;
        nextTime.setMinutes(nextTime.getMinutes() + 15)
      ) {
        tmpArray.push(
          nextTime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })
        );
      }
    }
    for (
      nextTime.setMinutes(30);
      nextTime <= t_Close;
      nextTime.setMinutes(nextTime.getMinutes() + 30)
    ) {
      tmpArray.push(
        nextTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    }
    this.setState({
      listTimer: tmpArray,
    });
  };
  timer = () => {
    let a = document.getElementById("select_time_order").value;
    a === "NOW"
      ? this.props.changeTextTimer("GIAO NGAY")
      : this.props.changeTextTimer(`${this.state.currentDate}  ${a}`);
  };
  render() {
    const iconCheck = (
      <span className="icon_check">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polyline
            fill="none"
            stroke="#000"
            strokeWidth="1.1"
            points="4,10 8,15 17,4"
          ></polyline>
        </svg>
      </span>
    );
    return (
      <div className="order_time">
        <div className="padding_timer flex_timer">
          <div className="flex_timer">
            <span className="spacing_right">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  fill="none"
                  stroke="#000"
                  strokeWidth="1.1"
                  cx="10"
                  cy="10"
                  r="9"
                ></circle>
                <rect x="9" y="4" width="1" height="7"></rect>
                <path
                  fill="none"
                  stroke="#000"
                  strokeWidth="1.1"
                  d="M13.018,14.197 L9.445,10.625"
                ></path>
              </svg>
            </span>
            <span>GIAO NGAY</span>
          </div>
          {iconCheck}
        </div>
        <div className="padding_timer flex_timer" onClick={this.openTimer}>
          <div className="flex_timer">
            <span className="spacing_right">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M 2,3 2,17 18,17 18,3 2,3 Z M 17,16 3,16 3,8 17,8 17,16 Z M 17,7 3,7 3,4 17,4 17,7 Z"></path>
                <rect width="1" height="3" x="6" y="2"></rect>
                <rect width="1" height="3" x="13" y="2"></rect>
              </svg>
            </span>
            <span>Thời gian đặt hàng</span>
          </div>
        </div>
        {this.state.open ? (
          <div className="padding_timer">
            <div className="option_time">
              <label>Ngày đặt</label>
              <select
                id="select_date_order"
                className="list-date"
                onChange={this.getOptionDate}
              >
                {this.props.listDate.map((date, index) => (
                  <option key={index} value={date}>
                    {this.props.today === date ? "Hôm nay" : "Ngày " + date}
                  </option>
                ))}
              </select>
            </div>
            <div className="option_time">
              <label>Thời gian đặt</label>
              <select id="select_time_order" className="list-time">
                {this.state.currentDate === this.props.today ? (
                  <>
                    <option value="NOW">Trong 15-30 phút</option>
                    {this.state.listTimer.map((time, index) => (
                      <option value={time} key={index}>
                        {time}
                      </option>
                    ))}
                  </>
                ) : (
                  <>
                    {this.state.listTimer.map((time, index) => (
                      <option value={time} key={index}>
                        {time}
                      </option>
                    ))}
                  </>
                )}
              </select>
            </div>
            <Button
              className="seecart btn_timer"
              Text="Hẹn giờ"
              onClick={this.timer}
            />
          </div>
        ) : null}
      </div>
    );
  }
}
export default OrderTimer;
