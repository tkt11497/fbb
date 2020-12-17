<template>
  <v-container fluid class="px-10 pt-7">
    <v-row no-gutters>
      <span style="color: black; font-size: 25px" class="ml-5"> 經銷商列表</span>
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
          <v-row
            no-gutters
            style="background-color: #4472c4; height: 60px"
            class="d-flex align-center pa-3"
          >
            <v-row no-gutters style="height: 40px" justify="end">
              <v-col sm="12" md="4">
                <v-text-field
                  color="black"
                  outlined
                  type="text"
                  background-color="white"
                  dense
                  append-icon="search"
                  v-model="searchMember"
                  @click:append="searchMembers"
                >
                  <template v-slot:prepend>
                    <span
                      class="d-flex justify-end"
                      style="width: 50px; height: 30px; font-size: 23px"
                    >
                      搜尋</span
                    >
                  </template>
                </v-text-field>
                <!-- use v autocomplete for async search -->
              </v-col>
            </v-row>
          </v-row>
          <v-row class="mx-4">
            <v-col cols="2">
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
            <v-col cols="4">玩家帳號</v-col>
            <v-col cols="3">
              <span
                @click="changeOrder(`total_donate`, `asc`)"
                :style="{
                  color: 'blue',
                  cursor: 'pointer'
                }"
                >⇈</span>
              本月貢獻
              <span
                @click="changeOrder(`total_donate`, `desc`)"
                :style="{
                  color: 'blue',
                  cursor: 'pointer'
                }"
                >⇊</span>
            </v-col>
            <v-col cols="2">註冊時間</v-col>
            <v-col cols="1"></v-col>
          </v-row>
          <hr
            class="mx-4"
            style="height: 3px; background-color: #4472c4; border-width: 0"
          />
          <v-row
            class="ma-4 mt-1 mb-1"
            dense
            v-for="member in memberRowset"
            :key="member.id"
          >
            <v-col cols="2">{{ member.id }}</v-col>
            <v-col cols="4">{{ member.username }}</v-col>
            <v-col cols="3">{{ member.total_donate * 100 }}</v-col>
            <v-col cols="2">{{ timestampToDate(member.created_date) }}</v-col>
            <v-col cols="1">
              <v-row no-gutters justify="end" class="mr-3">
                <v-btn
                  small
                  @click="$router.push(`/memberList/memberDetail/${member.id}`)"
                >
                  <span style="font-weight: bold">詳細</span>
                  <!-- detail -->
                </v-btn>
              </v-row>
            </v-col>
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
      searchMember: 0,
      page: 1,
      orderBy: "id",
      sort: "ASC",
    };
  },
  async fetch() {
    this.getMemberList();
  },
  methods: {
    getMemberList() {
      axios
        .post(`${process.env.ApiUrl}/v1/back/dealerlist`, {
          page: this.page,
          order: this.orderBy,
          sort: this.sort,
        })
        .then((res) => {
          this.memberRowset = res.data.data;
          this.memberPager = res.data.pager;
        });
    },
    searchMembers() {
      this.$router.push(`/memberList/memberDetail/${this.searchMember}`);
    },
    changePage(pageNumber) {
      this.page = pageNumber;
      this.getMemberList();
    },
    changeOrder(orderBy, sort) {
      this.orderBy = orderBy;
      this.sort = sort;
      this.getMemberList();
    },
    timestampToDate(timestamp) {
      return moment.unix(timestamp).format("YYYY-MM-DD HH:mm:ss");
    },
  },
};
</script>