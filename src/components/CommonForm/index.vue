<!-- 表单组件 -->
<template>
  <div class="form-search">
    <div v-if="formItem && formItem.length > 0" class="search-table-header">
      <div>
        <el-form
          :inline="true"
          :model="form"
          label-width="120px"
          label-position="right"
        >
          <el-row class="elRowCss">
            <el-col
              v-for="(item, index) in formItem"
              :key="index"
              :span="item.width || 6"
            >
              <el-form-item
                :key="index"
                :label="item.label"
                :prop="item.value"
                style="width: 100%"
              >
                <!--输入框-->
                <el-input
                  v-if="item.type === 'input'"
                  v-model="form[item.value]"
                  clearable
                  :placeholder="item.placeholder || '请输入'"
                />
                <!-- 选择器 -->
                <el-select
                  v-if="item.type === 'select'"
                  v-model="form[item.value]"
                  clearable
                  :placeholder="item.placeholder || '请选择'"
                >
                  <el-option
                    v-for="(option, i) in item.children"
                    :key="i"
                    :value="option.value"
                    :label="option.label"
                  />
                </el-select>
                <!--多选框-->
                <el-checkbox-group
                  v-if="item.type === 'checkboxGroup'"
                  v-model="form[item.value]"
                >
                  <el-checkbox
                    v-for="(option, i) in item.children"
                    :key="i"
                    :label="option.value"
                    >{{ item.label }}</el-checkbox
                  >
                </el-checkbox-group>
                <!--日期选择器 区间-->
                <el-date-picker
                  v-if="item.type === 'datePicker'"
                  v-model="form[item.value]"
                  type="daterange"
                  range-separator="至"
                  value-format="YYYY-MM-DD"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                />
              </el-form-item>
            </el-col>
            <!-- 如果当前行表单项不足4个，则在当前行最后面放置确认取消按钮 -->
            <el-col
              v-if="formItem.length % 4 !== 0"
              :span="24 - (formItem.length % 4) * 6"
            >
              <div class="button-list">
                <el-button
                  class="two-level-button"
                  icon="RefreshLeft"
                  @click="clearData"
                  >重置</el-button
                >
                <el-button
                  class="one-level-button"
                  icon="Search"
                  @click="emit('searchForm', form)"
                  >查询</el-button
                >
              </div>
            </el-col>
          </el-row>
          <!-- 如果当前行表单项满足，则另起一行在最后面放置确认取消按钮 -->
          <template v-if="formItem.length % 4 === 0">
            <el-row>
              <el-col :span="24">
                <div class="button-list">
                  <el-button
                    class="two-level-button"
                    icon="RefreshLeft"
                    @click="clearData"
                    >重置</el-button
                  >
                  <el-button
                    class="one-level-button"
                    icon="Search"
                    @click="emit('searchForm', form)"
                    >查询</el-button
                  >
                </div>
              </el-col>
            </el-row>
          </template>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    // 组件名称
    name: 'comForm',
    // 组件参数 接收来自父组件的数据
    props: {
      formItem: {
        // form查询项
        type: Array,
        default: () => [],
      },
      formData: {
        // form查询数据
        type: Object,
        default: () => {},
      },
    },
    // 组件状态值
    data() {
      return {
        form: {},
      }
    },
    // 计算属性
    computed: {},
    // 侦听器
    watch: {},

    created() {},

    mounted() {},

    // 组件方法
    methods: {
      // 查询
      searchForm() {
        this.form = JSON.parse(JSON.stringify(this.formData))
        this.$emit('searchForm', this.form)
      },
      // 重置
      clearData() {
        this.form = JSON.parse(JSON.stringify(this.formData))
        Object.keys(form).map(key => {
          if (form[key].constructor === String) {
            form[key] = ''
          }
          if (form[key].constructor === Array) {
            form[key] = []
          }
        })
        this.$emit('clearForm', this.form)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .form-search {
    .elRowCss {
      display: flex; //设置布局
      flex-wrap: wrap; //进行换行操作
    }
    .button-list {
      text-align: right;
    }
  }
</style>
