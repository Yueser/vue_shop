<template>
  <div id='Rights'>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-table
          :data="showList.slice((size-1)*10,size*10)" border stripe
          :header-cell-style="{'text-align':'center'}"
          :cell-style="{'text-align':'center'}">
        <el-table-column type="index"/>
        <el-table-column label="权限名称" prop="authName"/>
        <el-table-column label="路径" prop="path"/>
        <el-table-column
            prop="level"
            label="权限等级">
          <template v-slot="scope">
            <el-tag
                :type="scope.row.level === '0' ? '' : scope.row.level==='1'?'success':'warning'"
                disable-transitions>
              {{ scope.row.level === '0' ? '一级' : scope.row.level === '1' ? '二级' : '三级' }}
            </el-tag>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
          layout="total, prev, pager, next"
          @current-change="handleCurrentChange"
          :total="showList.length">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Rights",
  data() {
    return {
      rightList: [],
      showList: [],
      size:1,
    }
  },
  methods: {
    handleCurrentChange(size) {
      this.size=size;
    },
  },
  async created() {
    let {data: res} = await this.$axios.get(`rights/list`)
    this.rightList = res.data;
    this.showList = this.rightList.filter(() => true)
  }
}
</script>

<style lang="less" scoped>
#Rights {

}
</style>