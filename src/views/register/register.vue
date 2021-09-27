<template>
  <div class="app-container">
    <el-form ref="user" :model="user" :rules="validateRules" label-width="120px">
      <el-form-item label="学号/账号" prop="username">
        <el-input v-model="user.username"/>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="user.nickName"/>
      </el-form-item>

      <el-form-item v-if="!user.id" label="密码" prop="password">
        <el-input v-model="user.password"/>
      </el-form-item>
      <el-form-item v-if="!user.id" label="班级" prop="stuClass">
        <el-input v-model="user.stuClass"/>
      </el-form-item>
      <el-form-item v-if="!user.id" label="老师还是学生" prop="isStu">
        <el-select v-model="user.isStu" clearable placeholder="请选择">
          <el-option :value="0" label="老师"/>
          <el-option :value="1" label="学生"/>
        </el-select>
      </el-form-item>
      <el-form-item>
        <div style="margin: 15px 0;">请选择角色</div>
        <el-radio-group v-model="checkedCity" @change="handleCheckedCitiesChange">
          <el-radio v-for="city in cities" :label="city.id" :key="city.id">{{city.roleName}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>

    </el-form>

  </div>
</template>

<script>


import register from '../../api/register'
const defaultForm = {
  username: '',
  nickName: '',
  password: '',
  stuClass: '',
  isStu: ''
}

const validatePass = (rule, value, callback) => {
  if (value.length < 6) {
    callback(new Error('密码不能小于6位'))
  } else {
    callback()
  }
}

const validateUserName = (rule, value, callback) => {
  if (value.length > 10 || value.length<7) {
    callback(new Error('请输入学号应该在7-10位之间'))
  } else {
    callback()
  }
}

export default {

  data() {
    return {
      user: defaultForm,
      saveBtnDisabled: false, // 保存按钮是否禁用,
      validateRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUserName}],
        password: [{ required: true, trigger: 'blur', validator: validatePass }]
      },
      checkedCity: '', //已选中
      cities: [], //所有的
      addVo:{
        id:'',
        roleId:''
      }

    }
  },
  // 监听器
  watch: {
    $route(to, from) {
      console.log('路由变化......')
      console.log(to)
      console.log(from)
      this.init()
    }
  },

  // 生命周期方法（在路由切换，组件不变的情况下不会被调用）
  created() {
    console.log('form created ......')
    this.init()
    this.getAllRole()
  },

  methods: {

    // 表单初始化
    init() {
        // 对象拓展运算符：拷贝对象，而不是赋值对象的引用
        this.user = { ...defaultForm }

    },
    getAllRole(){
      register.getAllRole().then(response => {
        this.cities = response.data.allRole
      })
    },
    saveOrUpdate() {
      this.$refs.user.validate(valid => {
        if (valid) {
          this.saveBtnDisabled = true // 防止表单重复提交
          console.log(this.checkedCity)
          this.addVo.roleId = this.checkedCity
            this.saveData()
        }
      })
    },
    saveData() {
      register.registerUser(this.user).then(response => {
        if (response.success) {
          this.$message({
            type: 'success',
            message: response.message
          })
          this.addVo.id = response.data.userId
          console.log(this.addVo.id)
          register.add(this.addVo).then(response=>{
            console.log(this.addVo)
            this.$router.push({ path: '/login' })
          })

        }
      })

    },
    handleCheckAllChange(val) {
      this.checkedCities = val ? this.cities : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {

      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
    },


  }
}
</script>

