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

    <el-dialog :visible.sync="addFormVisible">
      <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="addForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="addForm.sex">
            <el-radio class="radio" :label="1">男</el-radio>
            <el-radio class="radio" :label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input-number v-model="addForm.age" :min="0" :max="200"></el-input-number>
        </el-form-item>
        <el-form-item label="生日">
          <el-date-picker type="date" placeholder="选择日期" v-model="addForm.birth"></el-date-picker>
        </el-form-item>
        <el-form-item label="地址">
          <el-input type="textarea" v-model="addForm.addr"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="editVisible">
    </el-dialog>

  </section>
</template>


<script>
  import util from '../common/js/util'
  import {getUserListPage,deleteUserByBatch,addUser,editUser} from "../axios/api";
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
            },
            submitType:"foradd",
            addFormVisible:false,
            addLoading: false,
            editVisible:false,
            addFormRules: {
              name: [
                { required: true, message: '请输入姓名', trigger: 'blur' }
              ]
            },
            //新增界面数据
            addForm: {
              name: '',
              sex: -1,
              age: 0,
              birth: '',
              addr: ''
            }
          }
      },
      methods:{
        formatSex: function (row, column) {
          return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
        },
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
        handleAdd:function(){
          this.addFormVisible=true;
          if(this.submitType=="foredit"){
            this.addForm= {
              name: '',
              sex: -1,
              age: 0,
              birth: '',
              addr: ''
            };
            this.$refs.addForm.resetFields();
            this.submitType="foradd";
          }
        },
        handleEdit:function(index,row){
          this.addForm=Object.assign({}, row);
          this.addFormVisible=true;
          this.submitType="foredit";
        },
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
        },
        addSubmit:function() {
          this.$refs.addForm.validate((valid) => {

            if (valid) {
              this.$confirm('确认提交吗？', '提示', {}).then(() => {

                this.addLoading = true;
                //NProgress.start();
                let para = Object.assign({}, this.addForm);
                para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
                var actionType=null;
                if(this.submitType=="foradd"){
                  //for add
                  actionType=addUser;
                }
                else{
                  //for edit
                  actionType=editUser;
                }
                actionType(para).then((res) => {
                  this.addLoading = false;
                  //NProgress.done();
                  this.$message({
                    message: '提交成功',
                    type: 'success'
                  });
                  this.$refs.addForm.resetFields();
                  this.addFormVisible = false;
                  this.getUsers();
                });
              });
            } else {
              return false;
            }
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

