<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div id="div1" class="aaaa">
      <div class="limiandedongxi">

      </div>
      <div
        class="myline"
        id='myLine'
        @scroll="divscrollFn($event)"
      >
        <!-- :style="{left: move+'px'}" -->
        <!-- <div v-for="(item, index) in 7" :key="index"> -->
        <!-- <div v-for="(item,index) in myTime" class="mykuang" :key="index" :style="{left:item.marginLeft+'px'}" > -->
        <div v-for="(item, index) in myTime" :key="index" class="date">
          <div class="mykuang" v-for="(it,ind) in item.date" :key="ind" >
            <div class="point">{{ it.time }}</div>
            <div class="myTextLine"></div>
            <div class="mytext">{{ it.text }}</div>
          </div>
          <span class="datetext">
            {{item.d}}
          </span>
        </div>
      <!-- </div> -->
      </div>
    </div>
    <!-- <div id="visualization"></div> -->
  </div>
</template>
<script>
export default {
  name: "ShufflingFigure",
  data() {
    return {
      timePointIndex: 0,
      options: {},
      myTimeWidth: 864, // 7天，1小时100px, 7*24*aaaa
      aaaa:1, // 用于乘法计算
      moveX:0,
      move:-15, // 用于记录移动距离
      divWidth:null,
      moveLine: null,
      starTime:'2017-4-1 0:0:0',
      myDateWidth:"",
      myTime:[
        {id:1,date:[
          { text: "文", left: "145", time: "2017-4-1 09:30:02" },
          { text: "文", left: "145", time: "2017-4-1 19:30:02" },
          { text: "文", left: "145", time: "2017-4-1 12:30:02" },
        ]},
        {id:2,date:[
          { text: "文", left: "145", time: "2017-4-2 09:30:02" },
          { text: "文", left: "145", time: "2017-4-2 19:30:02" },
          { text: "文", left: "145", time: "2017-4-2 12:30:02" },
        ]},
        {id:3,date:[]},
        {id:4,date:[
          { text: "文", left: "145", time: "2017-4-4 4:30:02" },
          { text: "文", left: "145", time: "2017-4-4 14:30:02" },
          { text: "文", left: "145", time: "2017-4-4 14:34:02" },
        ]},
        {id:5,date:[
          { text: "文", left: "145", time: "2017-4-5 5:30:02" },
          { text: "文", left: "145", time: "2017-4-5 12:30:02" },
          { text: "文", left: "145", time: "2017-4-5 14:30:02" },
        ]},
        {id:6,date:[
          { text: "文", left: "145", time: "2017-4-6 02:30:02" },
          { text: "文", left: "145", time: "2017-4-6 12:30:02" },
          { text: "文", left: "145", time: "2017-4-6 14:30:02" },
        ]},
        {id:7,date:[
          { text: "文", left: "145", time: "2017-4-7 07:30:02" },
          { text: "文", left: "145", time: "2017-4-7 17:30:02" },
          { text: "文", left: "145", time: "2017-4-7 17:37:02" },
        ]},
      ]
      // myTime: [
      //   { text: "文", marginLeft: "145", time: "2017-4-1 09:30:02" },
      //   { text: "文", marginLeft: "145", time: "2017-4-2 09:30:02" },
      //   { text: "文", marginLeft: "145", time: "2017-4-3 04:30:02" },
      //   { text: "文", marginLeft: "145", time: "2017-4-3 09:30:02" },
      //   { text: "文", marginLeft: "145", time: "2017-4-3 19:30:02" },
      //   { text: "文", marginLeft: "145", time: "2017-4-4 09:32:02" },
      //   { text: "文", marginLeft: "145", time: "2017-4-5 09:30:02" },
      //   { text: "态", marginLeft: "145", time: "2017-4-6 09:30:02" },
      //   { text: "态", marginLeft: "145", time: "2017-4-7 09:30:02" },
      //   { text: "态", marginLeft: "145", time: "2017-4-8 09:30:02" },
      //   { text: "文", marginLeft: "145", time: "2017-4-9 09:30:03" },
      //   { text: "文", marginLeft: "145", time: "2017-4-10 09:30:02" },
      //   { text: "文", marginLeft: "145", time: "2017-4-11 09:30:04" },
      //   { text: "文", marginLeft: "145", time: "2017-4-12 09:30:02" },
      //   { text: "文", marginLeft: "145", time: "2017-4-10 09:30:02" },
      //   { text: "文", marginLeft: "145", time: "2017-4-11 09:30:02" },
      //   { text: "文", marginLeft: "145", time: "2017-4-12 09:30:02" },
      //   { text: "文", marginLeft: "145", time: "2017-4-10 09:30:02" },
      //   { text: "文", marginLeft: "145", time: "2017-4-11 09:30:02" },
      //   { text: "文", marginLeft: "145", time: "2017-4-12 09:30:02" },
      // ],
    };
  },
  mounted() {
    this.myTime.map(item=>{
      item.date.map(it=>{
        item.d = it.time.substr(0,8)
        console.log(item.d)
        it.time = it.time.substr(-8)
      })
    })
    // 计算每一项得位置
    this.myTime.forEach(item=>{
      item.date.forEach(it=>{
        console.log('----',new Date(it.time).getHours() * this.myTimeWidth)
        // let ctime = new Date(it.time).getTime()-new Date(new Date(this.starTime).toLocaleDateString()).getTime()
        // it.left = ctime/100000
        it.left = new Date(it.time).getHours() * this.myTimeWidth
        // this.myDateWidth = this.myDateWidth*1 + it.left*1
        this.myDateWidth = 200
      })
      console.log(this.myDateWidth)
    })


    document.addEventListener('selectstart', function (e) {
        e.preventDefault(); //阻止默认行为
    })
    // 如果需要送过来的文字态势顺序不对，则需要排列
    // 确认每一个item,在时间轴上的位置 默认1小时为100px
    let marginLeft = null;
    this.myTime.forEach((item) => {
      console.log((new Date(item.time).getTime()-new Date('2017-4-1 00:00:00').getTime())/1000)
      marginLeft = item.marginLeft =
        ((new Date(item.time).getTime() - 1491000000000) / 1000000) * 2 +
        marginLeft;
    });
    var oDiv = document.getElementById("div1");
    oDiv.onmousewheel = this.divscrollFn; //给div添加鼠标滚轮事件,非火狐浏览器
    if (oDiv.addEventListener) {
      //火狐浏览器添加鼠标滚轮事件
      oDiv.addEventListener("DOMMouseScroll", this.divscrollFn, false);
    }

    // 鼠标落下添加移动监听
    oDiv.addEventListener('mousedown',(e)=>{
      this.divWidth = document.getElementById('div1').clientWidth
      oDiv.addEventListener("mousemove", this.moveDiv);
    })
    // 鼠标抬起移除移动监听
    let body = document.getElementsByTagName("body")
    // oDiv.addEventListener("mouseup",(e)=>{
    //   this.moveX =0
    //   // 当鼠标抬起后 清除鼠标移动事件 moveDIV
    //   oDiv.removeEventListener("mousemove", this.moveDiv);
    // });    
    document.addEventListener("mouseup",(e)=>{
      this.moveX =0
      // 当鼠标抬起后 清除鼠标移动事件 moveDIV
      oDiv.removeEventListener("mousemove", this.moveDiv);
    });
    // oDiv.onmousedown = function (event) {
    //   let disx = event.clientX;
    //   let disy = event.clientY;
    //   console.log(disx,disy)
    // };

    // var oDiv = document.getElementById("visualization");
    // oDiv.onmousewheel = this.fn; //给div添加鼠标滚轮事件,非火狐浏览器
    // if (oDiv.addEventListener) {
    //   //火狐浏览器添加鼠标滚轮事件
    //   oDiv.addEventListener("DOMMouseScroll", this.fn, false);
    // }
  },
  methods: {
    // 滚动事件
    divscrollFn(e) {
      console.log(this.myTimeWidth)
      // let mubiao = {}
      // if(e.target.className === 'myTextLine' && e.target.className === 'mytext'  && e.target.className === 'point' ){
      //   mubiao = e.target.parentNode
      // }
      if (e.wheelDelta || e.detail) {
        if (e.wheelDelta > 0 || e.detail < 0) {
          //当鼠标滚轮向上滚动时
          this.myTimeWidth = this.myTimeWidth + 200;
        }
        if (e.wheelDelta < 0 || e.detail > 0) {
          //当鼠标滚轮向下滚动时
          // if (this.myTimeWidth > this.myTime.length * 170) {
            this.myTimeWidth = this.myTimeWidth - 400;
          // }
        }
      }
    },
    // 点击事件
    // 点住移动事件
    moveDiv(e){
      console.log(this.myTimeWidth - this.divWidth,this.move,this.move < 0 && this.myTimeWidth - this.divWidth < this.move)
      // if(this,move < )
      if(this.moveX != 0){
        if(e.screenX - this.moveX >0 && this.move > 0) return
        if(this.move < 0 && this.myTimeWidth - this.divWidth < Math.abs(this.move) ) {
          this.move =this.divWidth - this.myTimeWidth 
          return
        }
        // if(e.screenX - this.moveX <0 && this.move > 0) return
        this.move = this.move + (e.screenX - this.moveX)
      }
      this.moveX = e.screenX;
    }
  },
};
</script>
<style lang="scss" scoped>
//
::-webkit-scrollbar {
  height: 0 !important;
  width: 0 !important;
}
.aaaa {
  display: inline-block;
  height: 200px;
  width: 100%;
  border: 1px solid red;
  overflow: hidden;
  overflow-x: scroll;

  &:active {
    cursor: move;
  }
  .myline {
    margin-top: 100px;
    position: relative;
    left: 10px;
    height: 0;
    border: 1px solid yellow;
    // overflow: auto;
    // overflow-x: hidden;
    // overflow-y: scroll;
    // display: flex;
    // justify-content: space-around;
      .date{
        display: inline-block;
        position: relative;
        height: 10%;
        // width: calc(24 * 6 * 6px); // 一天24*60*60
        .datetext{
          position: absolute;
          left: 0;
          bottom: 0;
        }
        .mykuang{
        // display: inline-block;
        // position: relative;
        // margin-left: 100px;
          .datetext{
            // position: absolute;
            // left: 0;
          }
          .myTextLine {
            // position: absolute;
            border: none;
            border-left: 1px solid black;
            transform: translateY(-3px);
            height: calc(100% - 28px - 23px);
            height: 100%;
          }
          .point {
            // position: absolute;
            // z-index: 99;
            border-left: 1px solid black;
            background-color: #d29292;
            white-space: nowrap;
            transform: translate(-50%, -50%);
            border-radius: 14px;
            line-height: 28px;
            padding: 0 12px;
                width: 66px;
          }
          .mytext {
            border-radius: 50%;
            background: blue;
            color: #fff;
            border: 1px solid pink;
            transform: translate(-50%, -50%);
            width: 21px;
          }
        }
      }



    //   &>div:nth-child(2n) {
    //     transform: rotateX(180deg) translateY(100%);
    //     .mytext {
    //       transform: rotateX(180deg) translate(-50%, 50%);
    //     }
    //     .point {
    //       transform: rotateX(180deg) translate(-50%, 50%);
    //     }
    //   }
    // .mykuang {
    //   position: absolute;
    //   height: 15vh;
    //   border: 1ps solid red;

    //   .myTextLine {
    //     // width: 0;
    //     border: none;
    //     border-left: 1px solid black;
    //     transform: translateY(-3px);
    //     height: calc(100% - 28px - 23px);
    //     height: 100%;
    //   }
    //   .point {
    //     position: absolute;
    //     z-index: 99;
    //     background-color: #d29292;
    //     white-space: nowrap;
    //     transform: translate(-50%, -50%);
    //     border-radius: 14px;
    //     line-height: 28px;
    //     padding: 0 12px;
    //   }
    //   .mytext {
    //     border-radius: 50%;
    //     background: blue;
    //     color: #fff;
    //     border: 1px solid pink;
    //     transform: translate(-50%, -50%);
    //     width: 21px;
    //   }
    // }
  }
}
</style>