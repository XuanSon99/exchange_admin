<template>
  <main class="detail-info">
    <div class="item secondary">
      <v-simple-table border>
        <template v-slot:default>
          <tbody>
            <tr>
              <td>Số điện thoại</td>
              <td>{{ data.phone }}</td>
            </tr>
            <tr>
              <td>Người giới thiệu</td>
              <td v-if="data.referral">{{ data.referral }}</td>
              <td v-else>Không có</td>
            </tr>
            <tr>
              <td>Họ tên</td>
              <td>{{ data.name }}</td>
            </tr>
            <tr>
              <td>Địa chỉ</td>
              <td>{{ data.address }}</td>
            </tr>
            <tr>
              <td>Ngày sinh</td>
              <td>{{ data.birthday }}</td>
            </tr>
            <tr>
              <td>Địa chỉ IP</td>
              <td>{{ data.ip }}</td>
            </tr>
            <tr>
              <td>Ảnh CCCD</td>
              <td>
                <div class="d-flex">
                  <expandable-image :src="image(data.front_photo)" class="mr-2" />
                  <expandable-image :src="image(data.back_photo)" class="mr-2" />
                  <video controls class="video-preview" v-if="data.portrait_video">
                    <source :src="`https://exchange.chootc.com/storage${data.portrait_video}`" />
                  </video>
                </div>
              </td>
            </tr>
            <tr>
              <td>Tình trạng KYC</td>
              <td>
                <v-btn v-if="data.verify == 'pending'" small color="orange" outlined>
                  Đang chờ
                </v-btn>
                <v-btn v-if="data.verify == 'success'" small color="primary" outlined> Đã duyệt </v-btn>
                <v-btn v-if="!data.verify" small color="red" outlined> Chưa KYC </v-btn>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <v-btn color="primary" class="mt-5" @click="confirmKYC"> Xác nhận KYC </v-btn>
      <v-btn color="error" class="ml-3 mt-5" @click="dialog = true">
        Xóa KYC
      </v-btn>
    </div>
    <v-dialog v-model="dialog" max-width="450px">
      <v-card>
        <v-card-title>
          <span>Thông báo lý do KYC bị từ chối</span>
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
          <v-btn color="primary" @click="deleteKYC"> Xác nhận </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </main>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      data: "",
      content: "",
      reason: "",
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.CallAPI("get", "manage/user-info/" + this.$route.params.id, {}, (res) => {
        this.data = res.data;
      });
    },
    confirmKYC() {
      this.CallAPI(
        "put",
        "manage/client/" + this.data.phone,
        {},
        (res) => {
          this.getData()
          this.sendNotifi('#3ED050', `Yêu cầu xác minh danh tính của bạn đã thành công.`)
          this.$toast.success("Duyệt KYC thành công");
        }
      );
    },
    deleteKYC() {
      this.CallAPI("delete", "manage/verify/" + this.data.phone, {}, (response) => {
        this.sendNotifi('#E53333', `Xác minh danh tính không thành công. ${this.reason}. Vui lòng xác minh lại!`)
        this.$router.push("/user");
      });
    },
    sendNotifi(color, content) {
      this.CallAPI(
        "post",
        "manage/notification",
        {
          phone: this.data.phone,
          color: color,
          content: content,
        }
      );
    },
  },
};
</script>