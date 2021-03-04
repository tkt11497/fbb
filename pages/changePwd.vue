<template>
  <v-container
    fluid
    class="px-10 pt-7"
    :class="{ fontSize: $vuetify.breakpoint.mobile }"
  >
    <v-alert
      :value="alert"
      type="success"
      :color="color"
      border="right"
      dense
    >{{ message }}</v-alert>
    <v-row no-gutters>
      <span :style="{ color: 'black', 'font-size': '25px' }"> 修改密碼 </span>
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
            <span class="ml-2">輸入舊密碼 : </span>
          </div>
          <div
            class="d-flex justify-start align-center"
            style="width: 60%; height: 100%"
          >
            <v-row
              no-gutters
              style="height: 40px"
              justify="end"
            >
              <v-text-field
                color="black"
                outlined
                type="text"
                background-color="white"
                dense
                v-model="oldPwd"
                class="mr-1"
              >
              </v-text-field>
            </v-row>
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
            <span class="ml-2">輸入新密碼 : </span>
          </div>
          <div
            class="d-flex justify-start align-center"
            style="width: 60%; height: 100%"
          >
            <v-row
              no-gutters
              style="height: 40px"
              justify="end"
            >
              <v-text-field
                color="black"
                outlined
                type="text"
                background-color="white"
                dense
                v-model="newPwd"
                class="mr-1"
              >
              </v-text-field>
            </v-row>
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
            <span class="ml-2">再次確認密碼 : </span>
          </div>
          <div
            class="d-flex justify-start align-center"
            style="width: 60%; height: 100%"
          >
            <v-row
              no-gutters
              style="height: 40px"
              justify="end"
            >
              <v-text-field
                color="black"
                outlined
                type="text"
                background-color="white"
                dense
                v-model="chkPwd"
                class="mr-1"
              >
              </v-text-field>
            </v-row>
          </div>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="#4472C4"  @click="onSubmit()"
              ><span style="color: white">送出修改</span></v-btn
            >
          </v-card-actions>
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
        newPwd:"",
        oldPwd:"",
        chkPwd:"",
        message: "",
        alert: false,
        color: "green",
    };
  },
  methods: {
    onSubmit() {
      axios
        .post(`${process.env.ApiUrl}/v1/back/changepwd`, {
          old_password: this.oldPwd,
          new_password: this.newPwd,
          chk_password: this.chkPwd,
        })
        .then((res) => {
          if(res.data.code == 200){
            this.newPwd = "";
            this.oldPwd = "";
            this.chkPwd = "";
            this.message = "修改成功";
            this.color = "green";
          }else{
            this.message = res.data.msg;
            this.color = "red";
          }
          this.alert = true;
        });
    },
  },
  watch: {},
};
</script>