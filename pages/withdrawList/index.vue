<template>
  <v-container fluid class="px-10 pt-7">
    <v-row no-gutters>
      <span style="color: black; font-size: 25px" class="ml-5"> 出金紀錄列表</span>
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
          <v-row class="mx-4">
            <v-col cols="2" align="center">
              <span
                @click="changeOrder(`id`, `asc`)"
                :style="{
                  color: 'blue',
                  cursor: 'pointer'
                }"
                >⇈</span
              >
              ID
              <span
                @click="changeOrder(`id`, `desc`)"
                :style="{
                  color: 'blue',
                  cursor: 'pointer'
                }"
                >⇊</span
              ></v-col
            >
            <v-col cols="4" align="center">地址</v-col>
            <v-col cols="2" align="center">
              <span
                @click="changeOrder(`balance`, `asc`)"
                :style="{
                  color: 'blue',
                  cursor: 'pointer'
                }"
                >⇈</span>
              出金金額
              <span
                @click="changeOrder(`balance`, `desc`)"
                :style="{
                  color: 'blue',
                  cursor: 'pointer'
                }"
                >⇊</span>
            </v-col>
            <v-col cols="2" align="center">申請日期</v-col>
            <v-col cols="2" align="center">狀態</v-col>
          </v-row>
          <hr
            class="mx-4"
            style="height: 3px; background-color: #4472c4; border-width: 0"
          />
          <v-row
            class="ma-4 mt-1 mb-1"
            dense
            v-for="row in withdrawRowset"
            :key="row.id"
          >
            <v-col cols="2" align="center">{{ row.id }}</v-col>
            <v-col cols="4">{{ row.to }}</v-col>
            <v-col cols="2" align="center">{{ row.balance }}</v-col>
            <v-col cols="2" align="center">{{ timestampToDate(row.timestamps) }}</v-col>
            <v-col cols="2" align="center">
                <v-btn
                  small
                  v-if="row.status==0"
                  @click="confirmWithdraw(row.id)"
                >
                  <span style="font-weight: bold">待出金</span>
                </v-btn>
                <v-btn
                  small
                  disabled
                  v-if="row.status==1"
                >
                  <span style="font-weight: bold">已出金</span>
                </v-btn>
                <v-btn
                  small
                  @click="$router.push(`/memberList/memberDetail/${row.acc_id}`)"
                >
                  <span style="font-weight: bold">詳細</span>
                </v-btn>
            </v-col>
          </v-row>
        </v-card>
        <Pagination :pager="withdrawPager" @changePage="changePage" />
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
      withdrawRowset: [],
      withdrawPager: {},
      searchMember: 0,
      page: 1,
      orderBy: "id",
      sort: "DESC",
    };
  },
  async fetch() {
    this.getWithdrawList();
  },
  methods: {
    getWithdrawList() {
      axios
        .post(`${process.env.ApiUrl}/v1/back/withdrawlist`, {
          page: this.page,
          order: this.orderBy,
          sort: this.sort,
        })
        .then((res) => {
          this.withdrawRowset = res.data.data;
          this.withdrawPager = res.data.pager;
        });
    },
    changePage(pageNumber) {
      this.page = pageNumber;
      this.getWithdrawList();
    },
    changeOrder(orderBy, sort) {
      this.orderBy = orderBy;
      this.sort = sort;
      this.getWithdrawList();
    },
    timestampToDate(timestamp) {
      return moment.unix(timestamp).format("YYYY-MM-DD HH:mm:ss");
    },
    confirmWithdraw(ID) {
      if(confirm("是否確定出金完成？")){
        axios
        .post(`${process.env.ApiUrl}/v1/back/withdraw`, {
          id:ID,
          status:1
        })
        .then((res) => {
          this.getWithdrawList();
        });
      }
    }
  },
};
</script>