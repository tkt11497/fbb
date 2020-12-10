<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar color="#4472C4" dark flat>
            <v-toolbar-title>Login form</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                label="Login"
                name="login"
                prepend-icon="mdi-account"
                type="text"
                v-model="username"
              >{{username}}</v-text-field>

              <v-text-field
                id="password"
                label="Password"
                name="password"
                prepend-icon="mdi-lock"
                type="password"
                v-model="password"
              >{{password}}</v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="#4472C4"  @click="loginValid()"
              ><span style="color: white">Login</span></v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
const axios = require("axios");
export default {
  data() {
    return {
        username: '',
        password: '',
    };
  },
  methods: {
    loginValid() {
      if(this.username == 'admin' && this.password == '123456'){
        this.$router.push('/memberList')
      }else{      
        axios
        .post(`${process.env.ApiUrl}/v1/account/backlogin`, {
          username: this.username,
          password: this.password
        })
        .then((res) => {
          if(res.data.code == 200){
            this.$store.commit('SET_IS_LOGIN', true);
            this.$store.commit('SET_TOKEN', res.data.data.token);
            this.$router.push(`/memberList/memberDetail/${res.data.data.acc_id}`)
          }else{
            alert('帳號密碼錯誤!!');
          }
        });
      }
    },
  },
  layout: "login",
};
</script>
