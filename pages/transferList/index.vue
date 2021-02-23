<template>
  <v-container fluid class="px-10 pt-7">
    <v-row no-gutters>
      <span style="color: black; font-size: 25px" class="ml-5"> 系統給分</span>
      <!-- memberList -->
    </v-row>
    <v-row no-gutters>
      <v-col cols="6">
        <hr style="height: 5px; background-color: #4472c4; border-width: 0" />
      </v-col>
      <v-col cols="6"></v-col>
      <!-- memberList -->
    </v-row>
    <v-flex xs12 md12 class="mt-6">
      <v-card color="#9ABDE4" min-height="75vh">
        <v-card flat min-height="70vh" color="#9ABDE4">
          <v-card-title class="pa-2">系統S幣餘額：{{ wallet }}</v-card-title>
          <v-row
            no-gutters
            style="background-color: #4472c4;"
            class="d-flex align-center pa-3"
          >
            <v-row no-gutters style="height: 40px" justify="start">
              <v-col sm="3" md="3">
                <v-text-field
                  color="white"
                  v-model="acc_id"
                  label="會員ID"
                  class="pr-4"
                  prepend-icon="mdi-account"
                ></v-text-field>
              </v-col>
              <v-col sm="1" md="1">
                <v-select
                  color="white"
                  :items="methodItem"
                  v-model="method"
                  item-text="key"
                  item-value="value"
                  class="pr-4"
                ></v-select>
              </v-col>
              <v-col sm="2" md="2">
                <v-text-field
                  color="white"
                  v-model="balance"
                  label="S幣數量"
                  class="pr-4"
                  number
                ></v-text-field>
              </v-col>
              <v-col sm="4" md="4">
                <v-text-field
                  color="white"
                  v-model="memo"
                  label="說明"
                  prepend-icon="mdi-book-open-page-variant-outline"
                ></v-text-field>
              </v-col>
              <v-col sm="2" md="2">
                <v-btn
                  :loading="isLoading"
                  :disabled="isLoading"
                  color="white"
                  class="ma-2 black--text"
                  @click="()=>{isLoading = true;transfer()}"
                >
                  送出
                  <v-icon
                    right
                    dark
                  >
                    mdi-clipboard-search-outline
                  </v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-row>
          <v-row class="mx-4">
            <v-col cols="2">ID</v-col>
            <v-col cols="3">
              <span
                @click="changeOrder(`time`, `asc`)"
                :style="{
                  color: 'blue',
                  cursor: 'pointer'
                }"
                >⇈</span
              >
              時間
              <span
                @click="changeOrder(`time`, `desc`)"
                :style="{
                  color: 'blue',
                  cursor: 'pointer'
                }"
                >⇊</span
              >
            </v-col>
            <v-col cols="3">
              <span
                @click="changeOrder(`amount`, `asc`)"
                :style="{
                  color: 'blue',
                  cursor: 'pointer'
                }"
                >⇈</span>
              數量
              <span
                @click="changeOrder(`amount`, `desc`)"
                :style="{
                  color: 'blue',
                  cursor: 'pointer'
                }"
                >⇊</span>
            </v-col>
            <v-col cols="2">類型</v-col>
            <v-col cols="2">說明</v-col>
          </v-row>
          <hr
            class="mx-4"
            style="height: 3px; background-color: #4472c4; border-width: 0"
          />
          <v-row
            class="mx-4 mt-1 mb-1"
            dense
            v-for="member in memberRowset"
            :key="member.id"
          >
            <v-col cols="2">{{ member.acc_id }}</v-col>
            <v-col cols="3">{{ timestampToDate(member.timestamps) }}</v-col>
            <v-col cols="3">{{ member.balance }}</v-col>
            <v-col cols="2">{{ $t("transferMethod_" + (member.method)) }}</v-col>
            <v-col cols="2">{{ member.memo }}</v-col>
          </v-row>
        </v-card>
        <Pagination :pager="memberPager" @changePage="changePage" />
      </v-card>
    </v-flex>
  </v-container>
</template>
<script>
const axios = require("axios");
const moment = require("moment");
export default {
  data() {
    return {
      memberRowset: [],
      memberPager: {},
      methodItem: [
        { key:"傳送", value: 0},
        { key:"收回", value: 1},
      ],
      acc_id: '',
      method: 0,
      memberId: '',
      balance: 0,
      memo: '',
      wallet: 0,
      isLoading: false,
      page: 1,
      orderBy: "timestamps",
      sort: "DESC",
    };
  },
  async fetch() {
    this.getTransferList();
  },
  methods: {
    getTransferList() {
      axios
        .post(`${process.env.ApiUrl}/v1/back/transferlist`, {
          page: this.page,
          order: this.orderBy,
          sort: this.sort,
        })
        .then((res) => {
          this.memberRowset = res.data.data.data;
          this.memberPager = res.data.pager;
          this.wallet = res.data.data.wallet_balance;
        });
    },
    transfer() {
      axios
        .post(`${process.env.ApiUrl}/v1/back/transfer`, {
          acc_id: parseInt(this.acc_id),
          method: parseInt(this.method),
          balance: parseInt(this.balance),
          memo: this.memo,
        })
        .then((res) => {
          this.isLoading = false;
          this.acc_id = '';
          this.balance = 0;
          this.memo = '';
          this.getTransferList();
        });
    },
    searchTransferList() {
      this.getTransferList();
    },
    changePage(pageNumber) {
      this.page = pageNumber;
      this.getTransferList();
    },
    changeOrder(orderBy, sort) {
      this.orderBy = orderBy;
      this.sort = sort;
      this.getTransferList();
    },
    timestampToDate(timestamp) {
      return moment.unix(timestamp).format("YYYY-MM-DD HH:mm:ss");
    },
  },
};
</script>