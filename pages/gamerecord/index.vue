<template>
  <v-container fluid class="px-10 pt-7">
    <v-row no-gutters>
      <span style="color: black; font-size: 25px" class="ml-5"> 遊戲紀錄</span>
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
            <v-col cols="3">遊戲編號</v-col>
            <v-col cols="3">開始時間</v-col>
            <v-col cols="3">總票數</v-col>
            <v-col cols="3"></v-col>
          </v-row>
          <hr
            class="mx-4"
            style="height: 3px; background-color: #4472c4; border-width: 0"
          />
          <v-row
            class="ma-4 my-1"
            dense
            v-for="record in recordRowset"
            :key="record.phase"
          >
            <v-col cols="3">{{ record.phase }}</v-col>
            <v-col cols="3">{{ timestampToDate(record.start_time) }}</v-col>
            <v-col cols="3">{{ record.ticket_count }}</v-col>
            <v-col cols="3">
              <v-row no-gutters justify="end" class="mr-3">
                <v-btn
                  @click="
                    $router.push('/gamerecord/gameDetail/${record.phase}')
                  "
                >
                  <span style="font-weight: bold">詳細</span>
                  <!-- detail -->
                </v-btn>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
        <Pagination :pager="recordPager" @changePage="changePage" />
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
      pageNumber: 1,
      recordRowset: [],
      recordPager: {},
    };
  },
  async fetch() {
    this.getDrawList();
  },
  methods: {
    searchMembers() {},
    getDrawList(pageNumber) {
      axios
        .get(`${process.env.ApiUrl}/v1/back/phaselist/` + (pageNumber || 1))
        .then((res) => {
          this.recordRowset = res.data.data;
          this.recordPager = res.data.pager;
        });
    },
    changePage(pageNumber) {
      this.getDrawList(pageNumber);
    },
    timestampToDate(timestamp) {
      return moment.unix(timestamp).format("YYYY-MM-DD HH:mm:ss");
    },
  },
};
</script>