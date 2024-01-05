<!-- 树形控件 可控制节点是否带节点增删改功能 -->
<template>
  <div class="white-body-view">
    <el-tree
      id="my-tree"
      ref="tree"
      class="tree-view structure-tree scroll-bar"
      :data="treeData"
      highlight-current
      :show-checkbox="showCheckBox"
      :default-expand-all="treeExpandAll"
      :props="defaultProps"
      :check-strictly="checkStrictly"
      :node-key="treeNodeKey"
      @node-click="handleNodeClick"
      @check="check"
      @check-change="handleCheckChange"
      :auto-expand-parent="false"
      :expand-on-click-node="false"
    >
      <span slot-scope="{ node, data }" class="custom-tree-node">
        <span class="tooltip">
          <span class="add-f-s-14">{{ data.label }}</span>
        </span>
        <div
          v-if="node.isCurrent === true && itemShow === true"
          class="operation-view"
        >
          <i
            class="small-operation-btn el-icon-circle-plus-outline"
            @click.stop="handleAdd(data)"
          />
          <i
            class="small-operation-btn el-icon-edit"
            @click.stop="handleEdit(data)"
          />
          <i
            class="small-operation-btn el-icon-delete"
            @click.stop="handleDelete(data)"
          />
        </div>
      </span>
    </el-tree>
  </div>
</template>

<script>
  export default {
    props: {
      // 列表数据
      treeData: {
        type: Array,
        default: function () {
          return []
        },
      },

      // 复选框是否显示
      showCheckBox: {
        type: Boolean,
        default: false,
      },

      // 在显示复选框的情况下，是否严格的遵循父子不互相关联的做法
      checkStrictly: {
        type: Boolean,
        default: false,
      },

      // 树节点是否默认展开
      treeExpandAll: {
        type: Boolean,
        default: true,
      },

      // 树节点唯一标识
      treeNodeKey: {
        type: String,
        default: 'id',
      },

      defaultProps: {
        type: Object,
        default() {
          return {
            children: 'children',
            label: 'label',
          }
        },
      },

      // 子节点展示新增编辑删除图标
      itemShow: {
        type: Boolean,
        default: true,
      },
    },

    data() {
      return {
        selectItem: {},
      }
    },
    watch: {},
    mounted() {},
    methods: {
      // 添加新增按钮
      handleAdd(data) {
        this.$emit('addItem', data)
      },

      // 点击删除按钮
      handleDelete(data) {
        this.$emit('deleteItem', data)
      },

      // 点击编辑按钮
      handleEdit(data) {
        this.selectItem = data
        this.$emit('editItem', JSON.parse(JSON.stringify(data)))
      },

      // 节点被点击时的回调
      handleNodeClick(data) {
        this.$emit('handleNodeClick', data)
      },

      // 节点选中状态发生变化时的回调
      handleCheckChange(data, checked, indeterminate) {
        this.$emit('handleCheckChange', data, checked, indeterminate)
      },

      // 当复选框被点击的时候触发
      check(nodeObj, SelectedObj) {
        // console.log(nodeObj)
        // console.log(SelectedObj.checkedKeys) // 这是选中节点的key数组
        // console.log(SelectedObj.checkedNodes) // 这是选中节点数组
        this.$emit('check', nodeObj, SelectedObj)
      },

      // 删除节点
      treeDeleteItem(val) {
        this.$refs.tree.remove(val)
      },

      // 修改记录，树形列表回显
      treeEditItem(val) {
        Object.assign(this.selectItem, val)
        this.selectItem = {}
      },
    },
  }
</script>
<style lang="scss" scoped>
  .white-body-view {
    // width: 100%;
    min-width: 320px;
  }

  .structure-tree {
    .custom-tree-node {
      width: 100%;
      display: flex;
      align-items: center;
    }
    .el-scrollbar .el-scrollbar__wrap {
      overflow-x: hidden;
    }

    #my-tree .el-tree > .el-tree-node {
      min-width: 100%;
      display: inline-block;
    }

    .el-tree-node__content {
      margin-bottom: 10px;
    }

    .tooltip {
      margin-right: 5px;
      font-size: 13px;
      border-radius: 4px;
      box-sizing: border-box;
      white-space: nowrap;
      padding: 4px;
    }

    .operation-view {
      width: 100%;
      text-align: right;
      display: inline-block;
      padding: 0px 5px;
      margin-left: 5px;
      color: #777777;
      z-index: 100;

      .small-operation-btn {
        color: #409eff;
        margin: 0px 3px;
      }

      .el-icon-circle-plus-outline:hover {
        color: #67c23a;
      }

      .el-icon-edit:hover {
        color: #e6a23c;
      }

      .el-icon-delete:hover {
        color: #f56c6c;
      }
    }
  }
</style>
