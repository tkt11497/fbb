<template>
  <v-container fluid class="px-10 pt-7">
    <v-row no-gutters>
      <span style="color: black; font-size: 25px" class="ml-5"> 查帳頁面</span>
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
            style="background-color: #4472c4;"
            class="d-flex align-center pa-3"
          >
            <v-row no-gutters style="height: 40px" justify="start">
              <v-col sm="3" md="3">
                <v-text-field
                  color="white"
                  v-model="searchMember"
                  label="會員ID"
                  prepend-icon="mdi-account"
                ></v-text-field>
              </v-col>
              <v-col sm="3" md="3">
                <v-menu
                  v-model="startDateMenu"
                  :close-on-content-click="false"
                  :nudge-right="60"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      color="white"
                      v-model="startDate"
                      label="開始日期"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="startDate"
                    @input="startDateMenu = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col sm="3" md="3">
                <v-menu
                  v-model="endDateMenu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      color="white"
                      v-model="endDate"
                      label="結束日期"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="endDate"
                    @input="endDateMenu = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col sm="3" md="3">
                <v-btn
                  :loading="isLoading"
                  :disabled="isLoading"
                  color="white"
                  class="ma-2 black--text"
                  @click="()=>{isLoading = true;searchMembers()}"
                >
                  搜尋
                  <v-icon
                    right
                    dark
                  >
                    mdi-clipboard-search-outline
                  </v-icon>
                </v-btn>
              </v-col>
            </v-row>
            <v-row no-gutters style="height: 40px" justify="start">
              <v-col sm="2" md="2">
                <v-checkbox color="white" v-model="type" label="購買" value="0"></v-checkbox>
              </v-col>
              <v-col sm="2" md="2">
                <v-checkbox color="white" v-model="type" label="退款" value="1"></v-checkbox>
              </v-col>
              <v-col sm="2" md="2">
                <v-checkbox color="white" v-model="type" label="分紅" value="2"></v-checkbox>
              </v-col>
              <v-col sm="2" md="2">
                <v-checkbox color="white" v-model="type" label="入金" value="3"></v-checkbox>
              </v-col>
              <v-col sm="2" md="2">
                <v-checkbox color="white" v-model="type" label="出金" value="4"></v-checkbox>
              </v-col>
              <v-col sm="2" md="2">
                <v-checkbox color="white" v-model="type" label="太陽線" value="5"></v-checkbox>
              </v-col>
            </v-row>
          </v-row>
          <v-row class="mx-4">
            <v-col cols="2">ID</v-col>
            <v-col cols="4">
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
            <v-col cols="3">類型</v-col>
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
            <v-col cols="2">{{ member.acc_id }}</v-col>
            <v-col cols="4">{{ timestampToDate(member.time) }}</v-col>
            <v-col cols="3">{{ member.amount }}</v-col>
            <v-col cols="3">{{ $t("ledgerType_" + (member.type)) }}</v-col>
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
      type: ['0'],
      startDate: moment().format('YYYY-MM-DD'),
      startDateMenu: false,
      endDate: moment().format('YYYY-MM-DD'),
      endDateMenu: false,
      searchMember: '',
      isLoading: false,
      page: 1,
      orderBy: "time",
      sort: "DESC",
    };
  },
  async fetch() {
    this.getMemberList();
  },
  methods: {
    getMemberList() {
      axios
        .post(`${process.env.ApiUrl}/v1/back/ledger`, {
          acc_id: parseInt(this.searchMember),
          start_date: this.startDate,
          end_date: this.endDate,
          type: this.type,
          page: this.page,
          order: this.orderBy,
          sort: this.sort,
        })
        .then((res) => {
          this.isLoading = false;
          this.memberRowset = res.data.data;
          this.memberPager = res.data.pager;
        });
    },
    searchMembers() {
      this.getMemberList();
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