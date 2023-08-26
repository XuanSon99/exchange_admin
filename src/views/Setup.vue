<template>
    <main>
        <div class="item secondary">
            <v-data-table :headers="headers" :items="desserts" :search="search">
                <template v-slot:top>
                    <v-toolbar flat>
                        <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details />
                        <v-spacer />
                        <v-dialog v-model="dialog" max-width="500px">
                            <v-card>
                                <v-card-title>
                                    <span class="headline">{{ formTitle }}</span>
                                </v-card-title>

                                <v-card-text class="pb-0">
                                    <v-container>
                                        <v-text-field v-model="editedItem.name" label="Tên" disabled outlined />
                                        <v-text-field v-model="editedItem.value" v-if="editedItem.name != 'bank'"
                                            label="Địa chỉ ví" outlined />
                                        <div v-else>
                                            <v-autocomplete :items="bank_list" outlined item-value="short_name"
                                                :item-text="item => item.code + ' - ' + item.short_name + ' - ' + item.name"
                                                v-model="bank.name" label="Ngân hàng">
                                            </v-autocomplete>
                                            <v-text-field v-model="bank.owner" label="Tên chủ thẻ" outlined />
                                            <v-text-field v-model="bank.number" label="Số tài khoản" outlined />
                                        </div>
                                    </v-container>
                                </v-card-text>

                                <v-card-actions>
                                    <v-spacer />
                                    <v-btn color="blue darken-1" text @click="close">
                                        Hủy
                                    </v-btn>
                                    <v-btn color="blue darken-1" text @click="save">
                                        Xác nhận
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </v-toolbar>
                </template>
                <template v-slot:[`item.actions`]="{ item }">
                    <v-btn small class="info mr-2" @click="editItem(item)">
                        Cập nhật
                    </v-btn>
                </template>
            </v-data-table>
        </div>
    </main>
</template>
  
<script>
import banks from '../banks.json'
export default {
    data: () => ({
        bank_list: banks,
        search: "",
        dialog: false,
        desserts: [],
        editedIndex: -1,
        editedItem: {
            name: "",
            value: ""
        },
        defaultItem: {
            name: "",
            value: ""
        },
        bank: {
            name: "",
            owner: "",
            number: ""
        }
    }),

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'Thêm mới' : 'Cập nhật';
        },

        headers() {
            return [
                { text: "ID", value: "id" },
                { text: "Tên", value: "name" },
                { text: "Giá trị", value: "value" },
                { text: "Thao tác", value: "actions", sortable: false },
            ];
        },
    },

    watch: {
        dialog(val) {
            val || this.close();
        },
        dialogDelete(val) {
            val || this.closeDelete();
        },
    },

    mounted() {
        this.getData();
    },

    methods: {
        getData() {
            this.desserts = [];
            this.CallAPI("get", "setup", {}, (response) => {
                this.desserts = response.data;

                let bank = response.data[2].value.split("-")
                this.bank.name = bank[0]
                this.bank.owner = bank[1]
                this.bank.number = bank[2]
            });
        },

        editItem(item) {
            this.editedIndex = this.desserts.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialog = true;
        },

        close() {
            this.dialog = false;
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
            });
        },

        save() {
            if (!this.editedItem.value) {
                this.$toast.error("Nhập đủ thông tin");
                return;
            }

            let value = this.editedItem.name == 'bank' ? `${this.bank.name}-${this.bank.owner}-${this.bank.number}` : this.editedItem.value

            let data = {
                name: this.editedItem.name,
                value: value
            }
            this.CallAPI(
                "put",
                "manage/update-setup",
                data,
                (response) => {
                    this.$toast.success("Sửa thành công");
                    this.getData();
                    this.close();
                },
                (error) => {
                    this.$toast.error("Đã xảy ra lỗi");
                }
            );
        },
    },
};
</script>