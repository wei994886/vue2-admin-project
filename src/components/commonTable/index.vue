<template>
  <div v-loading='loading' element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">
    <el-table v-bind="$attrs" :border="config.border" style="width: 100%;height: 100%"
      :header-cell-style="config.headerCellStyle" :max-height="config.tableHeight" :stripe="config.isStripe"
      :span-method="spanMethod" :row-class-name="rowClassName" :summary-method="summaryMethod"
      :show-summary='config.isShowSummary' @row-click="rowClick" @sort-change="sortChange"
      @selection-change="selectionChange">
      <el-table-column align='center' type="selection" width="55" v-if="config.isSelection" />
      <el-table-column align='center' type="index" label="序号" width="55" v-if="config.isIndex" />
      <el-table-column align='center' v-for='(item, index) in tableHeader' :key='index' :prop="item.prop"
        :width="item.colWidth" :label="item.title" :sortable="item.isSort ? 'custom' : false" show-overflow-tooltip>
        <!-- 一级 -->
        <template slot-scope="scope">
          <template v-if="item.type === 'link'">
            <span class="linkText" type="primary" @click.stop="linkClick(scope.row, item.title)">{{ scope.row[item.prop]
            }}</span>
          </template>
          <template v-else>
            <span>{{ scope.row[item.prop] }}</span>
          </template>
        </template>

        <!-- 二级 子项 -->
        <template v-for="(v, i) in item.children">
          <el-table-column align='center' :key="i" :prop="v.prop" :width="v.colWidth" :label="v.title"
            :sortable="v.isSort ? 'custom' : false" show-overflow-tooltip>
            <template slot-scope="scope" @click.stop>
              <template v-if="v.type === 'link'">
                <span class="linkText" type="primary" @click.stop="linkClick(scope.row, v.title)">{{ scope.row[v.prop]
                }}</span>
              </template>
              <template v-else>
                <span>{{ scope.row[v.prop] }}</span>
              </template>
            </template>
          </el-table-column>
        </template>
      </el-table-column>
      <slot></slot>
    </el-table>

    <!-- 分页 -->
    <div v-if="pageObj.pagingOrNot" class="page_div" :style="{ textAlign: pageObj.position }">
      <el-pagination background layout="total,sizes,prev, pager, next" :hide-on-single-page="false"
        :current-page="pageObj.pageData.page" :page-sizes="pageObj.sizes" :total="pageObj.total"
        :page-size="pageObj.pageData.size" @size-change="handleSizeChange" @current-change="handleCurrentChange">
      </el-pagination>
    </div>
  </div>
</template>
 
<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: false,
    },

    config: {
      type: Object,
      default: () => {
        return {
          isIndex: true,           //是否显示序号
          isSelection: true,       //是否显示复选框
          isRowClick: false,       //是否使用行点击
          isStripe: false,         //是否隐藏斑马纹，与背景色不可同时用
          tableHeight: 800,        //是否表格高度
          isShowSummary: false,    //是否显示合计
          border: false,           //是否带边框
          headerCellStyle: {       //表头样式
            color: '#606266',
            background: '#F5F7FA'
          }
        }
      },
    },

    // 行的 className 的回调方法，也可以使用字符串为所有行设置一个固定的 className。	Function({ row, rowIndex })/ String
    rowClassName: {
      type: Function
    },

    // 自定义的合计计算方法	Function({ columns, data })
    summaryMethod: {
      type: Function
    },

    // 合并行或列的计算方法	Function({ row, column, rowIndex, columnIndex })
    spanMethod: {
      type: Function
    },

    tableHeader: {
      type: Array,
      default: () => [],
    },
    // tableHeader: [
    //   {
    //     prop: 'name',       //字段
    //     colWidth: '140',    //宽度
    //     title: '名称',       //表头
    //     isSort: false,      //是否排序
    //     type: 'link',       //link:跳转，可点击
    //   }
    // ]

    tableData: {
      type: Array,
      default: () => [],
    },

    // 分页配置项
    pageObj: {
      type: Object,
      default: () => {
        return {
          pagingOrNot: true,  //是否分页
          position: "right", //分页组件位置 left center right
          sizes: [10, 20, 30, 50],
          total: 100,
          pageData: {
            page: 1,
            size: 10
          }
        }
      }
    }
  },
  data() {
    return {}
  },
  mounted() {

  },
  methods: {
    // 点击事件
    linkClick(row, title) {
      this.$emit('link-click', row, title);
    },

    // 选择复选框 当选择项发生变化时会触发该事件
    selectionChange(selection) {
      this.$emit('selection-change', selection);
    },

    // 当某一行被点击时会触发该事件
    rowClick(row) {
      if (this.config.isRowClick) this.$emit('row-click', row);
    },

    // 当表格的排序条件发生变化的时候会触发该事件
    sortChange(value) {
      if (value.order) this.$emit('sort-change', value);
    },

    // 条数变化
    handleSizeChange(e) {
      this.$emit('handleSizeChange', e);
    },
    // 页码变化
    handleCurrentChange(e) {
      this.$emit('handleCurrentChange', e);
    }
  }
}
</script>
<style lang="scss" scoped>
.linkText {
  color: #409EFF;
  cursor: pointer;
}

.page_div {
  padding: 15px 0;
}
</style>