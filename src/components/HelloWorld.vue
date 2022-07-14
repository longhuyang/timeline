<template>
  <div class="hello">
    <el-date-picker
      v-model="value1"
      type="datetimerange"
      :popper-append-to-body="isAppend"
      popper-class="popperclass"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :default-time="['00:00:00', '23:59:59']">
    </el-date-picker>
    <el-tree
      :data="data2"
      show-checkbox
      default-expand-all
      node-key="id"
      ref="treeNode"
      highlight-current
      :props="defaultProps"
      @check-change="change"
      @node-click="handleNodeClick"
    >
    </el-tree>
    <button @click="expandTree">展开2</button>
    <button @click="foldTree">收起2</button>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {},
  data() {
    return {
      isAppend:false,
        value1: '',
      isExpand: false,
      data2: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1",
              children: [
                {
                  id: 9,
                  label: "三级 1-1-1",
                  children: [
                    {
                      id: 19,
                      label: "s级 1-1-1",
                    },
                    {
                      id: 120,
                      label: "s级 1-1-2",
                    },
                  ],
                },
                {
                  id: 10,
                  label: "三级 1-1-2",
                },
              ],
            },
                        {
              id: 54,
              label: "二级 1-1",
              children: [
                {
                  id: 59,
                  label: "三级 1-1-1",
                  children: [
                    {
                      id: 519,
                      label: "s级 1-1-1",
                    },
                    {
                      id: 5120,
                      label: "s级 1-1-2",
                    },
                  ],
                },
                {
                  id: 510,
                  label: "三级 1-1-2",
                },
              ],
            },
          ],
        },
        {
          id: 2,
          label: "一级 2",
          children: [
            {
              id: 5,
              label: "二级 2-1",
            },
            {
              id: 6,
              label: "二级 2-2",
            },
          ],
        },
        {
          id: 3,
          label: "一级 3",
          children: [
            {
              id: 7,
              label: "二级 3-1",
            },
            {
              id: 8,
              label: "二级 3-2",
            },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
  methods: {
    change(a, b, c) {
      console.log(a, b, c);
      let node = this.$refs.treeNode.getNode(a);
      if (b ||c) node.expanded = true;
      else node.expanded = false;
      console.log(node);
    },
    handleNodeClick(data, node) {
      // console.log(data,node)
      if (node.expanded) {
        //展开
        let other_nodes = this.$refs.treeNode.data.filter(
          (item) => item.label !== data.label
        );
        other_nodes.forEach((item) => {
          this.$refs.treeNode.store.nodesMap[item.label].expanded = false;
        });
      }
    },
    //展开树
    expandTree() {
      this.isExpand = true;
      this.buildData();
    },
    //折叠树
    foldTree() {
      this.isExpand = false;
      this.buildData();
    },
    //遍历树的所有子节点，展开的时候给子节点展开状态赋值true，折叠时候赋值false
    buildData() {
      console.log(this.$refs.treeNode.getCurrentNode(2));
      for (
        let i = 0;
        i < this.$refs.treeNode.store._getAllNodes().length;
        i++
      ) {
        this.$refs.treeNode.store._getAllNodes()[i].expanded = this.isExpand;
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped leng="scss">
.popperclass{
  background: red !important;
}
</style>
<style lang="scss" src="./elDatePicker.scss" scoped></style>