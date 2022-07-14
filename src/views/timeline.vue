<template>
<div class="mycalendar">
    <div v-for="item1,index in cal" :key="index">
  <div class="cc-calendar">
    <div class="calendar-title">
      <span>{{ year }}年</span>
    </div>
      <div class="calendar-title">
        <span>{{ index +1 }}月</span>
      </div>
      <ul class="calendar-week">
        <li v-for="(item, index) in calendarTitleArr" :key="index" class="week-item">
          {{ item }}
        </li>
      </ul>
      <ul class="calendar-view">
      <!-- 动态设置背景颜色 -->
        <li
          v-for="(item, index) in item1"
          :key="index"
          class="date-view"
          :style="{
            background: handleData(item.date) && isCurrentMonth(item.date) ? handleData(item.date).color : !isCurrentMonth(item.date) ? '#EAF2F2' : '#BFBFBF',
          }"
        >
          <span class="date-day" :class="[{ 'opacity-class': !isCurrentMonth(item.date) }]">
            {{ item.day }}
          </span>
          <span class="calendar-num">
            {{ handleData(item.date) && isCurrentMonth(item.date) ? handleData(item.date).pollution : "" }}
          </span>
        </li>
      </ul>
      <div class="color-box">
        <div v-for="item in colorList" :key="item.value">
          <span :style="{ background: item.value }"></span>
          <span>{{ item.name }}</span>
        </div>
      </div>
    </div>
  </div></div>
</template>

<script>
import { getNewDate, getDate, formatDate, colorList, handleAQIColor } from "@/libs/utils.js";
export default {
  name: "date-calendar",
  props: {
    // year: {
    //   type: [String, Number],
    //   default: 2022,
    // },
    // month: {
    //   type: [String, Number],
    //   default: 0,
    // },
    list: {
      type: Array,
      default() {
        return [];
      },
    }
  },
  data() {
    return {
      year:2022,
      month:1,
      list:[],
      calendarTitleArr: ["一", "二", "三", "四", "五", "六", "日"],
      colorList,
      cal:[]
    };
  },
  mounted(){
    for (let i = 0; i < 12; i++) {
      let calendatArr = [];
      let { year, month } = getNewDate(getDate(this.year, i, 1));
      let currentFirstDay = getDate(year, month, 1);
       // 获取当前月第一天星期几
      let weekDay = currentFirstDay.getDay();
      let startTime = null;
      if (weekDay == 0) {
        // 当月第一天是星期天
        startTime = currentFirstDay - 6 * 24 * 60 * 60 * 1000;
      } else {
        startTime = currentFirstDay - (weekDay - 1) * 24 * 60 * 60 * 1000;
      }
      let monthDayNum;
      // 当第一天是周五 周六 周日 这个月绘制42天数据 否则为35天
      if (weekDay == 5 || weekDay == 6 || weekDay == 0) {
        monthDayNum = 42;
      } else {
        monthDayNum = 35;
      }
      for (let i = 0; i < monthDayNum; i++) {
      // 为了页面整齐排列 一并绘制42天
      // for (let i = 0; i < 42; i++) {
        calendatArr.push({
          date: new Date(startTime + i * 24 * 60 * 60 * 1000),
          // year: year,
          // month: month + 1,
          year: new Date(startTime + i * 24 * 60 * 60 * 1000).getFullYear(),
          month: new Date(startTime + i * 24 * 60 * 60 * 1000).getMonth() + 1,
          day: new Date(startTime + i * 24 * 60 * 60 * 1000).getDate(),
        });
      }
      this.cal.push(calendatArr)
    }
    console.log(this.cal)
  },
  computed: {
    visibleCalendar() {
      let calendatArr = [];
      let { year, month } = getNewDate(getDate(this.year, this.month, 1));

      let currentFirstDay = getDate(year, month, 1);

      // 获取当前月第一天星期几
      let weekDay = currentFirstDay.getDay();
      let startTime = null;
      if (weekDay == 0) {
        // 当月第一天是星期天
        startTime = currentFirstDay - 6 * 24 * 60 * 60 * 1000;
      } else {
        startTime = currentFirstDay - (weekDay - 1) * 24 * 60 * 60 * 1000;
      }
      // let monthDayNum;
      // 当第一天是周五 周六 周日 这个月绘制42天数据 否则为35天
      // if (weekDay == 5 || weekDay == 6 || weekDay == 0) {
      //   monthDayNum = 42;
      // } else {
      //   monthDayNum = 35;
      // }
      // for (let i = 0; i < monthDayNum; i++) {
      // 为了页面整齐排列 一并绘制42天
      for (let i = 0; i < 42; i++) {
        calendatArr.push({
          date: new Date(startTime + i * 24 * 60 * 60 * 1000),
          // year: year,
          // month: month + 1,
          year: new Date(startTime + i * 24 * 60 * 60 * 1000).getFullYear(),
          month: new Date(startTime + i * 24 * 60 * 60 * 1000).getMonth() + 1,
          day: new Date(startTime + i * 24 * 60 * 60 * 1000).getDate(),
        });
      }
      console.log(calendatArr)
      return calendatArr;
    },
  },
  methods: {
    handleData(date) {
      const data = [
        {
          time: "2022-08-01",
          pollution: "PM2.5",
          value: "35",
        },
        {
          time: "2022-05-02",
          pollution: "",
          value: "67",
        },
        {
          time: "2022-03-03",
          pollution: "PM10",
          value: "123",
        },
        {
          time: "2022-05-05",
          pollution: "SO2",
          value: "186",
        },
        {
          time: "2022-09-05",
          pollution: "NO",
          value: "256",
        },
        {
          time: "2022-12-12",
          pollution: "CO",
          value: "400",
        },
      ]
      data.forEach((item) => {
        if (item.pollution === "无") item.pollution = "";
        if (!item.value && item.value !== 0) {
          item.color = "#bfbfbf";
          return;
        }
        let list = colorList.filter((itm) => itm.name == handleAQIColor(item.value));
        item.color = list[0].value;
      });
      let { year, month, day } = getNewDate(date);
      let dateTime = year + "-" + formatDate(month + 1) + "-" + formatDate(day);
      let list = null;
      data.forEach((item) => {
        if (item.time == dateTime) {
          list = item;
        }
      });
      return list;
    },
    // 是否是当前月
    isCurrentMonth(date) {
      console.log('--------',date)
      let { year: currentYear, month: currentMonth } = getNewDate(getDate(this.year, this.month, 1));
      let { year, month } = getNewDate(date);
      return currentYear == year && currentMonth == month;
    },
  },
  created() {},
};
</script>

<style lang="scss" scope>
body,
ul,
ol,
li {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

ul,
ol {
  list-style: none;
}
.mycalendar{
  display:flex;
  align-items:center;
  justify-content: space-around;
  flex-wrap:wrap;
}
.cc-calendar {
  width: 441px;
  height: 100%;
  box-sizing: border-box;
  margin-bottom: 29px;
  .calendar-title {
    width: 100%;
    font-size: 16px;
    font-family: "Source Han Sans CN";
    font-weight: 500;
    color: #061a19;
    text-align: center;
    margin-bottom: 19px;
  }
  .calendar-week {
    display: flex;
    height: 28px;
    line-height: 28px;
    border: 1px solid #14c3ba;
    border-right: none;
    border-left: none;
    margin-bottom: 2px;
    .week-item {
      width: 67px;
      text-align: center;
      font-size: 14px;
      font-family: "Source Han Sans CN";
      color: #061a19;
      font-weight: 400;
    }
  }
  .calendar-view {
    display: flex;
    flex-wrap: wrap;
    border-top: 2px solid #e4e7ea;
    .date-view {
      width: 63px;
      height: 38px;
      border-right: 2px solid #e4e7ea;
      border-bottom: 2px solid #e4e7ea;
      box-sizing: border-box;
      position: relative;
      .date-day {
        padding: 8px;
        font-size: 12px;
        font-family: "Source Han Sans CN";
        font-weight: 400;
        color: #062927;
      }
      .calendar-num {
        position: absolute;
        left: 14px;
        bottom: 0;
        font-size: 14px;
        font-family: "Source Han Sans CN";
        font-weight: 400;
        color: #062927;
      }
    }
    .opacity-class {
      opacity: 0.5;
    }
  }
  .color-box {
    margin-top: 7px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    > div {
      display: flex;
      align-items: center;
      justify-content: center;
      > span:first-child {
        width: 30px;
        height: 14px;
      }
      > span:last-child {
        font-size: 14px;
        font-weight: 500;
        color: #1d2f2e;
      }
    }
    span {
      display: inline-block;
      width: 30px;
      margin-right: 1px;
      text-align: center;
    }
  }
}
</style>

