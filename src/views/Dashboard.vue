<template>
  <main class="dashboard">
    <div class="mowgrid">
      <v-card class="user">
        <h4 class="text-center my-3">Số người đăng ký hôm nay</h4>
        <v-divider></v-divider>
        <div class="py-5 px-5">
          <h1 class="text-center">{{ data.new_user }}</h1>
          <div class="space mt-3">
            <span>Tổng số người dùng đã đăng ký</span>
            <p>{{ data.total_user }}</p>
          </div>
        </div>
      </v-card>
      <v-card class="contract">
        <h4 class="text-center my-3">Số lượng đơn mua hôm nay</h4>
        <v-divider></v-divider>
        <div class="py-5 px-5">
          <h1 class="text-center">{{ data.new_buy_order}}</h1>
          <div class="space mt-3">
            <span>Tổng số lượng đơn mua</span>
            <p>{{ data.total_buy_order }}</p>
          </div>
        </div>
      </v-card>
      <v-card class="amount">
        <h4 class="text-center my-3">Số lượng đơn bán hôm nay</h4>
        <v-divider></v-divider>
        <div class="py-5 px-5">
          <h1 class="text-center">{{ data.new_sell_order }}</h1>
          <div class="space mt-3">
            <span>Tổng số lượng đơn bán</span>
            <p>{{ data.total_sell_order }}</p>
          </div>
        </div>
      </v-card>
    </div>
  </main>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      data: "",
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
      this.CallAPI("get", "manage/overview", {}, (res) => {
        this.data = res.data;
      });
    },
    formatMoney(value) {
      if (!value) return 0;
      return String(value)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
  },
};
</script>