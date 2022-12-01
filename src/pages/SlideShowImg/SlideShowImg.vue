<template>
  <div>
    <el-button type="primary" @click="addImg">
      添加轮播图
    </el-button>
    <el-table
        :data="imgList"
        border
        style="width: 80%;margin-top: 30px">
      <el-table-column
          type="index"
          label="序号"
          width="150">
      </el-table-column>
      <el-table-column
          label="电影名"
          width="120">
        <template slot-scope="scope">
          {{ scope.row.movie.mname }}
        </template>
      </el-table-column>
      <el-table-column
          prop="province"
          label="轮播图"
          height="85"
          width="250">
        <template slot-scope="scope">
          <el-image :src="`http://localhost:8080/ssm/${scope.row.imgUrl}`" :preview-src-list="[`http://localhost:8080/ssm/${scope.row.imgUrl}`]"></el-image>
        </template>
      </el-table-column>
      <el-table-column
          prop="imgUrl"
          label="图片地址"
          width="380">
      </el-table-column>
      <el-table-column
          prop="createTime"
          label="创建时间"
          width="300">
      </el-table-column>
      <el-table-column
          label="操作"
          width="100">
        <template slot-scope="scope">
          <el-button @click="handleEdit(scope.row.id)" type="text" size="small">删除</el-button>
          <el-button type="text" size="small" @click="handleDel(scope.row.id)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
        title="轮播图上传"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
      <el-form label-position="right" label-width="70px" ref="upForm">
        <el-form-item label="轮播图:">
          <el-upload
              action=""
              :http-request="capture"
              list-type="picture-card"
              :limit="1"
              :on-preview="handlePictureCardPreview"
              :auto-upload="false"
              ref="handleUpload">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="imgVisible" append-to-body>
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item label="电影名:">
          <el-autocomplete
              v-model="state"
              :fetch-suggestions="querySearchAsync"
              placeholder="请输入内容"
              @select="handleSelect">
          </el-autocomplete>
        </el-form-item>


      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="submitUpload($event)">确 定</el-button>
    </span>
    </el-dialog>


  </div>
</template>

<script>
import requests from "@/api/request";
import axios from "axios";
export default {
  name: "SlideImg",
  data() {
    return {
      imgList: [],
      dialogVisible: false,
      imgVisible: false,
      dialogImageUrl: '',
      currentFile: '',
      result:[],//搜索结果
      state: '',
    }
  },
  methods: {
    addImg() {
      this.dialogVisible = true
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.imgVisible = true
    },
    capture(file) {//用于提交时获得文件
      this.currentFile = file.file
    },
    submitUpload() {
      this.$refs.upForm.resetFields()
      let formData = new FormData()
      this.$refs.handleUpload.submit() //这里必须提交upload,才能获得文件
      formData.append("img", this.currentFile)
      formData.append("mid", this.mid)
      requests.post('http://localhost:8081/ssm/SlideImgUpload', formData).then(() => {
        this.dialogVisible = false
        this.$message.success("上传成功!")
        requests({
          method: 'get',
          url: 'http://localhost:8081/ssm/GetSlideImg'
        }).then(response => {
          this.imgList = response.data
        })
      })
    },
    handleEdit(id) {
      this.$confirm('是否确定删除？', '系统提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        cancelButtonClass: 'btn-custom-cancel',
        type: 'warning'
      }).then(()=>{
        requests({
          method:'post',
          url:'http://localhost:8081/ssm/DelSlideImgById',
          params:{id:id}
        }).then(()=>{
          requests({
            method: 'get',
            url: 'http://localhost:8081/ssm/GetSlideImg'
          }).then(response => {
            this.imgList = response.data
          })
        })
      }).catch()
    },
    handleDel() {

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


    querySearchAsync(keyWord, cb) {
      this.result=[]
      axios({
        method:'get',
        url:'http://localhost:8081/ssm/GetMovieListByKeyWord',
        params:{keyWord:keyWord}
      }).then(response=>{
        response.data.forEach(item=>{
          this.result.push({
            value:item.mname,
            mid:item.id,
          })
        })
        if (this.result.length==0){
          cb([{value: "未找到相关影视"}])
        }else {
          cb(this.result)
        }

      })
    },
    handleSelect(item) {
      this.mid=item.mid
    }
  },
  created() {
    requests({
      method: 'get',
      url: 'http://localhost:8081/ssm/GetSlideImg'
    }).then(response => {
      this.imgList = response.data
    })
  }
}
</script>

<style scoped>
/deep/.el-table__cell{
  text-align: center;
}
</style>