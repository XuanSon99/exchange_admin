<template>
  <main class="custom-pd">
    <div class="item secondary">
      <v-card-title>
        <v-icon class="mr-2" color="primary" large>mdi-account-circle-outline</v-icon>
        Đơn bán
        <v-spacer></v-spacer>
        <v-btn class="ml-5 mb-7" @click="exportReport">Xuất báo cáo ngày</v-btn>
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
          <v-select :items="state_list" item-text="status" item-value="id" v-model="filter.status" outlined
            label="Trạng thái" dense></v-select>
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
        <template v-slot:[`item.status`]="{ item }">
          <p v-if="stateDetail(item.status)" :style="{ color: `${stateDetail(item.status).color}` }">
            {{ stateDetail(item.status).status }}
          </p>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn small class="info mr-2" @click="$router.push('/sell-order/' + item.code)">
            Chi tiết
          </v-btn>
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
        { text: "SĐT", value: "phone" },
        { text: "Số lượng", value: "amount" },
        { text: "Thành tiền", value: "money" },
        { text: "Trạng thái", value: "status" },
        { text: "Thời gian", value: "created_at" },
        { text: "Thao tác", value: "actions", sortable: false },
      ],
      data: [],
      edit_id: "",
      content: "",
      chat_id: "",
      page: 0,
      totalItems: 0,
      state_list: [],
      filter: {
        status: '',
        dates: []
      },
      excel_htmls: ''
    };
  },
  computed: {
    ...mapGetters(["account", "sell_page"]),
    dateRangeText() {
      if (!this.filter.dates[0]) return ''
      return this.filter.dates.join(' ~ ')
    },
  },
  mounted() {
    if (this.account && !this.account.rules.includes("all")) {
      this.$router.push("/");
    }
    this.page = this.sell_page;

    this.CallAPI("get", "manage/state", {}, (res) => {
      this.state_list = res.data;
    });

    this.getDataExport()
  },
  methods: {
    refreshFilter() {
      this.filter.status = ''
      this.filter.dates = []
    },
    stateDetail(id) {
      if (!this.state_list) return ""
      let state = this.state_list.filter((item) => item.id == id);
      return state[0];
    },
    getData() {
      let url = `manage/sell-order?page=${this.page}`
      if (this.filter.status) {
        url += `&status=${this.filter.status}`
      }
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
        average: rate_total / total
      }
    },
    getDataExport() {
      let d = new Date()
      let date = d.toISOString().slice(0, 10)
      let url = `manage/sell-order?page=1&perPage=999&status=1&from=${date}&to=${date}`
      this.CallAPI("get", url, {}, (res) => {

        this.excel_htmls = `
            <tr>
              <td colspan="9" style="text-align: center"><b>BÁO CÁO ĐƠN BÁN</b></td>
            </tr>
            <tr>
                <th style="width: 60px">STT</th>
                <th style="width: 80px">Mã đơn</th>
                <th style="width: 100px">Số điện thoại</th>
                <th style="width: 120px">Thời gian</th>
                <th style="width: 80px">Phí blockchain</th>
                <th style="width: 80px">Tiền phí</th>
                <th style="width: 150px">Số lượng bán</th>
                <th style="width: 100px">Tỷ giá</th>
                <th style="width: 150px">Số tiền</th>
            </tr>
        `;

        let total_money = 0
        let total_fee = 0
        let total_blockchain_fee = 0

        for (let [index, item] of res.data.data.entries()) {
          this.excel_htmls += `
                <tr>
                    <td style="text-align: center">${index + 1}</td>
                    <td>${item.code}</td>
                    <td style="text-align: center">${item.phone ? item.phone : 'Không có'}</td>
                    <td>${this.formatDate(item.created_at)}</td>
                    <td>${item.blockchain_fee}</td>
                    <td>${this.formatMoney(item.fee)}</td>
                    <td class="uppercase" style="text-align: center">${item.amount} ${item.token}</td>
                    <td>${this.formatMoney(item.rate)}</td>
                    <td>${this.formatMoney(item.money)}</td>
                </tr>
            `;
          total_money += item.money
          total_fee += item.fee
          total_blockchain_fee += item.blockchain_fee
        }

        this.excel_htmls += `
          <tr style="color: green">
            <td colspan="4" rowspan="5" style="text-align: center; vertical-align: middle;"><b>Tổng/Tỷ giá trung bình</b></td>
            <td rowspan="5" style="text-align: center; vertical-align: middle; color: red"><b>${this.formatMoney(total_blockchain_fee * this.totalAmount(res.data.data, 'usdt').average)}</b></td>
            <td rowspan="5" style="text-align: center; vertical-align: middle;"><b>${this.formatMoney(total_fee)}</b></td>
            <td style="text-align: center"><b>${this.totalAmount(res.data.data, 'usdt').total} USDT</b></td>
            <td><b>${this.formatMoney(this.totalAmount(res.data.data, 'usdt').average)}</b></td>
            <td rowspan="5" style="text-align: center; vertical-align: middle;"><b>${this.formatMoney(total_money)}</b></td>
          </tr>
          <tr style="color: green">
            <td style="text-align: center"><b>${this.totalAmount(res.data.data, 'btc').total} BTC</b></td>
            <td><b>${this.formatMoney(this.totalAmount(res.data.data, 'btc').average)}</b></td>
          </tr>
          <tr style="color: green">
            <td style="text-align: center"><b>${this.totalAmount(res.data.data, 'eth').total} ETH</b></td>
            <td><b>${this.formatMoney(this.totalAmount(res.data.data, 'eth').average)}</b></td>
          </tr>
          <tr style="color: green">
            <td style="text-align: center"><b>${this.totalAmount(res.data.data, 'busd').total} BUSD</b></td>
            <td><b>${this.formatMoney(this.totalAmount(res.data.data, 'busd').average)}</b></td>
          </tr>
          <tr style="color: green">
            <td style="text-align: center"><b>${this.totalAmount(res.data.data, 'bnb').total} BNB</b></td>
            <td><b>${this.formatMoney(this.totalAmount(res.data.data, 'bnb').average)}</b></td>
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
        "Báo cáo đơn khách hàng bán ngày " +
        new Date().toLocaleDateString("en-GB") +
        ".xls";
      link.href = uri + base64(format(template, ctx));
      link.click();
    },
  },
  watch: {
    page() {
      this.getData();
      this.$store.dispatch("setSellPage", this.page);
    },
    search() {
      if (!this.search) {
        this.getData()
      }
    },
    'filter.status'() {
      this.getData()
    },
    'filter.dates'() {
      if (this.filter.dates[1] || !this.filter.dates[0]) {
        this.getData()
      }
    }
  },
};
</script>