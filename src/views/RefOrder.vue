<template>
  <main class="custom-pd">
    <div class="item secondary">
      <v-card-title>
        <v-icon class="mr-2" color="primary" large>mdi-account-circle-outline</v-icon>
        Đơn bán
        <v-spacer></v-spacer>
        <v-btn class="ml-5 mb-7" @click="exportReport">Xuất doanh số</v-btn>
        <v-btn color="primary" small fab class="ml-5 mb-7 elevation-0" @click="refreshFilter">
          <v-icon>
            mdi-refresh
          </v-icon>
        </v-btn>
        <div class="w300 ml-5">
          <v-menu v-model="menu1" :close-on-content-click="false" transition="scale-transition" offset-y min-width="auto">
            <template v-slot:activator="{ on, attrs }">
              <v-text-field v-model="dateRangeText" label="Thời gian" readonly v-bind="attrs" v-on="on" outlined
                dense></v-text-field>
            </template>
            <v-date-picker v-model="filter.dates" @input="menu1 = false" range></v-date-picker>
          </v-menu>
        </div>
        <div class="w300 ml-5">
          <v-text-field v-model="search" append-icon="mdi-magnify" label="Tìm mã đơn" @keydown.enter="searchHandle"
            outlined dense></v-text-field>
        </div>
      </v-card-title>
      <v-data-table :headers="headers" :items="data" :items-per-page="10" :page.sync="page"
        :server-items-length="totalItems" :footer-props="{ 'items-per-page-options': [10, 10] }">
        <template v-slot:[`item.created_at`]="{ item }">
          {{ formatDate(item.created_at) }}
        </template>
        <template v-slot:[`item.money`]="{ item }">
          {{ formatMoney(item.money) }} VND
        </template>
        <template v-slot:[`item.amount`]="{ item }">
          <div class="uppercase">
            {{ item.amount }} {{ item.token }}
          </div>
        </template>
        <template v-slot:[`item.type`]="{ item }">
          <span v-if="item.txhash" class="main-color">Đơn mua</span>
          <span v-else class="error-color">Đơn bán</span>
        </template>
        <template v-slot:[`item.status`]="{ item }">
          <p v-if="stateDetail(item.status)" :style="{ color: `${stateDetail(item.status).color}` }">
            {{ stateDetail(item.status).status }}
          </p>
        </template>
      </v-data-table>
    </div>
  </main>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      search: "",
      dialog: false,
      menu1: false,
      headers: [
        { text: "Mã đơn", value: "code" },
        { text: "Loại đơn", value: "type" },
        { text: "SĐT", value: "phone" },
        { text: "Số lượng", value: "amount" },
        { text: "Số tiền", value: "money" },
        { text: "Trạng thái", value: "status" },
        { text: "Thời gian", value: "created_at" },
      ],
      data: [],
      edit_id: "",
      content: "",
      chat_id: "",
      page: 1,
      totalItems: 0,
      state_list: [],
      filter: {
        dates: []
      },
      excel_htmls: ''
    };
  },
  computed: {
    ...mapGetters(["account"]),
    dateRangeText() {
      if (!this.filter.dates[0]) return ''
      return this.filter.dates.join(' ~ ')
    },
  },
  mounted() {
    if (this.account && !this.account.rules.includes("all")) {
      this.$router.push("/");
    }

    this.CallAPI("get", "manage/state", {}, (res) => {
      this.state_list = res.data;
    });
    this.getData()
    this.getDataExport()
  },
  methods: {
    refreshFilter() {
      this.filter.dates = []
    },
    stateDetail(id) {
      if (!this.state_list) return ""
      let state = this.state_list.filter((item) => item.id == id);
      return state[0];
    },
    getData() {
      let url = `manage/ref-order?phone=${this.$route.params.id}&page=${this.page}`
      if (this.filter.dates[1]) {
        url += `&from=${this.filter.dates[0]}&to=${this.filter.dates[1]}`
      }
      this.CallAPI("get", url, {}, (res) => {
        this.data = res.data.data;
        this.totalItems = res.data.total;
      });
    },
    searchHandle() {
      this.CallAPI("get", "manage/search/sell-order?query=" + this.search, {}, (res) => {
        this.data = res.data;
      });
    },
    formatDate(date) {
      let d = new Date(date);
      return d.toLocaleString();
    },
    formatMoney(value) {
      if (!value) return 0;
      return String(parseFloat(value).toFixed(0))
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    totalAmount(data, token) {
      let arr = data.filter((item) => item.token == token)
      let total = 0
      let rate_total = 0
      arr.forEach(item => {
        total += item.amount
        rate_total += item.rate * item.amount
      });
      return {
        total: total,
        average: this.formatMoney(rate_total / total)
      }
    },
    getDataExport() {
      var date = new Date();
      var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
      firstDay = firstDay.toLocaleDateString().split("/").reverse().join("-")
      var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      lastDay = lastDay.toLocaleDateString().split("/").reverse().join("-")

      let url = `manage/ref-order?phone=${this.$route.params.id}&page=1&perPage=999&from=${firstDay}&to=${lastDay}`
      this.CallAPI("get", url, {}, (res) => {

        this.excel_htmls = `
            <tr>
              <td colspan="9" style="text-align: center"><b>BÁO CÁO DOANH SỐ CỦA ${this.$route.params.id}</b></td>
            </tr>
            <tr>
                <th style="width: 60px">STT</th>
                <th style="width: 80px">Mã đơn</th>
                <th style="width: 80px">Loại đơn</th>
                <th style="width: 100px">Số điện thoại</th>
                <th style="width: 120px">Thời gian</th>
                <th style="width: 80px">Tiền phí</th>
                <th style="width: 150px">Số lượng</th>
                <th style="width: 100px">Tỷ giá</th>
                <th style="width: 150px">Số tiền</th>
            </tr>
        `;

        let total_money = 0
        let total_fee = 0

        for (let [index, item] of res.data.data.entries()) {
          this.excel_htmls += `
                <tr>
                    <td style="text-align: center">${index + 1}</td>
                    <td>${item.code}</td>
                    <td style="text-align: center">${item.txhash ? 'Đơn mua' : 'Đơn bán'}</td>
                    <td style="text-align: center">${item.phone}</td>
                    <td>${this.formatDate(item.created_at)}</td>
                    <td>${this.formatMoney(item.fee)}</td>
                    <td class="uppercase" style="text-align: center">${item.amount} ${item.token}</td>
                    <td>${this.formatMoney(item.rate)}</td>
                    <td>${this.formatMoney(item.money)}</td>
                </tr>
            `;
          total_money += item.money
          total_fee += item.fee
        }

        this.excel_htmls += `
          <tr style="color: red">
            <td colspan="6" rowspan="5" style="text-align: center; vertical-align: middle;"><b>Tổng doanh số</b></td>
            <td style="text-align: center"><b>${this.totalAmount(res.data.data, 'usdt').total} USDT</b></td>
          </tr>
          <tr style="color: red">
            <td style="text-align: center"><b>${this.totalAmount(res.data.data, 'btc').total} BTC</b></td>
          </tr>
          <tr style="color: red">
            <td style="text-align: center"><b>${this.totalAmount(res.data.data, 'eth').total} ETH</b></td>
          </tr>
          <tr style="color: red">
            <td style="text-align: center"><b>${this.totalAmount(res.data.data, 'busd').total} BUSD</b></td>
          </tr>
          <tr style="color: red">
            <td style="text-align: center"><b>${this.totalAmount(res.data.data, 'bnb').total} BNB</b></td>
          </tr>
        `
      });
    },
    exportReport() {
      var uri = "data:application/vnd.ms-excel;base64,";
      var template =
        '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><meta charset="UTF-8"><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table border>{table}</table></body></html>';
      var base64 = function (s) {
        return window.btoa(unescape(encodeURIComponent(s)));
      };

      var format = function (s, c) {
        return s.replace(/{(\w+)}/g, function (m, p) {
          return c[p];
        });
      };

      var ctx = {
        worksheet: "Worksheet",
        table: this.excel_htmls,
      };

      var link = document.createElement("a");
      link.download =
        `Báo cáo doanh số của ${this.$route.params.id}.xls`
      link.href = uri + base64(format(template, ctx));
      link.click();
    },
  },
  watch: {
    search() {
      if (!this.search) {
        this.getData()
      }
    },
    'filter.dates'() {
      if (this.filter.dates[1] || !this.filter.dates[0]) {
        this.getData()
      }
    }
  },
};
</script>