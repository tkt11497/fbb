<template>
  <v-container
    fluid
    class="px-10 pt-7"
    :class="{ fontSize: $vuetify.breakpoint.mobile }"
  >
    <v-row no-gutters>
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
              {{ item.text }}</span
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
            <span class="ml-2" style="font-weight: bold; max-width: 97%"
              >{{memberInfo.username}}</span
            >
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
              {{memberInfo.login_date}}</span
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
            <span class="ml-2">推薦人帳號: </span>
          </div>
          <div
            class="d-flex justify-start align-center"
            style="width: 75%; height: 100%"
          >
            <span class="ml-2" style="font-weight: bold; max-width: 97%"
              >{{memberInfo.recommender}}</span
            >
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
            <span class="ml-2">註冊時間: </span>
            <!-- regs time -->
          </div>
          <div
            class="d-flex justify-start align-center"
            style="width: 75%; height: 100%"
          >
            <span class="ml-2" style="font-weight: bold; max-width: 97%">
              {{memberInfo.created_date}}</span
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
              {{memberInfo.wallet}}</span
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
            <v-card flat color="#9ABDE4" min-height="35vh">
              <v-card flat min-height="30vh" color="#9ABDE4">
                <v-row>
                  <v-col cols="3">局號 </v-col>
                  <v-col cols="3"> 購買時間 </v-col>
                  <v-col cols="2">張數</v-col>
                  <v-col cols="2"> 寶寶 </v-col>
                  <v-col cols="2"> 遊戲結果</v-col>
                </v-row>
                <hr
                  style="
                    height: 3px;
                    background-color: #4472c4;
                    border-width: 0;
                  "
                />
                <v-row class="my-1" dense v-for="n in 10" :key="n">
                  <v-col cols="3">682期 </v-col>
                  <v-col cols="3">2020/09/15 12:14 </v-col>
                  <v-col cols="2">10</v-col>
                  <v-col cols="2">豪哥</v-col>
                  <v-col cols="2">豪哥勝</v-col>
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
          出入金紀錄:
          <template v-slot:actions>
            <v-icon x-large color="primary">$expand</v-icon>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-flex xs12 md12 class="mt-1">
            <v-card flat color="#9ABDE4" min-height="35vh">
              <v-card flat min-height="30vh" color="#9ABDE4">
                <v-row>
                  <v-col cols="2">入/出 </v-col>
                  <v-col cols="3"> 日期 </v-col>
                  <v-col cols="2">數量</v-col>
                  <v-col cols="5"> 錢包地址 </v-col>
                </v-row>
                <hr
                  style="
                    height: 3px;
                    background-color: #4472c4;
                    border-width: 0;
                  "
                />
                <v-row class="my-1" dense v-for="n in 10" :key="n">
                  <v-col cols="2">出金 </v-col>
                  <v-col cols="3">2020/09/15 12:14 </v-col>
                  <v-col cols="2">1000 </v-col>
                  <v-col cols="5">slsdkajdlkjdlkajlkdj</v-col>
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
      <v-expansion-panel
        v-for="(item, i) in items"
        :key="i"
        class="mx-4 mt-1"
        style="background-color: #9abde4"
      >
        <v-expansion-panel-header>
          {{ item }}
          <template v-slot:actions>
            <v-icon x-large color="primary">$expand</v-icon>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-flex xs12 md12 class="mt-1">
            <v-card flat color="#9ABDE4" min-height="35vh">
              <v-card flat min-height="30vh" color="#9ABDE4">
                <v-row>
                  <v-col cols="4">時間 </v-col>
                  <v-col cols="4"> 分紅</v-col>
                  <v-col cols="4"></v-col>
                </v-row>
                <hr
                  style="
                    height: 3px;
                    background-color: #4472c4;
                    border-width: 0;
                  "
                />
                <v-row class="my-1" dense v-for="n in 10" :key="n">
                  <v-col cols="4">2020/09/15 12:54 </v-col>
                  <v-col cols="4"> 1000</v-col>
                  <v-col cols="4"> </v-col>
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
    </v-expansion-panels>
  </v-container>
</template>
<style scoped>
.fontSize {
  font-size: 11px;
}
</style>
<script>
const axios = require('axios');
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
      items: ["獨贏分紅:", "座位分紅:", "推薦分紅:"],
      memberInfo: {}
    };
  },
  asyncData(context){
        return axios.get(`http://13.88.221.88:8002/api/v1/back/account/${context.params.id}`).then(
            res => {
                return { memberInfo: res.data.data}
            }
        )
    },
  methods: {
    searchMembers() {
      console.log("searchmember");
    },
    changePage(e) {
      if (this.pageNumber <= 1) {
        if (e == "-") {
          return;
        } else {
          this.pageNumber += 1;
        }
      } else {
        switch (e) {
          case "+":
            this.pageNumber += 1;
            break;
          case "-":
            this.pageNumber -= 1;
            break;
        }
      }
    },
  },
  watch: {
    pageNumber: function (val, oldVal) {
      //debounce if necessary
      console.log("new: %s, old: %s", val, oldVal);
    },
  },
};
</script>