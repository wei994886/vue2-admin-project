<template>
  <div class="select-tree">
    <div class="form-box">
      <el-form :model="formData" class="demo-form-inline">
        <el-form-item label="单选">
          <selectTree
            v-model="formData.singleSelectionValue"
            :options="treeList"
            placeholder="请选择tree结构"
            width="90%"
            :defaultData="formData.singleSelectionValue"
            :treeProps="treeProps"
            @handleNodeClick="selectDrop1"
          />
        </el-form-item>
        <el-form-item label="多选">
          <selectTree
            v-model="formData.multipleChoiceValue"
            :options="treeList"
            placeholder="请选择tree多选结构"
            width="90%"
            :defaultValue="formData.multipleChoiceValue"
            :treeProps="treeProps"
            @handleNodeClick="selectDrop2"
            multiple
            :checkStrictly="true"
          />
        </el-form-item>
        <el-form-item>
          <div class="button-box">
            <el-button type="primary" size="small" @click="onSubmit"
              >查询</el-button
            >
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import selectTree from '@/components/commonSelectTree'
  export default {
    name: 'app',
    components: {
      selectTree,
    },
    data() {
      return {
        formData: {
          singleSelectionValue: { id: '1', label: '一级 1' },
          multipleChoiceValue: ['1', '2'],
        },
        // 单选回显或者默认值
        // defaultValue1: { id: '1', label: '一级 1' },
        // 多选回显或者默认值
        // defaultValue2: ['1', '2'], // 默认值
        treeProps: {
          value: 'id',
          children: 'children',
          label: 'name',
        },
        // 选项列表
        treeList: [
          {
            id: '1',
            name: '一级 1',
            children: [
              {
                id: '1-1',
                name: '二级 1-1',
                children: [
                  {
                    id: '1-1-1',
                    name: '三级 1-1-1',
                  },
                ],
              },
            ],
          },
          {
            name: '一级 2',
            id: '2',
            children: [
              {
                id: '2-1',
                name: '二级 2-1',
                children: [
                  {
                    id: '2-1-1',
                    name: '三级 2-1-1',
                  },
                ],
              },
              {
                id: '2-2',
                name: '二级 2-2',
                children: [
                  {
                    id: '2-2-1',
                    name: '三级 2-2-1',
                  },
                ],
              },
            ],
          },
        ],
      }
    },
    methods: {
      // 单选 取值
      selectDrop1(val) {
        console.log('单选选中---->', val)
        this.formData.singleSelectionValue = val
      },

      // 多选 取值
      selectDrop2(val) {
        console.log('多选选中---->', val)
        this.formData.multipleChoiceValue = val
      },

      onSubmit() {
        console.log('[ formData ]', this.formData)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .select-tree {
    margin-top: 30px;
    .form-box {
      width: 50%;
      margin: 0 auto;
      .button-box {
        text-align: center;
      }
    }
  }
</style>
