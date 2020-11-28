<template>
  <v-container
    fluid
    class="px-10 pt-7"
    :class="{ fontSize: $vuetify.breakpoint.mobile }"
  >
    <v-row no-gutters>
      <span :style="{ color: 'black', 'font-size': '25px' }"> 遊戲錢包 </span>
    </v-row>
    <v-row no-gutters>
      <v-col cols="5">
        <hr style="height: 5px; background-color: #4472c4; border-width: 0" />
      </v-col>
      <v-col cols="7"></v-col>
    </v-row>

    <v-row
      no-gutters
      class="mx-4 mt-2"
    >
      <v-col :md="12" :sm="12">
        <v-card
          min-width="280px"
          style="height: 50px; background-color: #9abde4"
          class="d-flex"
        >
          <div
            class="d-flex justify-start align-center"
            style="width: 20%; height: 100%"
          >
            <span class="ml-2">官方錢包地址 : </span>
          </div>
          <div
            class="d-flex justify-start align-center"
            style="width: 60%; height: 100%"
          >
            <v-row
              no-gutters
              style="height: 40px"
              justify="end"
              v-if="unLockarr.includes('dist_wallet')"
            >
              <v-text-field
                color="black"
                outlined
                type="text"
                background-color="white"
                dense
                v-model="walletInfo.dist_wallet"
                class="mr-1"
              >
              </v-text-field>
            </v-row>
            <span v-else>{{ walletInfo.dist_wallet }}</span>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-row
      no-gutters
      class="mx-4 mt-2"
    >
      <v-col :md="12" :sm="12">
        <v-card
          min-width="280px"
          style="height: 50px; background-color: #9abde4"
          class="d-flex"
        >
          <div
            class="d-flex justify-start align-center"
            style="width: 20%; height: 100%"
          >
            <span class="ml-2">玩家錢包上限 :</span>
          </div>
          <div
            class="d-flex justify-start align-center"
            style="width: 60%; height: 100%"
          >
            <v-row
              no-gutters
              style="height: 40px"
              justify="end"
              v-if="unLockarr.includes('withdraw_limit')"
            >
              <v-text-field
                color="black"
                outlined
                type="text"
                background-color="white"
                dense
                v-model="walletInfo.withdraw_limit"
                class="mr-1"
              >
              </v-text-field>
            </v-row>
            <span v-else>{{ walletInfo.withdraw_limit }}</span>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-row
      no-gutters
      class="mx-4 mt-2"
    >
      <v-col :md="12" :sm="12">
        <v-card
          min-width="280px"
          style="height: 50px; background-color: #9abde4"
          class="d-flex"
        >
          <div
            class="d-flex justify-start align-center"
            style="width: 20%; height: 100%"
          >
            <span class="ml-2">玩家出金下限 : </span>
          </div>
          <div
            class="d-flex justify-start align-center"
            style="width: 60%; height: 100%"
          >
            <v-row
              no-gutters
              style="height: 40px"
              justify="end"
              v-if="unLockarr.includes('transfer_limit')"
            >
              <v-text-field
                color="black"
                outlined
                type="text"
                background-color="white"
                dense
                v-model="walletInfo.transfer_limit"
                class="mr-1"
              >
              </v-text-field>
            </v-row>
            <span v-else>{{ walletInfo.transfer_limit }}</span>
          </div>
          <!-- div
            class="d-flex justify-end align-center"
            style="width: 20%; height: 100%"
          >
            <v-btn
              v-if="!unLockarr.includes('transfer_limit')"
              class="mr-2"
              small
              @click="unlockRow('transfer_limit')"
            >
              <span style="font-weight: bold">修改</span>
            </v-btn>
            <v-btn v-else class="mr-2" small @click="lockRow('transfer_limit')">
              <span style="font-weight: bold">確定</span>
            </v-btn>
          </div -->
        </v-card>
      </v-col>
    </v-row>
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
        walletInfo:{},
        unLockarr: [],
    };
  },
  async asyncData({ params, env }) {
    const walletInfo = await axios.get(
      `${env.ApiUrl}/v1/back/walletinfo`
    );
    return {
      walletInfo: walletInfo.data.data,
    };
  },
  methods: {
    unlockRow(n) {
      this.unLockarr.push(n);
    },
    lockRow(n) {
      this.unLockarr = this.unLockarr.filter((i) => i != n);
    },
  },
  watch: {},
};
</script>