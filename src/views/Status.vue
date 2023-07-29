<template>
    <main>
        <div class="item secondary">
            <v-data-table :headers="headers" :items="desserts" :search="search">
                <template v-slot:top>
                    <v-toolbar flat>
                        <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details />
                        <v-spacer />
                        <v-dialog v-model="dialog" max-width="500px">
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                                    Thêm mới
                                </v-btn>
                            </template>
                            <v-card>
                                <v-card-title>
                                    <span class="headline">{{ formTitle }}</span>
                                </v-card-title>

                                <v-card-text>
                                    <v-container>
                                        <v-row>
                                            <v-col cols="12">
                                                <v-select label="Màu" v-model="editedItem.color" :items="colors">
                                                    <template v-slot:item="{ item }">
                                                        <span :style="{ color: `${item}` }">
                                                            {{ item }}
                                                        </span>
                                                    </template>
                                                </v-select>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="12">
                                                <v-text-field v-model="editedItem.status" label="Trạng thái" />
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="12">
                                                <v-text-field v-model="editedItem.description" label="Mô tả" />
                                            </v-col>
                                        </v-row>
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
                        <v-dialog v-model="dialogDelete" max-width="500px">
                            <v-card>
                                <v-card-title class="headline">
                                    Xác nhận xóa
                                </v-card-title>
                                <v-card-actions>
                                    <v-spacer />
                                    <v-btn color="blue darken-1" text @click="closeDelete">
                                        Hủy
                                    </v-btn>
                                    <v-btn color="blue darken-1" text @click="deleteItemConfirm">
                                        Xác nhận
                                    </v-btn>
                                    <v-spacer />
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </v-toolbar>
                </template>
                <template v-slot:[`item.actions`]="{ item }">
                    <v-btn small class="info mr-2" @click="editItem(item)">
                        Cập nhật
                    </v-btn>
                    <v-btn v-if="item.id > 3" small class="error" @click="deleteItem(item)">Xóa</v-btn>
                </template>
                <template v-slot:[`item.description`]="{ item }">
                    {{ item.description ? item.description.slice(0, 35) + "..." : "" }}
                </template>
                <template v-slot:[`item.color`]="{ item }">
                    <span :style="{ color: `${item.color}` }">
                        {{ item.color }}
                    </span>
                </template>
            </v-data-table>
        </div>
    </main>
</template>
  
<script>
export default {
    data: () => ({
        search: "",
        dialog: false,
        dialogDelete: false,
        desserts: [],
        editedIndex: -1,
        editedItem: {
            color: "",
            status: "",
            description: "",
            message: "",
        },
        defaultItem: {
            color: "",
            status: "",
            description: "",
            message: "",
        },
        colors: [
            "#E53333",
            "#00D5FF",
            "#E56000",
            "#666666",
            "#3ED050",
            "#9400D3",
            "#080808",
            "#B8860B",
        ],
    }),

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'Thêm mới' : 'Cập nhật';
        },

        headers() {
            return [
                { text: "ID", value: "id" },
                { text: "Màu", value: "color" },
                { text: "Trạng thái", value: "status" },
                { text: "Mô tả", value: "description" },
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
            this.CallAPI("get", "manage/state", {}, (response) => {
                this.desserts = response.data;
            });
        },

        editItem(item) {
            this.editedIndex = this.desserts.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialog = true;
        },

        deleteItem(item) {
            this.editedIndex = this.desserts.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialogDelete = true;
        },

        deleteItemConfirm() {
            this.closeDelete();
            this.CallAPI(
                "delete",
                "manage/state/" + this.desserts[this.editedIndex].id,
                {},
                (response) => {
                    this.$toast.success("Xóa thành công");
                    this.getData();
                },
                (error) => { }
            );
        },

        close() {
            this.dialog = false;
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
            });
        },

        closeDelete() {
            this.dialogDelete = false;
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
            });
        },

        save() {
            if (
                !this.editedItem.color ||
                !this.editedItem.status
            ) {
                this.$toast.error("Nhập đủ thông tin");
                return;
            }
            const data = {
                color: this.editedItem.color,
                status: this.editedItem.status,
                description: this.editedItem.description,
                message: this.editedItem.message,
            };

            if (this.editedIndex > -1) {
                this.CallAPI(
                    "put",
                    "manage/state/" + this.desserts[this.editedIndex].id,
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
            } else {
                this.CallAPI(
                    "post",
                    "manage/state",
                    data,
                    (response) => {
                        this.$toast.success("Thêm thành công");
                        this.getData();
                        this.close();
                    },
                    (error) => {
                        this.$toast.error("Đã xảy ra lỗi");
                    }
                );
            }
        },
    },
};
</script>