<template>
  <div style="margin-left: 80px"
       v-loading="loading"
       element-loading-text="拼命加载中"
       element-loading-spinner="el-icon-loading">
    <el-table
        :data="movieList"
        border>
      <el-table-column
          width="80"
          label="热映中">
        <template slot-scope="scope">
          <el-tag type="danger" v-if="scope.row.ishot==1">热映中</el-tag>
        </template>
      </el-table-column>
      <el-table-column
          prop="mname"
          label="电影名"
          width="150">
      </el-table-column>
      <el-table-column
          label="类型"
          width="auto">
        <template slot-scope="scope">
          <el-tag
              style="margin: 2px;display: inline-block"
              size="mini"
              v-for="item in scope.row.mclass.split('/')"
              :key="item"
              type="danger"
              effect="plain">
            {{item}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column

          label="电影海报"
          width="120">
        <template slot-scope="scope">
          <el-image
              style="width: 75px; height: 100px"
              :src="`http://localhost:8080/ssm/${scope.row.mimg}`"
              :preview-src-list="[`http://localhost:8080/ssm/${scope.row.mimg}`]">
          </el-image>
        </template>
      </el-table-column>
      <el-table-column
          prop="mduration"
          label="电影时长"
          width="120">
      </el-table-column>
      <el-table-column
          prop="mpeople"
          label="导演"
          width="120">
      </el-table-column>
      <el-table-column
          prop="mactor"
          label="主演"
          width="120">
      </el-table-column>
      <el-table-column
          prop="mnation"
          label="国家"
          width="120">
      </el-table-column>
      <el-table-column
          prop="mprice"
          label="价格"
          width="120">
      </el-table-column>
      <el-table-column
          prop="mtime"
          label="上映时间"
          width="120">
      </el-table-column>
      <el-table-column
          prop="mgrade"
          label="电影评分"
          width="120">
      </el-table-column>
      <el-table-column
          label="操作"
          width="230px">
        <template slot-scope="scope">
          <el-button
              size="mini"
              @click="handleEdit(scope.row)">编辑
          </el-button>
          <el-button
              size="mini"
              type="primary"
              @click="showSession(scope.row)">排片
          </el-button>
          <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>


    <div style="width:500px;margin: 0 auto">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          background
          :current-page="currentindex"
          :page-sizes="[5,10, 15, 20, 30]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
      </el-pagination>
    </div>


    <el-dialog
        :visible.sync="dialogVisible"
        width="50%"
        :before-close="handleClose">
      <h2 slot="title" style="margin: 0;padding: 0;text-align: center">电影编辑</h2>
      <el-form
          label-position="left"
          label-width="80px"
          id="form"
          ref="form">
        <el-form-item label="电影海报:">
          <el-image :src="`http://localhost:8080/ssm/${movie.mimg}`" fit="fill"
                    style="width: 135px;height: 195px;display: inline-block"></el-image>
        </el-form-item>
        <el-form-item label="电影名:">
          <el-input v-model="movie.mname"></el-input>
        </el-form-item>
        <el-form-item label="电影类型:">
          <div>
            <el-checkbox-group v-model="mclass">
              <el-checkbox-button v-for="mclass in mclassList" :label="mclass" :key="mclass" style="margin-right: 10px">
                {{ mclass }}
              </el-checkbox-button>
            </el-checkbox-group>
          </div>
        </el-form-item>
        <el-form-item label="是否热映:">
          <el-select v-model="ishot" placeholder="请选择">
            <el-option label="否" value="0">
            </el-option>
            <el-option label="是" value="1">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="电影时长:">
          <el-input v-model="movie.mduration"></el-input>
        </el-form-item>
        <el-form-item label="导演:">
          <el-input v-model="movie.mpeople"></el-input>
        </el-form-item>
        <el-form-item label="主演:">
          <el-input v-model="movie.mactor"></el-input>
        </el-form-item>
        <el-form-item label="地区:">
          <el-input v-model="movie.mnation"></el-input>
        </el-form-item>
        <el-form-item label="价格:">
          <el-input v-model.number="movie.mprice" name="mname"></el-input>
        </el-form-item>
        <el-form-item label="上映时间:">
          <el-input v-model="movie.mtime"></el-input>
        </el-form-item>
        <el-form-item label="电影评分:">
          <el-rate
              v-model="value"
              allow-half
              show-score
              text-color="#ff9900"
              :max=10>
          </el-rate>
        </el-form-item>
        <el-form-item label="故事简介:">
          <el-input type="textarea" :autosize="{ minRows: 1, maxRows: 10}" v-model="movie.mintroduce"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitEdit">确 定</el-button>
        </span>
    </el-dialog>
    <el-dialog
        :visible.sync="session.sessionVisible"
        width="35%"
        :before-close="handleClose">
      <h2 slot="title" style="text-align: center">电影场次信息</h2>
      <el-image :src="`http://localhost:8080/ssm/${session.imgUrl}`" fit="fill"
                style="width: 135px;height: 195px;display: inline-block"></el-image>
      <h2>{{ session.mname }}</h2>
      <el-form :model="session" ref="sessionForm" :rules="rules" label-width="120px">
        <el-form-item label="排片人:" prop="name">
          <el-tag effect="dark">
            {{ session.manager }}
          </el-tag>
        </el-form-item>
        <el-form-item label="电影票售价:" prop="name">
          <el-tag effect="plain" style="color: #F56C6C" type="danger">
            <span style="font-size: 26px">{{ session.mprice }}</span>￥
          </el-tag>
        </el-form-item>
        <el-form-item label="电影时长:">
          <el-tag effect="plain" style="color: #F56C6C;width: 100px;font-weight: bold" type="danger">
            <span style="font-size: 15px">{{ session.duration }}</span>
          </el-tag>
        </el-form-item>
        <el-form-item label="放映厅:" prop="room">
          <el-select v-model="session.room" placeholder="请选择活动区域">
            <el-option label="一号放映厅" value="一号放映厅"></el-option>
            <el-option label="二号放映厅" value="二号放映厅"></el-option>
            <el-option label="三号放映厅" value="三号放映厅"></el-option>
            <el-option label="四号放映厅" value="四号放映厅"></el-option>
            <el-option label="五号放映厅" value="五号放映厅"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="放映开始时间:" prop="mtime">
          <el-date-picker
              v-model="session.mtime"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm"
              placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
      <el-button @click="session.sessionVisible=false">取 消</el-button>
      <el-button type="primary" @click="sessionSubmit">确 定</el-button>
      <el-button @click="resetForm">重置</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import requests from "@/api/request";

export default {
  name: "MovieList",
  methods: {
    handleEdit(movie) {
      this.dialogVisible = true
      this.mclass = movie.mclass.split('/')
      this.value = parseFloat(movie.mgrade)
      this.ishot=movie.ishot+''
      this.movie = movie
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
          // eslint-disable-next-line no-unused-vars
          .then(_ => {
            done();
          })
          // eslint-disable-next-line no-unused-vars
          .catch(_ => {
          });
    },
    submitEdit() {
      this.$confirm('是否确定保存？', '系统提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        cancelButtonClass: 'btn-custom-cancel',
        type: 'warning'
      }).then(() => {
        this.movie.mgrade = this.value
        this.movie.ishot=this.ishot
        let mclassStr = this.mclass.join('/')
        requests({
          method: 'post',
          url: 'http://localhost:8081/ssm/MovieEdit',
          data: {
            id: this.movie.id,
            mname: this.movie.mname,
            mclass: mclassStr,
            mpeople: this.movie.mpeople,
            mnation: this.movie.mnation,
            mgrade: this.movie.mgrade,
            mprice: this.movie.mprice,
            mtime: this.movie.mtime,
            mactor: this.movie.mactor,
            mduration: this.movie.mduration,
            mintroduce: this.movie.mintroduce,
            mimg: this.movie.mimg,
            ishot:this.movie.ishot
          }
        }).then(() => {
          requests({
            method: 'get',
            url: `http://localhost:8081/ssm/page/${this.currentindex}/${this.pageSize}`
          }).then(response => {
            this.movieList = response.data.list
            this.loading = false
            this.total = response.data.total
            this.$message.success("编辑成功!")
          }).catch(error => {
            error.message
          })
        })
        this.dialogVisible = false
      }).catch(() => {
        this.$message.error("取消保存!")
      })
    },
    handleDelete(movie) {
      this.$confirm('是否确定删除？', '系统提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        cancelButtonClass: 'btn-custom-cancel',
        type: 'warning'
      }).then(() => {
        requests({
          url: 'http://localhost:8081/ssm/DeleteMovie',
          method: 'post',
          params: {'mid': movie.id}
        }).then(() => {
          this.$message.success("删除成功!")
          this.total = this.total - 1
          this.movieList = this.movieList.filter(item => item.id != movie.id)
        })
      }).catch(() => {
        this.$message.error("取消删除!")
      })
    },
    handleCurrentChange(currentindex) {
      this.currentindex = currentindex
      this.loading = true
      requests({
        method: 'get',
        url: `http://localhost:8081/ssm/page/${currentindex}/${this.pageSize}`,
      }).then(response => {
        this.movieList = response.data.list
        this.loading = false
        this.total = response.data.total
      }).catch(error => {
        error.message
      })
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize
      this.loading = true
      requests({
        method: 'get',
        url: `http://localhost:8081/ssm/page/${this.currentindex}/${this.pageSize}`,
      }).then(response => {
        this.movieList = response.data.list
        this.loading = false
        this.total = response.data.total
      }).catch(error => {
        error.message
      })
    },
    resetForm() {
      this.$refs.sessionForm.resetFields()
    },
    sessionSubmit() {
      this.$refs.sessionForm.validate((valide) => {
        if (valide) {
          this.$confirm('是否确定发布该电影场次？', '系统提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            cancelButtonClass: 'btn-custom-cancel',
            type: 'warning'
          }).then(() => {
            requests({
              method: 'post',
              data: {
                mid: this.session.mid,
                manager: this.session.manager,
                begTime: this.session.mtime,
                room: this.session.room
              },
              url: 'http://localhost:8081/ssm/AddMovieSession'
            }).then(() => {
              this.$message.success("场次发布成功!")
              this.session.sessionVisible = false
            }).catch(error => {
              this.$message.error(error.message)
            })
          }).catch(() => {
            this.$message.error("取消发布!")
            this.$refs.sessionForm.resetFields()
            this.session.sessionVisible = false
          })
        } else {
          this.$message.error("请完善场次信息!")
        }
      })

    },
    showSession(movie) {
      this.session.mid = movie.id
      this.session.sessionVisible = true
      this.session.mprice = movie.mprice
      this.session.mname = movie.mname
      this.session.imgUrl = movie.mimg
      this.session.duration = movie.mduration
    }
  },

  data() {
    return {
      movieList: [],
      loading: true,
      total: 0,
      pageSize: 5,
      currentindex: 1,
      dialogVisible: false,
      editImg: false,
      dialogImageUrl: '',
      movie: {},
      value: 0,
      mclass: [],
      mclassList: ['爱情', '喜剧', '动画', '剧情','励志', '恐怖', '惊悚', '科幻', '动作', '悬疑', '犯罪', '冒险', '战争', '奇幻', '家庭', '古装', '武侠', '西部', '历史', '传记', '戏曲', '音乐', '灾难', '青春', '儿童'],
      //存放排片时片场的信息
      session: {
        sessionVisible: false,
        manager: this.$store.state.admin.aname,
        mid: 0,
        mtime: '',
        duration: '',
        room: '',
        imgUrl: '',
        mprice: 0,
        mname: ''
      },
      ishot:'否',
      rules: {
        room: [{required: true, message: '请选择放映厅', trigger: 'blur'}],
        mtime: [{required: true, message: '请选择放映时间', trigger: 'blur'}]
      }
    }
  },
  created() {
    requests({
      method: 'get',
      url: 'http://localhost:8081/ssm/page/1/5'
    }).then(response => {
      this.movieList = response.data.list
      this.loading = false
      this.total = response.data.total
    }).catch(error => {
      error.message
    })
  }
}
</script>
<style scoped>
/deep/.el-table__cell{
  text-align: center;
}
</style>