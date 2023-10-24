<template>
  <main class="custom-pd">
    <div class="item secondary">
      <v-card-title>
        <v-icon class="mr-2" color="primary" large>mdi-account-circle-outline</v-icon>
        Quản lý người dùng
        <v-spacer></v-spacer>
        <v-text-field v-model="search" append-icon="mdi-magnify" label="Search"
          @keydown.enter="searchHandle"></v-text-field>
      </v-card-title>
      <v-data-table :headers="headers" :items="data" :items-per-page="10" :page.sync="page"
        :server-items-length="totalItems" :footer-props="{ 'items-per-page-options': [10, 10] }">
        <template v-slot:[`item.created_at`]="{ item }">
          {{ formatDate(item.created_at) }}
        </template>
        <template v-slot:[`item.verify`]="{ item }">
          <v-btn v-if="item.verify == 'pending'" small color="orange" outlined>
            Đang chờ
          </v-btn>
          <v-btn v-if="item.verify == 'success'" small color="primary" outlined> Đã duyệt </v-btn>
          <v-btn v-if="!item.verify" small color="red" outlined> Chưa KYC </v-btn>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn small class="info mr-2" @click="$router.push('/user/' + item.phone)">
            Thông tin
          </v-btn>
          <v-btn small class="primary mr-2" @click="$router.push('/ref/' + item.phone)">
            Doanh số
          </v-btn>
        </template>
      </v-data-table>
    </div>
    <v-dialog v-model="dialog" max-width="450px">
      <v-card>
        <v-card-title>
          <span>Nội dung tin nhắn</span>
          <v-spacer></v-spacer>
          <v-btn icon @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <div class="mx-6 mt-6">
          <v-text-field v-model="content" outlined label="Nội dung" clearable></v-text-field>
        </div>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="default" @click="dialog = false"> Hủy </v-btn>
          <v-btn color="primary" @click="sendMessage"> Xác nhận </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
        { text: "ID", value: "id" },
        { text: "SĐT", value: "phone" },
        { text: "KYC", value: "verify" },
        { text: "SĐT giới thiệu", value: "referral" },
        { text: "Thao tác", value: "actions", sortable: false },
      ],
      data: [],
      edit_id: "",
      content: "",
      chat_id: "",
      page: 0,
      totalItems: 0,
    };
  },
  computed: {
    ...mapGetters(["account", "user_page"]),
  },
  mounted() {
    if (this.account && !this.account.rules.includes("all")) {
      this.$router.push("/");
    }
    this.page = this.user_page;
  },
  methods: {
    getData() {
      this.CallAPI("get", "manage/client?page=" + this.page, {}, (res) => {
        this.data = res.data.data;
        this.totalItems = res.data.total;
      });
    },
    searchHandle() {
      this.CallAPI("get", "manage/search/client?query=" + this.search, {}, (res) => {
        this.data = res.data;
      });
    },
    sendMessage() {
      if (!this.content) {
        this.$toast.error("Vui lòng nhập đủ thông tin");
        return;
      }
      this.CallAPI(
        "post",
        "send-message",
        {
          chat_id: this.chat_id,
          content: this.content,
        },
        (res) => {
          this.$toast.success("Thành công");
          this.dialog = false;
          this.content = "";
        }
      );
    },
    formatDate(date) {
      return date.slice(0, 10);
    },
  },
  watch: {
    page() {
      this.getData();
      this.$store.dispatch("setUserPage", this.page);
    },
    search() {
      if (!this.search) {
        this.getData()
      }
    }
  },
};
</script>