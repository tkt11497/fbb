<template>
  <v-container
    fluid
    class="px-10 pt-7"
    :class="{ fontSize: $vuetify.breakpoint.mobile }"
  >
    <v-row no-gutters v-if="!$store.state.token">
      <v-breadcrumbs :items="breadcrumbs" class="ml-5">
        <template v-slot:divider>
          <v-icon large>keyboard_arrow_right</v-icon>
        </template>
        <template v-slot:item="{ item }">
          <v-breadcrumbs-item :href="item.href" :disabled="item.disabled">
            <span
              :style="{
                color: item.disabled ? 'black' : 'blue',
                'font-size': '20px',
              }"
            >
              {{ item.text }} </span
            >
          </v-breadcrumbs-item>
        </template>
      </v-breadcrumbs>
    </v-row>
    <v-row no-gutters>
      <v-col cols="5">
        <hr style="height: 5px; background-color: #4472c4; border-width: 0" />
      </v-col>
      <v-col cols="7"></v-col>
    </v-row>

    <v-row no-gutters class="mx-4 mt-4">
      <v-col :md="6" :sm="12" class="mt-1">
        <v-card style="height: 40px; background-color: #9abde4" class="d-flex">
          <div
            class="d-flex justify-start align-center"
            style="width: 25%; height: 100%"
          >
            <span class="ml-2">會員帳號 :</span>
          </div>
          <div
            class="d-flex justify-start align-center"
            style="width: 75%; height: 100%"
          >
            <span class="ml-2" style="font-weight: bold; max-width: 97%">{{
              memberInfo.username
            }}</span>
          </div>
        </v-card>
      </v-col>
      <v-col :md="6" :sm="12" class="mt-1">
        <v-card
          class="ml-2 d-flex"
          style="height: 40px; background-color: #9abde4"
        >
          <div
            class="d-flex justify-start align-center"
            style="width: 25%; height: 100%"
          >
            <span class="ml-2">最近登入時間: </span>
            <!-- regs time -->
          </div>
          <div
            class="d-flex justify-start align-center"
            style="width: 75%; height: 100%"
          >
            <span class="ml-2" style="font-weight: bold; max-width: 97%">
              {{ memberInfo.login_date }}</span
            >
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-row no-gutters class="mx-4">
      <v-col :md="4" :sm="12" class="mt-1">
        <v-card style="height: 40px; background-color: #9abde4" class="d-flex">
          <div
            class="d-flex justify-start align-center"
            style="width: 25%; height: 100%"
          >
            <span class="ml-2">會員ID: </span>
          </div>
          <div
            class="d-flex justify-start align-center"
            style="width: 75%; height: 100%"
          >
            <span class="ml-2" style="font-weight: bold; max-width: 97%">{{
              memberInfo.id
            }}</span>
          </div>
        </v-card>
      </v-col>
      <v-col :md="4" :sm="12" class="mt-1">
        <v-card style="height: 40px; background-color: #9abde4" class="ml-2 d-flex">
          <div
            class="d-flex justify-start align-center"
            style="width: 25%; height: 100%"
          >
            <span class="ml-2">推薦人ID: </span>
          </div>
          <div
            class="d-flex justify-start align-center"
            style="width: 75%; height: 100%"
          >
            <span class="ml-2" style="font-weight: bold; max-width: 97%">{{
              memberInfo.recommender
            }}</span>
          </div>
        </v-card>
      </v-col>
      <v-col :md="4" :sm="12" class="mt-1">
        <v-card
          class="ml-2 d-flex"
          style="height: 40px; background-color: #9abde4"
        >
          <div
            class="d-flex justify-start align-center"
            style="width: 25%; height: 100%"
          >
            <span class="ml-2">註冊時間: </span>
            <!-- regs time -->
          </div>
          <div
            class="d-flex justify-start align-center"
            style="width: 75%; height: 100%"
          >
            <span class="ml-2" style="font-weight: bold; max-width: 97%">
              {{ memberInfo.created_date }}</span
            >
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-row no-gutters class="mx-4">
      <v-col :md="6" :sm="12" class="mt-1">
        <v-card style="height: 40px; background-color: #9abde4" class="d-flex">
          <div
            class="d-flex justify-start align-center"
            style="width: 25%; height: 100%"
          >
            <span class="ml-2">累積購買: </span>
          </div>
          <div
            class="d-flex justify-start align-center"
            style="width: 75%; height: 100%"
          >
            <span class="ml-2" style="font-weight: bold; max-width: 97%">{{
              memberInfo.total_buy
            }}</span>
          </div>
        </v-card>
      </v-col>
      <v-col :md="6" :sm="12" class="mt-1">
        <v-card
          class="ml-2 d-flex"
          style="height: 40px; background-color: #9abde4"
        >
          <div
            class="d-flex justify-start align-center"
            style="width: 25%; height: 100%"
          >
            <span class="ml-2">本月購買: </span>
            <!-- regs time -->
          </div>
          <div
            class="d-flex justify-start align-center"
            style="width: 75%; height: 100%"
          >
            <span class="ml-2" style="font-weight: bold; max-width: 97%">
              {{ memberInfo.month_buy }}</span
            >
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-row no-gutters class="mx-4">
      <v-col :md="6" :sm="12" class="mt-1">
        <v-card style="height: 40px; background-color: #9abde4" class="d-flex">
          <div
            class="d-flex justify-start align-center"
            style="width: 25%; height: 100%"
          >
            <span class="ml-2">累積贏得: </span>
          </div>
          <div
            class="d-flex justify-start align-center"
            style="width: 75%; height: 100%"
          >
            <span class="ml-2" style="font-weight: bold; max-width: 97%">{{
              memberInfo.total_win
            }}</span>
          </div>
        </v-card>
      </v-col>
      <v-col :md="6" :sm="12" class="mt-1">
        <v-card
          class="ml-2 d-flex"
          style="height: 40px; background-color: #9abde4"
        >
          <div
            class="d-flex justify-start align-center"
            style="width: 25%; height: 100%"
          >
            <span class="ml-2">本月贏得: </span>
            <!-- regs time -->
          </div>
          <div
            class="d-flex justify-start align-center"
            style="width: 75%; height: 100%"
          >
            <span class="ml-2" style="font-weight: bold; max-width: 97%">
              {{ memberInfo.month_win }}</span
            >
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-row no-gutters class="mx-4 mt-1">
      <v-col :md="12" :sm="12">
        <v-card style="height: 40px; background-color: #9abde4" class="d-flex">
          <div
            class="d-flex justify-start align-center"
            style="width: 25%; height: 100%"
          >
            <span class="ml-2">區塊鏈錢包: </span>
          </div>
          <div
            class="d-flex justify-start align-center"
            style="width: 75%; height: 100%"
          >
            <span class="ml-2" style="font-weight: bold; max-width: 97%">
              {{ memberInfo.wallet }}</span
            >
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-row no-gutters class="mx-4">
      <v-col :md="4" :sm="12" class="mt-1">
        <v-card style="height: 40px; background-color: #9abde4" class="d-flex">
          <div
            class="d-flex justify-start align-center"
            style="width: 25%; height: 100%"
          >
            <span class="ml-2">S幣餘額: </span>
          </div>
          <div
            class="d-flex justify-start align-center"
            style="width: 75%; height: 100%"
          >
            <span class="ml-2" style="font-weight: bold; max-width: 97%">{{
              parseInt(memberInfo.game_balance / 1000000)
            }}</span>
          </div>
        </v-card>
      </v-col>
      <v-col :md="4" :sm="12" class="mt-1">
        <v-card
          class="ml-2 d-flex"
          style="height: 40px; background-color: #9abde4"
        >
          <div
            class="d-flex justify-start align-center"
            style="width: 25%; height: 100%"
          >
            <span class="ml-2">登入密碼: </span>
            <!-- regs time -->
          </div>
          <div
            class="d-flex justify-start align-center"
            style="width: 75%; height: 100%"
          >
            <span class="ml-2" style="font-weight: bold; max-width: 97%">
              {{ memberInfo.password }}</span
            >
          </div>
        </v-card>
      </v-col>
      <v-col :md="4" :sm="12" class="mt-1">
        <v-card
          class="ml-2 d-flex"
          style="height: 40px; background-color: #9abde4"
        >
          <div
            class="d-flex justify-start align-center"
            style="width: 25%; height: 100%"
          >
            <span class="ml-2">二級密碼: </span>
            <!-- regs time -->
          </div>
          <div
            class="d-flex justify-start align-center"
            style="width: 75%; height: 100%"
          >
            <span class="ml-2" style="font-weight: bold; max-width: 97%">
              {{ memberInfo.second_password }}</span
            >
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-expansion-panels class="mx-4 mt-1">
      <v-expansion-panel class="mx-4 mt-1" style="background-color: #9abde4">
        <v-expansion-panel-header>
          購買紀錄:
          <template v-slot:actions>
            <v-icon x-large color="primary">$expand</v-icon>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-flex xs12 md12 class="mt-1">
            <v-card flat color="#9ABDE4">
              <v-card flat color="#9ABDE4">
                <v-row>
                  <v-col cols="4">局號</v-col>
                  <v-col cols="4">購買時間 </v-col>
                  <v-col cols="4">寶寶</v-col>
                </v-row>
                <hr
                  style="
                    height: 3px;
                    background-color: #4472c4;
                    border-width: 0;
                  "
                />
                <v-row class="my-1" dense v-for="betHistory in betHistoryRes" :key="betHistory.key">
                  <v-col cols="4">{{betHistory.phase}}期 </v-col>
                  <v-col cols="4">{{timestampToDate(betHistory.buy_time)}}</v-col>
                  <v-col cols="4">{{ $t(`payoutBaby_${betHistory.payout_baby}`) }}</v-col>
                </v-row>
              </v-card>
              <Pagination :pager="betPager" @changePage="changeBetPage" />
            </v-card>
          </v-flex>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel class="mx-4 mt-1" style="background-color: #9abde4">
        <v-expansion-panel-header>
          入金紀錄:
          <template v-slot:actions>
            <v-icon x-large color="primary">$expand</v-icon>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-flex xs12 md12 class="mt-1">
            <v-card flat color="#9ABDE4">
              <v-card flat color="#9ABDE4">
                <v-row>
                  <v-col cols="3"> 日期 </v-col>
                  <v-col cols="3">數量</v-col>
                  <v-col cols="6"> TxID </v-col>
                </v-row>
                <hr
                  style="
                    height: 3px;
                    background-color: #4472c4;
                    border-width: 0;
                  "
                />
                <v-row
                  class="my-1"
                  dense
                  v-for="deposit in depositRowset"
                  :key="deposit.id"
                >
                  <v-col cols="3">{{
                    timestampToDate(deposit.timestamps)
                  }}</v-col>
                  <v-col cols="3">{{ deposit.balance }} </v-col>
                  <v-col cols="6">{{ deposit.hash }}</v-col>
                </v-row>
              </v-card>
              <v-row no-gutters justify="center" align="center">
                <v-btn
                  icon
                  x-large
                  color="#4472C4"
                  style="transform: rotateY(180deg)"
                  @click="changePage('-')"
                >
                  <v-icon x-large>forward</v-icon>
                </v-btn>
                <div style="height: 40px; width: 50px">
                  <v-text-field
                    single-line
                    solo
                    class="pa-0 ma-0"
                    dense
                    v-model="pageNumber"
                  ></v-text-field>
                </div>
                <span> /100</span>
                <v-btn icon x-large color="#4472C4" @click="changePage('+')">
                  <v-icon x-large>forward</v-icon>
                </v-btn>
              </v-row>
            </v-card>
          </v-flex>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel class="mx-4 mt-1" style="background-color: #9abde4">
        <v-expansion-panel-header>
          出金紀錄:
          <template v-slot:actions>
            <v-icon x-large color="primary">$expand</v-icon>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-flex xs12 md12 class="mt-1">
            <v-card flat color="#9ABDE4">
              <v-card flat color="#9ABDE4">
                <v-row>
                  <v-col cols="3"> 日期 </v-col>
                  <v-col cols="3">數量</v-col>
                  <v-col cols="6"> 錢包地址 </v-col>
                </v-row>
                <hr
                  style="
                    height: 3px;
                    background-color: #4472c4;
                    border-width: 0;
                  "
                />
                <v-row
                  class="my-1"
                  dense
                  v-for="withdraw in withdrawRowset"
                  :key="withdraw.id"
                >
                  <v-col cols="3">{{
                    timestampToDate(withdraw.timestamps)
                  }}</v-col>
                  <v-col cols="3">{{ withdraw.balance }} </v-col>
                  <v-col cols="6">{{ withdraw.hash }}</v-col>
                </v-row>
              </v-card>
              <v-row no-gutters justify="center" align="center">
                <v-btn
                  icon
                  x-large
                  color="#4472C4"
                  style="transform: rotateY(180deg)"
                  @click="changePage('-')"
                >
                  <v-icon x-large>forward</v-icon>
                </v-btn>
                <div style="height: 40px; width: 50px">
                  <v-text-field
                    single-line
                    solo
                    class="pa-0 ma-0"
                    dense
                    v-model="pageNumber"
                  ></v-text-field>
                </div>
                <span> /100</span>
                <v-btn icon x-large color="#4472C4" @click="changePage('+')">
                  <v-icon x-large>forward</v-icon>
                </v-btn>
              </v-row>
            </v-card>
          </v-flex>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel class="mx-4 mt-1" style="background-color: #9abde4">
        <v-expansion-panel-header>
          分紅列表:
          <template v-slot:actions>
            <v-icon x-large color="primary">$expand</v-icon>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-flex xs12 md12 class="mt-1">
            <v-card flat color="#9ABDE4">
              <v-card flat color="#9ABDE4">
                <v-row>
                  <v-col cols="3"> 時間 </v-col>
                  <v-col cols="3">數量</v-col>
                  <v-col cols="6"> 分紅類型 </v-col>
                </v-row>
                <hr
                  style="
                    height: 3px;
                    background-color: #4472c4;
                    border-width: 0;
                  "
                />
                <v-row
                  class="my-1"
                  dense
                  v-for="(dist, key) in distRes"
                  :key="key"
                >
                  <v-col cols="3">{{
                    timestampToDate(dist.timestamps)
                  }}</v-col>
                  <v-col cols="3">{{ dist.amount }} </v-col>
                  <v-col cols="6">{{ $t("distType_" + (dist.type+1)) }}</v-col>
                </v-row>
              </v-card>
              <Pagination :pager="distPager" @changePage="changeDistPage" />
            </v-card>
          </v-flex>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel class="mx-4 mt-1" style="background-color: #9abde4">
        <v-expansion-panel-header>
          <v-row no-gutters>
            <v-col cols="6">太陽線列表:</v-col>
            <v-col cols="3">總貢獻:{{recommendCount.total_buy}}</v-col>
            <v-col cols="3">本月貢獻:{{recommendCount.this_month}}</v-col>
          </v-row>
          <template v-slot:actions>
            <v-icon x-large color="primary">$expand</v-icon>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-flex xs12 md12 class="mt-1">
            <v-card flat color="#9ABDE4">
              <v-card flat color="#9ABDE4">
                <v-row>
                  <v-col cols="2">id</v-col>
                  <v-col cols="4">總購買</v-col>
                  <v-col cols="4">本月購買</v-col>
                  <v-col cols="2">上月購買</v-col>
                </v-row>
                <hr
                  style="
                    height: 3px;
                    background-color: #4472c4;
                    border-width: 0;
                  "
                />
                <v-row
                  class="my-1"
                  dense
                  v-for="recommend in recommendRes"
                  :key="recommend.acc_id"
                >
                  <v-col cols="2">{{recommend.acc_id}}</v-col>
                  <v-col cols="4">{{recommend.total_buy}}</v-col>
                  <v-col cols="4">{{recommend.buy_amount}}</v-col>
                  <v-col cols="2">{{ recommend.last_month }}</v-col>
                </v-row>
              </v-card>
              <v-row no-gutters justify="center" align="center">
                <v-btn
                  icon
                  x-large
                  color="#4472C4"
                  style="transform: rotateY(180deg)"
                  @click="changePage('-')"
                >
                  <v-icon x-large>forward</v-icon>
                </v-btn>
                <div style="height: 40px; width: 50px">
                  <v-text-field
                    single-line
                    solo
                    class="pa-0 ma-0"
                    dense
                    v-model="pageNumber"
                  ></v-text-field>
                </div>
                <span> /100</span>
                <v-btn icon x-large color="#4472C4" @click="changePage('+')">
                  <v-icon x-large>forward</v-icon>
                </v-btn>
              </v-row>
            </v-card>
          </v-flex>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel class="mx-4 mt-1" style="background-color: #9abde4">
        <v-expansion-panel-header>
          每月統計:前12個月的統計數據
          <template v-slot:actions>
            <v-icon x-large color="primary">$expand</v-icon>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-flex xs12 md12 class="mt-1">
            <v-card flat color="#9ABDE4">
              <v-card flat color="#9ABDE4">
                <v-row>
                  <v-col cols="3"> 月份 </v-col>
                  <v-col cols="3"> 月投入</v-col>
                  <v-col cols="3"> 月收入 </v-col>
                  <v-col cols="3"> 太陽下線月貢獻 </v-col>
                </v-row>
                <hr
                  style="
                    height: 3px;
                    background-color: #4472c4;
                    border-width: 0;
                  "
                />
                <v-row
                  class="my-1"
                  dense
                  v-for="(report, key) in reportRowset"
                  :key="key"
                >
                  <v-col cols="3">{{ report.month }}</v-col>
                  <v-col cols="3">{{ report.buy_amount }} </v-col>
                  <v-col cols="3">{{ parseInt(report.win_amount / 1000000) }} </v-col>
                  <v-col cols="3">{{ parseInt(report.recommend_amount / 1000000) }}</v-col>
                </v-row>
              </v-card>
            </v-card>
          </v-flex>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>
<style scoped>
.fontSize {
  font-size: 11px;
}
</style>
<script>
const axios = require("axios");
const moment = require("moment");
export default {
  data() {
    return {
      pageNumber: 1,
      breadcrumbs: [
        {
          text: "會員列表",
          disabled: false,
          href: "/memberList",
        },
        {
          text: "詳細資料",
          disabled: true,
          href: "/memberList/memberDetail/123",
        },
      ],
      memberInfo: {},
      depositRowset: [],
      withdrawRowset: [],
      betHistoryRes: [],
      betPager: {},
      distRes: [],
      distPager:{},
      recommendRes: [],
      reportRowset: [],
      recommendCount: {},
    };
  },
  async asyncData({ params, env }) {
    const memberInfo = await axios.get(
      `${env.ApiUrl}/v1/back/account/${params.id}`
    );
    const depositRes = await axios.get(
      `${env.ApiUrl}/v1/back/deposit/${params.id}`
    );
    const withdrawRes = await axios.get(
      `${env.ApiUrl}/v1/back/withdraw/${params.id}`
    );
    const recommendRes = await axios.get(
      `${env.ApiUrl}/v1/back/recommend/${params.id}`
    );
    const reportRes = await axios.get(
      `${env.ApiUrl}/v1/back/report/${params.id}`
    );
    return {
      memberInfo: memberInfo.data.data,
      depositRowset: depositRes.data.data,
      withdrawRowset: withdrawRes.data.data,
      recommendRes: recommendRes.data.data.report,
      recommendCount: recommendRes.data.data.total,
      reportRowset: reportRes.data.data
    };
  },
  async fetch() {
    this.getDistList();
    this.getBetList();
  },
  methods: {
    searchMembers() {
      console.log("searchmember");
    },
    getDistList(pageNumber){
      axios
        .get(`${process.env.ApiUrl}/v1/back/dist/${this.$route.params.id}/` + (pageNumber || 1))
        .then((res) => {
          this.distRes = res.data.data;
          this.distPager = res.data.pager;
        });
    },
    changeDistPage(pageNumber) {
      this.getDistList(pageNumber);
    },
    getBetList(pageNumber){
      axios
        .get(`${process.env.ApiUrl}/v1/back/buys/${this.$route.params.id}/` + (pageNumber || 1))
        .then((res) => {
          this.betHistoryRes = res.data.data;
          this.betPager = res.data.pager;
        });
    },
    changeBetPage(pageNumber) {
      this.getBetList(pageNumber);
    },
    timestampToDate(timestamp) {
      return moment.unix(timestamp).format("YYYY-MM-DD HH:mm:ss");
    },
  },
};
</script>