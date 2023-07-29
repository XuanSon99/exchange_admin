<template>
  <main class="custom-pd">
    <div class="item secondary">
      <v-card-title>
        <v-icon class="mr-2" color="primary" large
          >mdi-account-circle-outline</v-icon
        >
        Danh sách Admin
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table :headers="headers" :items="data" :search="search">
        <template v-slot:[`item.created_at`]="{ item }">
          {{ formatDate(item.created_at) }}
        </template>
        <template v-slot:[`item.kyc`]="{ item }">
          <v-btn v-if="item.kyc == 'pending'" small class="yellow">
            Đang chờ
          </v-btn>
          <v-btn v-else small class="primary"> Đã duyệt </v-btn>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn
            small
            class="info mr-2"
            @click="$router.push('/user/' + item.username)"
          >
            Chi tiết
          </v-btn>
          <v-btn small class="success mr-2" @click="editItem(item)">
            Nhắn tin
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
        { text: "ID", value: "id" },
        { text: "Username", value: "username" },
      ],
      data: [],
      edit_id: "",
      content: "",
      ok: ""
    };
  },
  computed: {
    ...mapGetters(["account"]),
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.CallAPI("get", "manage/admin", {}, (res) => {
        this.data = res.data;
      });
    },
    editItem(item) {
      this.edit_id = item.id;
      this.dialog = true;
    },
    formatDate(date) {
      return date.slice(0, 10);
    },
  },
};
</script>