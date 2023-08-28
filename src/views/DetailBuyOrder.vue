<template>
  <main>
    <div class="item secondary">
      <v-simple-table border v-if="data && state_list">
        <template v-slot:default>
          <tbody>
            <tr>
              <td width="300px">Mã đơn hàng</td>
              <td>{{ data.code }}</td>
            </tr>
            <tr>
              <td>Số điện thoại</td>
              <td>{{ data.phone }}</td>
            </tr>
            <tr>
              <td>Số lượng mua</td>
              <td class="uppercase">{{ data.amount }} {{ data.token }} ({{ data.network }})</td>
            </tr>
            <tr>
              <td>Số tiền thanh toán</td>
              <td>{{ formatMoney(data.money) }} VND</td>
            </tr>
            <tr>
              <td>Tỷ giá</td>
              <td>{{ formatMoney(data.rate) }} VND</td>
            </tr>
            <tr>
              <td>Tiền phí</td>
              <td>{{ formatMoney(data.fee) }} VND</td>
            </tr>
            <tr>
              <td>Địa chỉ ví nhận</td>
              <td>
                <a :href="toExplorer('address', data.address)" target="_blank">
                  {{ data.address }}
                </a>
              </td>
            </tr>
            <tr>
              <td>Thời gian</td>
              <td>{{ formatDate(data.created_at) }}</td>
            </tr>
            <tr v-if="data.description">
              <td>Thông báo KH</td>
              <td>{{ data.description }}</td>
            </tr>
            <tr v-if="data.txhash">
              <td>TxHash</td>
              <td>
                <a :href="toExplorer('tx', data.txhash)" target="_blank">
                  {{ data.txhash }}
                </a>
              </td>
            </tr>
            <tr>
              <td>Trạng thái</td>
              <td>
                <p v-if="stateDetail(data.status)" :style="{ color: `${stateDetail(data.status).color}` }">
                  {{ stateDetail(data.status).status }}
                </p>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <v-card class="pa-5" outlined>
        <v-row>
          <v-col cols="12" md="6">
            <ul>
              <li>Hãy chắc chắn rằng bạn đã nhận <b class="main-color">{{ formatMoney(data.money) }} VND</b></li>
              <li>Sau đó chuyển <b class="uppercase main-color">{{ data.amount }} {{ data.token }} ({{ data.network
              }})</b> tới ví
                <b class="main-color">{{
                  data.address }}</b>
              </li>
            </ul>
          </v-col>
          <v-col cols="12" md="6">
            <vue-qr :text="data.address" size="250"></vue-qr>
          </v-col>
        </v-row>
      </v-card>
      <div v-if="data.status == 3">
        <v-btn color="primary" class="mt-5" @click="dialog1 = true"> Xác nhận thành công </v-btn>
        <v-btn color="error" class="ml-3 mt-5" @click="dialog = true">Hủy đơn hàng</v-btn>
      </div>
    </div>
    <v-dialog v-model="dialog" max-width="450px">
      <v-card>
        <v-card-title>
          <span>Thông báo lý do đơn hàng bị hủy</span>
          <v-spacer></v-spacer>
          <v-btn icon @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <div class="mx-6 mt-6">
          <v-text-field v-model="reason" outlined clearable></v-text-field>
        </div>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="default" @click="dialog = false"> Hủy </v-btn>
          <v-btn color="primary" @click="cancleOrder"> Xác nhận </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog1" max-width="450px">
      <v-card>
        <v-card-title>
          <span>Nhập TxHash</span>
          <v-spacer></v-spacer>
          <v-btn icon @click="dialog1 = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <div class="mx-6 mt-6">
          <v-text-field v-model="txhash" outlined clearable placeholder="Nhập txhash vừa chuyển"></v-text-field>
        </div>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="default" @click="dialog1 = false"> Hủy </v-btn>
          <v-btn color="primary" @click="confirmOrder"> Xác nhận </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </main>
</template>

<script>
import VueQr from 'vue-qr'
export default {
  components: { VueQr },
  data() {
    return {
      dialog: "",
      dialog1: "",
      data: "",
      state_list: "",
      reason: "Do chúng tôi chưa nhận được khoản tiền bạn phải thanh toán.",
      txhash: ""
    };
  },
  mounted() {
    this.getData();
    this.CallAPI("get", "manage/state", {}, (res) => {
      this.state_list = res.data;
    });
  },
  methods: {
    stateDetail(id) {
      if (!this.state_list) return ""
      let state = this.state_list.filter((item) => item.id == id);
      return state[0];
    },
    getData() {
      this.CallAPI("get", "manage/buy-order/" + this.$route.params.id, {}, (res) => {
        this.data = res.data;
      });
    },
    confirmOrder() {
      if (!this.txhash) {
        this.$toast.error('Vui lòng nhập TxHash')
        return
      }
      this.CallAPI("put", "manage/buy-order/" + this.$route.params.id, { status: 1, description: "Đơn hàng giao dịch thành công.", txhash: this.txhash }, (res) => {
        this.$toast.success('Xác nhận đơn hàng thành công')
        this.dialog1 = false
        this.sendNotifi('#01c77d', `Giao dịch mã ${this.data.code} đã thành công. Vui lòng kiểm tra ví của bạn.`, "/history")
        this.getData()
      })
    },
    cancleOrder() {
      this.CallAPI("put", "manage/buy-order/" + this.$route.params.id, { status: 2, description: this.reason }, (res) => {
        this.$toast.success('Hủy đơn hàng thành công')
        this.sendNotifi('#ff5252', `Giao dịch mã ${this.data.code} đã bị hủy. ${this.reason}`, "/history")
        this.dialog = false
        this.getData()
      })
    },
    sendNotifi(color, content, url) {
      this.CallAPI(
        "post",
        "manage/notification",
        {
          phone: this.data.phone,
          color: color,
          content: content,
          url: url
        }
      );
    },
    formatMoney(value) {
      if (!value) return 0;
      return String(parseFloat(value).toFixed(0))
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    formatDate(date) {
      let d = new Date(date);
      return d.toLocaleString();
    },
    toExplorer(type, value) {
      if (this.data.network == 'bep20') {
        return `https://bscscan.com/${type}/${value}`
      }
      if (this.data.network == 'erc20') {
        return `https://etherscan.io/${type}/${value}`
      }
      if (type == 'tx') {
        return `https://tronscan.org/#/transaction/${value}`
      }
      return `https://tronscan.org/#/address/${value}`
    }
  },
};
</script>