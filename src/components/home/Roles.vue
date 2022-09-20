<template>
  <div id='Roles'>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row>
        <el-col :span="4">
          <el-button type="primary" @click="openRoleDialog('addRole')">添加角色</el-button>
        </el-col>
      </el-row>
      <el-table :data="userListerList" border stripe
                :header-cell-style="{'text-align':'center'}"
                :cell-style="{'text-align':'center'}">
        <el-table-column type="expand">
          <template v-slot="scope">
            <!--todo 此处可用递归标签解决，待优化-->
            <el-row v-for="(itemO,ind) in scope.row.children" :key="itemO.id" :class="[ind?'':'rowhand','rowfood']">
              <el-col :span="4">
                <el-tag closable
                        @close="deleteTag(itemO.id,scope.row.children,scope.row.id)">{{ itemO.authName }}
                </el-tag>
                <i class="el-icon-caret-right"/>
              </el-col>
              <el-col :span="20">
                <el-row v-for="(itemT,ind) in itemO.children" :key="itemT.id" :class="[ind?'rowhand':'']">
                  <el-col :span="4">
                    <el-tag closable @close="deleteTag(itemT.id,itemO.children,scope.row.id)" type="success">{{
                        itemT.authName
                      }}
                    </el-tag>
                    <i class="el-icon-caret-right"/>
                  </el-col>
                  <el-col :span="20">
                    <el-tag closable v-for="(itemS) in itemT.children"
                            @close="deleteTag(itemS.id,itemT.children,scope.row.id)"
                            :key="itemS.id" type="warning"
                            style="margin-left: 4px">{{ itemS.authName }}
                    </el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column type="index" label="#"/>
        <el-table-column prop="roleName" label="角色名称"/>
        <el-table-column prop="roleDesc" label="角色描述"/>
        <el-table-column label="权限" min-width="150px">
          <template v-slot="scope">
            <el-button size="mini" type="primary" icon="el-icon-edit"
                       @click="openRoleDialog('changeRole',scope.row)">编辑
            </el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete" @click="deleteRole(scope.row.id)">删除
            </el-button>
            <el-button size="mini" type="warning" icon="el-icon-setting"
            @click="openPurDialog(scope.row)">分配权限</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <RolesDialog ref="roleDialog" @Renew="getRoleListerList"/>
    <PurDialog ref="purDialog" @Renew="getRoleListerList"/>
  </div>
</template>

<script>
import RolesDialog from "@/components/home/roles/RolesDialog";
import PurDialog from "@/components/home/roles/PurDialog";

export default {
  name: "Roles",
  data() {
    return {
      userListerList: []
    }
  },
  methods: {
    async deleteTag(rightid, arr, roleid) {
      let {status, data: res} = await this.$axios.delete(`roles/${roleid}/rights/${rightid}`)
      if (status !== 200) return this.$message.error('网络连接错误')
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)

      arr.map((ele, i) => {
        if (ele.id === rightid) {
          arr.splice(i, 1)
        }
      })
    },
    async getRoleListerList() {
      let {status, data: res} = await this.$axios.get('roles')
      if (status !== 200) return this.$message.error('网络连接错误')
      if (res.meta.status !== 200) return this.$message.error('获取用户列表失败')
      this.userListerList = res.data
    },
    openRoleDialog(val, roleInfo) {
      this.$refs.roleDialog.openDialog(val, roleInfo);
    },
    openPurDialog(user){
      this.$refs.purDialog.openDialog(user)
    },
    async deleteRole(id) {
      let {status, data: res} = await this.$axios.delete(`roles/${id}`);
      if (status !== 200) return this.$message.error('网络连接错误')
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.$message.success(res.meta.msg)
      await this.getRoleListerList()
    }
  },
  created() {
    this.getRoleListerList()
  },
  components: {
    RolesDialog,PurDialog
  }
}
</script>

<style lang="less" scoped>
#Roles {
  .rowhand {
    border-top: 1px solid #eee;
  }

  .rowfood {
    border-bottom: 1px solid #eee;
  }

  .el-row {
    display: flex;
    align-items: center;
    .el-tag {
      margin: 10px 10px 10px 40px;
    }
  }
}
</style>