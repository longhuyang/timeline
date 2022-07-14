<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <myCalendar :date="date"  @selectDate="selectDate">
      <template slot="dateCell" slot-scope="{data}">
    　　<!-- 格式化显示数据背景等 -->
        <div class="date">
          {{data.day}}
          <div v-for="(item,index) in calendarList" :key="index">
            <div v-if="(item.CF_FollowDate).indexOf(data.date)!=-1">
              <div class="item" v-for="(item2,index2) in item.list" :key="index2" placement="right">
                <div class="content">{{item2.label}}:{{item2.num}}</div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </myCalendar>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import myCalendar from "@/components/myCalendar.vue";

export default {
  name: 'Home',
  components: {
    HelloWorld,
    myCalendar
  }
}
</script>
