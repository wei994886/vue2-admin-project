<template>
  <div class="tree-box">
    <div class="tree-box-content">
      <p class="title-css">点击树节点可显示（增删改）操作图标按钮</p>
      <comTree
        v-if="treeData"
        ref="customTree"
        :itemShow="itemShow"
        :tree-data="treeData"
        :showCheckBox="showCheckBox"
        :checkStrictly="checkStrictly"
        :defaultProps="defaultProps"
        :tree-expand-all="treeExpandAll"
        :tree-node-key="treeNodeKey"
        @handleNodeClick="handleNodeClick"
        @check="handleCheck"
        @addItem="addTreeItem"
        @deleteItem="deleteTreeItem"
        @editItem="editTreeItem"
      >
      </comTree>
    </div>
  </div>
</template>
<script>
  import comTree from '@/components/commonTree'
  export default {
    components: {
      comTree,
    },
    data() {
      return {
        showCheckBox: true,
        checkStrictly: true,
        itemShow: true,
        treeExpandAll: true,
        treeNodeKey: 'id', //树的唯一标志
        treeData: [
          {
            id: 1,
            label: '一级 1',
            children: [
              {
                id: 4,
                label: '二级 1-1',
                children: [
                  {
                    id: 9,
                    label: '三级 1-1-1',
                  },
                  {
                    id: 10,
                    label: '三级 1-1-2',
                  },
                ],
              },
            ],
          },
          {
            id: 2,
            label: '一级 2',
            children: [
              {
                id: 5,
                label: '二级 2-1',
              },
              {
                id: 6,
                label: '二级 2-2',
              },
            ],
          },
          {
            id: 3,
            label: '一级 3',
            children: [
              {
                id: 7,
                label: '二级 3-1',
              },
              {
                id: 8,
                label: '二级 3-2',
              },
            ],
          },
        ],
        defaultProps: {
          children: 'children',
          label: 'label',
        },
      }
    },
    created() {},
    mounted() {},
    methods: {
      // 点击某一个子节点
      handleNodeClick(data) {
        console.log('[ 点击节点 ]', data)
      },

      // 复选框勾选
      handleCheck(nodeObj, SelectedObj) {
        console.log(nodeObj)
        console.log(SelectedObj.checkedKeys) // 这是选中节点的key数组
        console.log(SelectedObj.checkedNodes) // 这是选中节点数组
      },

      // 增加树节点设置默认父级节点
      addTreeItem(data) {
        console.log('[ 新增 ]', data)
      },

      // 修改树节点
      editTreeItem(data) {
        console.log('[ 编辑 ]', data)
      },

      // 删除树节点
      deleteTreeItem(data) {
        console.log('[ 删除 ]', data)
        this.$confirm('确认要删除当前节点 ' + data.label + ' 吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            // 删除树节点
            // DeleteTreeselect({ uid: data.uid }).then(response => {
            //     this.$message({ type: 'success', message: '删除成功' });
            //     this.clean();
            //     this.$refs.customTree.treeDeleteItem(data);
            // });
          })
          .catch(() => {})
      },
    },
  }
</script>

<style lang="scss" scoped>
  .tree-box {
    padding-top: 20px;
    display: flex;
    justify-content: center;
    .tree-box-content {
      width: 350px;
      .title-css {
        font-size: 18px;
        font-weight: bold;
        color: yellowgreen;
        margin-bottom: 20px;
      }
    }
  }
</style>
