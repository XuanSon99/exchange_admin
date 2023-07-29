<template>
  <main class="custom-pd">
    <div class="item secondary">
      <v-card-title>
        <v-icon class="mr-2" color="primary" large>mdi-account-circle-outline</v-icon>
        Đơn mua
        <v-spacer></v-spacer>
        <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" @keydown.enter="searchHandle"></v-text-field>
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
          <v-btn small class="info mr-2" @click="$router.push('/buy-order/' + item.code)">
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
      state_list: []
    };
  },
  computed: {
    ...mapGetters(["account", "buy_page"]),
  },
  mounted() {
    if (this.account && !this.account.rules.includes("all")) {
      this.$router.push("/");
    }
    this.page = this.buy_page;

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
      this.CallAPI("get", "manage/buy-order?page=" + this.page, {}, (res) => {
        this.data = res.data.data;
        this.totalItems = res.data.total;
      });
    },
    searchHandle() {
      this.CallAPI("get", "manage/search/buy-order?query=" + this.search, {}, (res) => {
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
  },
  watch: {
    page() {
      this.getData();
      this.$store.dispatch("setBuyPage", this.page);
    },
    search() {
      if (!this.search) {
        this.getData()
      }
    }
  },
};
</script>