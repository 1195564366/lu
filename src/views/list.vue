<template>
  <div class="list-container">
    <div class="account-container" @click="accountShow = true">
      当前账号 {{ accountName }}
    </div>
    <div class="top-container" @click="getList1" v-if="list.length">
      <div class="current">当前位置第 {{ current }} 位 </div>
      <div class="total">总共{{ total }}位</div>
    </div>
    <div class="table" v-if="list.length">
      <div class="table-header">
        <div class="id">序号</div>
        <div class="header-item">车牌</div>
        <div class="header-item">姓名</div>
        <div class="header-item">手机号</div>
      </div>
      <div class="table-content">
        <div class="table-item" v-for="(item, index) in list" :key="index" :class="item.vehicle_number === vehicle_number && 'active'">
          <div class="id">{{ item.Rank }}</div>
          <div class="item">{{ item.vehicle_number }}</div>
          <div class="item">{{ item.user_name }}</div>
          <div class="item">{{ item.telphone }}</div>
        </div>
      </div>
    </div>
    <!-- 切换账号 -->
    <van-popup v-model="accountShow" position="bottom">
        <van-picker
          show-toolbar
          value-key="label"
          :columns="account"
          @confirm="onAccountConfirm"
          @cancel="accountShow = false"
        />
    </van-popup>
  </div>
</template>

<script>
import account from '../../public/account'
export default {
  data () {
    return {
      account: account,
      count: 0,
      open_id: account[0].value,
      vehicle_number: null, // 车牌
      org_id: null, // 场站
      current: null,
      list: [],
      total: null,
      accountShow: false
    }
  },
  computed: {
    accountName () {
      return this.account.filter(item => item.value === this.open_id)[0].label
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    async getList () {
      const result = await this.$fetchPost(`/jcwecaht/interface/vehicle/queue/getQueueListByOpenid?open_id=${this.open_id}`)
      if (!result.success) {
        this.$toast(result.msg)
        return
      }
      this.vehicle_number = result.msg.vehicle_number
      this.org_id = result.msg.org_id
      this.getList1()
    },
    onAccountConfirm (e) {
      this.open_id = e.value
      this.total = null
      this.current = null
      this.list = []
      this.getList()
      this.accountShow = false
    },
    async getList1 () {
      const result = await this.$fetchGet('/jcwecaht/interface/vehicle/queue/getQueue', {
        orgId: this.org_id,
        vehicle_number: this.vehicle_number
      })
      if (!result.success) {
        this.$toast(result.msg)
        return
      }
      this.isLoading = false
      this.current = result.current
      this.total = result.total
      this.list = result.list
    }
  }
}
</script>

<style lang="scss">
.list-container, .van-pull-refresh {
  height: calc(100vh - 100px);
  .account-container {
    text-align: center;
    font-size: 40px;
    font-weight: bold;
    padding: 20px 0;
  }
  .top-container {
    text-align: center;
    font-size: 40px;
    font-weight: bold;
    padding: 30px 0;
    .total {
      margin-top: 30px;
    }
  }
  .table {
    font-size: 30px;
    
    padding: 0 20px;
    .table-header {
      display: flex;
      .id {
        width: 60px;
        text-align: center;
      }
      .header-item {
        flex: 1;
        text-align: center;
      }
    }
    .table-content {
      height: calc(100vh - 100px - 80px - 100px - 30px - 130px);
      overflow-y: auto;
      .table-item {
        display: flex;
        &:nth-child(2n) {
          background: #E7F3FF;
        }
        &.active {
          color: #f00;
          font-weight: bold;
        }
        .id {
          width: 60px;
          text-align: center;
          line-height: 70px;
        }
        .item {
          flex: 1;
          text-align: center;
          line-height: 70px;
        }
      }
    }
  }
}
</style>