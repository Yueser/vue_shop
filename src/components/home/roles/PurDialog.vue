<template>
  <div id='PurDialog'>
    <el-dialog
        title="修改权限"
        :visible.sync="dialogVisible"
        width="50%"
        @close="closeCont">
      <el-tree
          ref="tree"
          :data="purList"
          :props="purListPros"
          show-checkbox
          node-key="id"
          default-expand-all
          :default-checked-keys="rolePurList"
      />
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeCont">取 消</el-button>
        <el-button type="primary" @click="changePur">确 认</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "PurDialog",
  data() {
    return {
      dialogVisible: false,
      purList: Array,
      id: Number,
      rolePurList: Array,
      purListPros: {
        children: 'children',
        label: 'authName'
      }
    }
  },
  methods: {
    closeCont() {
      this.dialogVisible=false;
      this.rolePurList = [];
      this.$refs.tree.setCheckedKeys([]);
    },
    dismantling(oriArr, isGet) {
      let newArr = [];
      if (isGet) {
        oriArr.forEach(ele => {
          let {id} = ele
          newArr.push(id);
        })
      } else {
        oriArr.forEach(ele => {
          let {children, id} = ele;
          if (children) {
            newArr = [...newArr, ...this.dismantling(children)]
          } else {
            newArr.push(id);
          }
        })
      }
      return newArr;
    },
    openDialog(user) {
      this.rolePurList = [...this.dismantling(user.children)]
      this.id = user.id;
      this.dialogVisible = true;
    },
    async changePur() {
      let str = this.dismantling(this.$refs.tree.getCheckedNodes(false, true), 1).join(',')
      let {status,data:res}=await this.$axios.post(`roles/${this.id}/rights`,{rids:str})
      if (status !== 200) return this.$message.error('网络连接错误');
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg);
      this.$message.success(res.meta.msg);
      this.$emit('Renew');
      this.closeCont()
    },
    async getPurList() {
      let {status, data: res} = await this.$axios.get('rights/tree');
      if (status !== 200) return this.$message.error('网络连接错误');
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg);

      this.purList = res.data;
    }
  },
  created() {
    this.getPurList();
  }
}
</script>

<style lang="less" scoped>
#PurDialog {

}
</style>