<template>
  <div class="myCalendar">
    <div class="myCalendar_topBar">
      <div class="topBar_left">
        <span class="topBtn" @click="YearPrev"><<</span>
        <span class="topBtn" @click="MonthPrev"><</span>
      </div>
      <div class="topBar_center">{{currentYear}}-{{currentMonth<10?'0'+currentMonth:currentMonth}}</div>
      <div class="topBar_right">
        <span class="topBtn" @click="ToDay">今天</span>
        <span class="topBtn" @click="MonthNext">></span>
        <span class="topBtn" @click="YearNext">>></span>
      </div>
    </div>
    <div class="myCalendar_container">
      <table class="myCalendar_table">
        <thead class="myCalendar_head">
          <template v-for="(head,headIdx) in headList">
            <th :key="headIdx">{{head}}</th>
          </template>
        </thead>
        <tbody class="myCalendar_body">
          <tr v-for="row in Math.ceil(bodyList.length/7)">
            <td class="item-date" v-for="(item) in bodyList.slice((row>0?(row-1):row)*7,(row)*7)">
              <div v-if="item.day" class="date_container" @click="selectDate(item)" :class="{'active':item.day===currentDay}">
                <slot name="dateCell" :data="item">
                  <span class="date">{{item.day}}</span>
                </slot>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  export default {
    name: "myCalendar",
    props:{
      date:{},//可传入日期
    },
    data() {
      return {
        page: "myCalendar",
        headList:['日','一','二','三','四','五','六'],
        bodyList:[
          // {date:'2021-05-01',forbidden:false}
        ],
        currentYear:"",
        currentMonth:"",
        currentDay:"",
      }
    },
    mounted() {
      this.init();
      setTimeout(()=>{
        console.log(this.bodyList.length/7)
        this.bodyList.forEach(row=>{
          console.log((row>0?(row-1):row)*7)
        })
      },1000)
    },
    methods: {
      init(date) {
        if(!date){
          date = new Date();
          if(this.date){
            date = new Date(this.date);
          }
        }
        this.currentYear = date.getFullYear();
        this.currentMonth = date.getMonth()+1;
        this.currentDay = date.getDate();
        this.renderList();
      },
      YearPrev(){
        this.currentYear--;
        this.currentDay = 1;
        this.renderList();
      },
      MonthPrev(){
        this.currentMonth--;
        this.currentDay = 1;
        if(this.currentMonth===0){
          this.currentYear--;
          this.currentMonth = 12;
        }
        this.renderList();
      },
      YearNext(){
        this.currentYear++;
        this.currentDay = 1;
        this.renderList();
      },
      ToDay(){
        this.init(new Date())
      },
      MonthNext(){
        this.currentMonth++;
        if(this.currentMonth===13){
          this.currentYear++;
          this.currentMonth = 1;
        }
        this.currentDay = 1;
        this.renderList();
      },
      renderList(){
        let currentYear = parseFloat(this.currentYear);
        let currentMonth = parseFloat(this.currentMonth);
        let currentDay = parseFloat(this.currentDay);
        // console.log(currentDay)
        let firstDay = `${currentYear}-${currentMonth<10?'0'+currentMonth:currentMonth}-01`;
        let firstWeekDay = new Date(firstDay).getDay();
        let nextYear,nextMonth;
        if(parseFloat(currentMonth) === 12){
          nextYear = parseFloat(currentYear)+1;
          nextMonth = 1;
        }else{
          nextYear = currentYear;
          nextMonth = parseFloat(currentMonth)+1;
        }
        let nextMonthFirstDay = `${nextYear}-${nextMonth<10?'0'+nextMonth:nextMonth}-01`;
        let lastDay = new Date(new Date(nextMonthFirstDay).getTime() - 24*60*60*1000).getDate();
        // console.log(lastDay);
        // console.log(firstWeekDay);
        let bodyList = [];
        let cellLength = lastDay+firstWeekDay;
        while (cellLength%7!==0){
          cellLength++;
        }
        for(let i = 1;i <= cellLength;i++){
          let item = {date:'',year:currentYear,month:currentMonth,day:"",forbidden:false};
          if(i > firstWeekDay){
            if(i<=(lastDay+firstWeekDay)){
              let itemDay = i - firstWeekDay;
              item.day = itemDay;
              item.date = `${currentYear}-${currentMonth<10?'0'+currentMonth:currentMonth}-${itemDay<10?'0'+itemDay:itemDay}`;
            }else{
              item.forbidden = true;
            }
          }else{
            item.forbidden = true;
          }
          bodyList.push(item);
        }
        this.bodyList = bodyList;
        let currentItem = this.bodyList.filter(val=>{
          return val['day'] === currentDay;
        });
        if(currentItem.length>0){
          this.selectDate(currentItem[0]);
        }
        // console.log(JSON.parse(JSON.stringify(bodyList)))
      },
      //选择日期回调函数
      selectDate(item){
        this.currentDay = parseFloat(item.day);
        this.$emit('selectDate',{cellInfo:item});
      },
    }
  }
</script>

<style lang="scss">
  $defaultColor:#296BB5;
  .myCalendar{
    position: relative;
    width: 100%;
    min-width: 250px;
    display: flex;
    flex-direction: column;
    // padding: 10px;
    .myCalendar_topBar{
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #fff;
      background-color: $defaultColor;
      height: 40px;
      .topBar_center{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
      }
      .topBtn{
        margin: 0 10px;
        cursor: pointer;
      }
    }
    .myCalendar_container{
      background-color: #fff;
      padding: 0 20px;
      border: 1px solid #ddd;
    }
    .myCalendar_table{
      border-collapse: collapse;
      width: 100%;
      margin-bottom: 10px;
      .myCalendar_head{
        th{
          height: 30px;
          line-height: 30px;
        }
      }
      .myCalendar_body{
        border: 1px solid #ddd;
      }
      .item-date{
        position: relative;
        border: 1px solid #ddd;
        padding-top: 14%;
        .date_container{
          position: absolute;
          top:0;
          left: 0;
          width: 100%;
          height: 100%;
          cursor: pointer;
          overflow: hidden;
          .date{
            // display: flex;
            // align-items: center;
            // justify-content: center;
            width: 100%;
            height: 100%;
            // text-align: center;
          }
          &.active{
            color: #fff;
            background-color: $defaultColor;
          }
        }
      }
    }
  }
</style>