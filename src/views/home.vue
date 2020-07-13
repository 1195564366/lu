<template>
  <div class="home-contaier">
    <van-form @submit="onSubmit">
      <!-- 账号start -->
      <van-field
        readonly
        clickable
        name="open_id"
        :value="labelObj.open_id"
        label="微信号"
        placeholder="点击选择微信号"
        @click="accountShow = true"
        :rules="[{ required: true, message: '请选择微信号' }]"
      />
      <van-popup v-model="accountShow" position="bottom">
        <van-picker
          show-toolbar
          value-key="label"
          :columns="accountList"
          @confirm="onAccountConfirm"
          @cancel="accountShow = false"
        />
    </van-popup>
    <!-- 账号end -->
    <!-- 场站start -->
    <van-field
      readonly
      clickable
      name="org_id"
      :value="labelObj.org_id"
      label="场站"
      placeholder="点击选择场站"
      @click="addressShow = true"
      :rules="[{ required: true, message: '请选择场站' }]"
    />
    <van-popup v-model="addressShow" position="bottom">
      <van-picker
        show-toolbar
        value-key="org_name"
        :columns="addressList"
        @confirm="onAddressConfirm"
        @cancel="addressShow = false"
      />
    </van-popup>
    <!-- 场站end -->
    <!-- 车牌号start -->
     <van-field
      v-model="form.vehicle_number"
      name="vehicle_number"
      label="车牌号"
      placeholder="请输入车牌号"
      maxlength="7"
      :rules="[{ required: true, message: '请输入车牌号' }]"
    />
    <!-- 车牌号end -->
    <!-- 姓名start -->
     <van-field
      v-model="form.user_name"
      name="user_name"
      label="姓名"
      placeholder="请输入姓名"
      :rules="[{ required: true, message: '请输入姓名' }]"
    />
    <!-- 姓名end -->
    <!-- 手机号开始 -->
    <van-field
      v-model="form.telphone"
      name="telphone"
      label="手机号"
      maxlength="11"
      placeholder="请输入手机号"
      :rules="[{required: true, message: '请输入正确的手机号'}]"
    />
    <!-- 手机号结束 -->
    <!-- 场站start -->
    <van-field
      readonly
      clickable
      name="picker"
      :value="labelObj.goods_type"
      label="运输材料"
      placeholder="点击选择运输材料"
      @click="goodShow = true"
      :rules="[{ required: true, message: '请选择运输材料' }]"
    />
    <van-popup v-model="goodShow" position="bottom">
      <van-picker
        show-toolbar
        value-key="label"
        :columns="goodList"
        @confirm="onGoodConfirm"
        @cancel="goodShow = false"
      />
    </van-popup>
    <!-- 场站end -->
    <!-- 车牌照片上传start -->
    <van-field name="uploader" label="车牌照片上传">
      <template #input>
        <van-uploader v-model="labelObj.file_id1" :max-count="1"/>
      </template>
    </van-field>
    <!-- 车牌照片上传end -->
    <!-- 身份证上传start -->
    <van-field name="uploader" label="身份证上传">
      <template #input>
        <van-uploader v-model="labelObj.file_id2" :max-count="1"/>
      </template>
    </van-field>
    <!-- 身份证上传end -->
    <!-- 通行证上传start -->
    <van-field name="uploader" label="通行证上传">
      <template #input>
        <van-uploader v-model="labelObj.file_id3" :max-count="1"/>
      </template>
    </van-field>
    <!-- 通行证上传end -->
    <div style="margin: 16px;">
      <van-button round block type="info" native-type="submit" class="submit">
        提交
      </van-button>
    </div>
  </van-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      accountList: [],
      accountShow: false,
      addressShow: false,
      addressList: [],
      goodShow: false,
      goodList: [{
        label: "卵石",
        value: 0
      }, {
        label: "碎石",
        value: 1
      }, {
        label: "细石",
        value: 2
      }, {
        label: "粗砂",
        value: 3
      }, {
        label: "汉中砂",
        value: 4
      }],
      form: {
        open_id: null, // 微信号凭证
        org_id: null, // 场站
        vehicle_number: null, // 车牌号
        user_name: null, // 姓名
        telphone: null, // 手机号
        goods_type: null, // 运输材料
      },
      labelObj: {
        open_id: null,
        org_id: '',
        goods_type: '',
        file_id1: [],
        file_id2: [],
        file_id3: []
      }
    }
  },
  created () {
    this.accountList = this.$account
  },
  mounted () {
    this.getAddressList()
  },
  methods: {
    async getAddressList () {
      const result = await this.$fetchPost(this.$api.getOrgList)
      this.addressList = result.list
    },
    onAddressConfirm (e) {
      this.form.org_id = e.id
      this.labelObj.org_id = e.org_name
      this.addressShow = false
    },
    onGoodConfirm (e) {
      this.form.goods_type = e.value
      this.labelObj.goods_type = e.label
      this.goodShow = false
    },
    onAccountConfirm (e) {
      this.form.open_id = e.value
      this.labelObj.open_id = e.label
      this.accountShow = false
    },
    json2Form (t) {
      var e = [];
      for (var n in t) e.push(encodeURIComponent(n) + "=" + encodeURIComponent(t[n]));
      return e.join("&");
    },
    async onSubmit (values) {
      if (!this.labelObj.file_id1.length) {
        this.$toast('请上传车牌照片')
        return
      }
      if (!this.labelObj.file_id2.length) {
        this.$toast('请上传身份证')
        return
      }
      if (!this.labelObj.file_id3.length) {
        this.$toast('请上传通行证')
        return
      }
      if (!/(^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$)/.test(values.vehicle_number)) {
        this.$toast('车牌号格式不正确')
        return
      }
      if (!/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(values.telphone)) {
        this.$toast('手机号格式不正确')
        return
      }
      const params = this.form
      params.file_id = []
      // 上传车牌照片
      const formData1 = new window.FormData();
      formData1.append('type', 'field') // field identityId  passcheck
      formData1.append('file', this.labelObj.file_id1[0].file)
      const file_id1 = await this.$fetchPost(this.$api.uploadFile, formData1)
      if (!file_id1.success) {
        this.$toast(`车牌照片上传失败：${file_id1.msg}`)
        return
      }
      params.file_id.push(file_id1.msg)

      // 上传身份证
      const formData2 = new window.FormData();
      formData2.append('type', 'identityId') // field identityId  passcheck
      formData2.append('file', this.labelObj.file_id2[0].file)
      const file_id2 = await this.$fetchPost(this.$api.uploadFile, formData2)
      if (!file_id2.success) {
        this.$toast(`身份证上传失败：${file_id2.msg}`)
        return
      }
      params.file_id.push(file_id2.msg)

      // 上传通行证
      const formData3 = new window.FormData();
      formData3.append('type', 'passcheck') // field identityId  passcheck
      formData3.append('file', this.labelObj.file_id3[0].file)
      const file_id3 = await this.$fetchPost(this.$api.uploadFile, formData3)
      if (!file_id3.success) {
        this.$toast(`通行证上传失败：${file_id3.msg}`)
        return
      }
      params.file_id.push(file_id3.msg)
      const result = await this.$fetchGet(`${this.$api.addQueue}?${this.json2Form(params)}`)
      if (!result.success) {
        this.$toast(result.msg)
        return
      }
      this.$router.push('/list')
    }
  }
}
</script>

<style lang="scss">
.home-contaier {
  height: calc(100vh - 100px);
  overflow-y: auto;
  .submit {
    height: 100px;
    .van-button__text {
      font-size: 40px;
    }
  }
}
</style>