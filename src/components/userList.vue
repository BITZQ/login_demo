<template>
  <section>
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.name" placeholder="姓名" ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="getUsers">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleAdd">新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-table
      v-loading="loading"
      :data="userData"
      @selection-change="selsChange"
      style="width: 100%">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column type="index" width="60">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        sortable
       >
      </el-table-column>
      <el-table-column
        prop="sex"
        label="性别"
        sortable
        :formatter=" formatSex"
        >
      </el-table-column>
      <el-table-column
        prop="age"
        label="年龄"
        sortable
       >
      </el-table-column>
      <el-table-column
        prop="birth"
        label="出生日期"
        sortable
       >
      </el-table-column>
      <el-table-column
        prop="addr"
        label="联系地址"
        sortable
       >
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template scope="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
      <el-pagination
        background
        layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right">
      </el-pagination>
    </el-col>
  </section>
</template>


<script>
  import {getUserListPage,deleteUserByBatch} from "../axios/api";
  export default {
      name:"userList",
      data(){
          return {
            loading: false,
            page: 1,
            total:0,
            userData:[],
            sels: [],//列表选中列
            filters: {
              name: ''
            }

          }
      },
      methods:{
        formatSex: function (row, column) {
          return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
        },
        handleAdd:function(){},
        handleDel:function(index,row){
          let ids=row.id;
          this.$confirm('确认删除选中记录吗？', '提示', {
            type: 'warning'
          }).then(() => {
            this.listLoading = true;
            //NProgress.start();
            let para = { idList: ids };
            deleteUserByBatch(para).then((res) => {
              this.listLoading = false;
              //NProgress.done();
              this.$message({
                message: '删除成功',
                type: 'success'
              });
              this.getUsers();
            });
          }).catch(() => {

          });
        },
        handleEdit:function(){},
        handleCurrentChange:function(page){
          this.page=page;
          this.getUsers();
        },
        getUsers:function(){
          var params={};
          params.name=this.filters.name;
          params.page=this.page;
          this.loading=true;
          getUserListPage(params).then(
              res=>{
                  this.userData=res.data.users;
                  this.loading = false;
                  this.total = res.data.total;
              }
          )
        },
        selsChange: function (sels) {
          this.sels = sels;
        },
        //批量删除
        batchRemove: function () {
          var ids = this.sels.map(item => item.id).toString();
          this.$confirm('确认删除选中记录吗？', '提示', {
            type: 'warning'
          }).then(() => {
            this.listLoading = true;
            //NProgress.start();
            let para = { idList: ids };
            deleteUserByBatch(para).then((res) => {
              this.listLoading = false;
              //NProgress.done();
              this.$message({
                message: '删除成功',
                type: 'success'
              });
              this.getUsers();
            });
          }).catch(() => {

          });
        }
      },
      mounted:function(){
          this.getUsers();
      }
  }

</script>
.toolbar{
  background: #f2f2f2;
  padding: 10px;
  margin: 10px 0px;
}

<style>

</style>

