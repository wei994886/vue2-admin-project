<template>
  <div>
    <commonTable ref='tableRef' :config="config" :loading="loading" :data="tableData" :tableHeader="tableHeader"
      :row-class-name="rowClassName" @row-click='handleRowClick' @link-click='handleLinkClick'
      @sort-change='handleSortChange' @selection-change='handleSelectionClick' :pageObj="pageObj"
      @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange">
      <el-table-column fixed="right" label="操作" width="100" align="center">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        </template>
      </el-table-column>
    </commonTable>
  </div>
</template>
<script>
import commonTable from '@/components/commonTable';
export default {
  components: {
    commonTable
  },
  data() {
    return {
      loading: false,
      config: {
        isIndex: true,           //是否显示序号
        isSelection: true,       //是否显示复选框
        isRowClick: false,       //是否使用行点击
        isStripe: false,         //是否隐藏斑马纹，与背景色不可同时用
        tableHeight: 800,        //是否表格高度
        isShowSummary: false,    //是否显示合计
        headerCellStyle: {       //表头样式
          color: '#606266',
          background: '#F5F7FA'
        }
      },
      tableHeader: [
        {
          prop: 'name',       //字段
          colWidth: '140',    //宽度
          title: '名称',       //表头
          isSort: false,      //是否排序
          type: 'link',       //link:跳转,可点击
        },
        {
          title: '其他',
          children: [         //children  二级
            {
              prop: 'date',
              colWidth: '160',
              title: '日期',
              isSort: false
            },
            {

              prop: 'address',
              colWidth: '',
              title: '详细地址',
              isSort: false
            },
            {
              prop: 'price',
              colWidth: '140',
              title: '价格',
              isSort: true
            },
          ]
        },
        {
          prop: 'province',
          colWidth: '100',
          title: '省份',
        },
        {
          prop: 'city',
          colWidth: '100',
          title: '市区'
        },
      ],
      tableData: [{
        date: '2016-05-03',
        name: '王小虎1',
        province: '上海1',
        city: '普陀区1',
        address: '上海市普陀区金沙江路 1511 弄',
        price: 11111,
        color: 'orange'
      }, {
        date: '2016-05-02',
        name: '王小虎2',
        province: '上海2',
        city: '普陀区2',
        address: '上海市普陀区金沙江路 1512 弄',
        price: 22222
      }, {
        date: '2016-05-04',
        name: '王小虎3',
        province: '上海3',
        city: '普陀区3',
        address: '上海市普陀区金沙江路 1513 弄',
        price: 33333,
        color: 'yellowgreen'
      }, {
        date: '2016-05-01',
        name: '王小虎4',
        province: '上海4',
        city: '普陀区4',
        address: '上海市普陀区金沙江路 1514 弄',
        price: 44444
      }, {
        date: '2016-05-081111111111111111111111111111111111111111',
        name: '王小虎5',
        province: '上海5',
        city: '普陀区5',
        address: '上海市普陀区金沙江路 1515 弄',
        price: 55555,
        color: 'red'
      }, {
        date: '2016-05-06',
        name: '王小虎6',
        province: '上海6',
        city: '普陀区6',
        address: '上海市普陀区金沙江路 1516 弄',
        price: 66666
      }],
      orderList: [{ column: '', asc: false }],  // 默认, asc:false 倒序
      queryParams: {
        current: 1,
        size: 20
      },
      //分页对象
      pageObj: {
        pagingOrNot: true,
        position: "right",
        sizes: [10, 15, 20, 30, 50],
        total: 100,
        pageData: {
          page: 1,
          size: 10
        }
      },
    }
  },
  mounted() {

  },
  methods: {
    onClick(row) {
      console.log('插槽点击---->', row);
    },
    handleSortChange(value) {

      //手动只能排序数字，还是需要通接口的
      const params = value.prop;
      if (value.order == 'descending') {
        this.tableData.sort((a, b) => {
          return b[params] - a[params]
        })

      } else if (value.order == 'ascending') {
        this.tableData.sort((a, b) => {
          return a[params] - b[params]
        })
      }
    },
    handleLinkClick(row, title) {
      console.log('[ 点击-row ]', row)
      // console.log('[ 点击-title ]', title)
    },
    handleSelectionClick(selection) {
      console.log('勾选-->', selection);
    },
    handleRowClick(row) {
      console.log('行点击-->', row);
    },
    //注：背景色与斑马纹不能同在
    rowClassName({ row, rowIndex }) {
      // console.log('[ rowIndex ]', rowIndex)
      // console.log('[ row ]', row)
      row.index = rowIndex;
      if (row.color) return row.color + '-bg';
    },
    handleClick(item) {
      console.log('[ item ]', item)
    },
    //页码变化
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    //条数变化
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
  },
}
</script>
<style lang="scss" scoped>
::v-deep .orange-bg {
  background-color: orange !important;
}

::v-deep .yellowgreen-bg {
  background-color: yellowgreen !important;
}

::v-deep .red-bg {
  background-color: #F56C6C !important;
}
</style>