<template>
  <v-app>
     <v-navigation-drawer
      v-model="drawer"
      app
      clipped 
      :permanent="!$vuetify.breakpoint.xs" 
      color="#A1C1E4" 
      width="220px"
      v-if="!$store.state.token"
    >
      <v-btn text 
          v-for="item in items"
          :key="item.text"
          link 
          :to="item.to" 
          class="text-right mt-4 ml-1" 
          active-class="buttonBorder" 
           height="60px" 
           width="200px" 
           color="#A1C1E4" 
           > <span class="buttonText">{{ item.text }}</span></v-btn>
    </v-navigation-drawer>

    <v-app-bar
      app
      clipped-left
      color="#4472C4"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" v-show="$vuetify.breakpoint.xs"></v-app-bar-nav-icon>
      <v-toolbar-title class="ml-4 align-center" @click="goToHomePage" style="cursor:pointer">
        <span style="font-size:30px;color:white">未來寶寶後台管理系統</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn class="mr-3" @click="()=>{return false}"><span style="font-size:20px;font-weight:bold">刷新</span></v-btn>
      <!-- refresh -->
      <v-btn class="mr-3" @click="logout"> <span style="font-size:20px;font-weight:bold">登出</span></v-btn>
      <!-- logout -->
    </v-app-bar>
       <v-main style="background-color:#5b9bd5">
        
          <nuxt />
        
      </v-main>

    </v-app>
</template>
<style scoped>
  .buttonBorder{
    border:1px solid black
  }
  .buttonText{
    font-size:28px;
    font-weight:normal;
    color:black;
    letter-spacing: 6px;
  }
</style>
<script>
  export default {
    props: {
      source: String,
    },
    data: () => ({
      drawer: null,
      items: [
        { text: '會員列表',to:'/memberList' }, //memberlist
        { text: '遊戲紀錄',to:'/gamerecord' },//gamerecord
        { text: '遊戲錢包',to:'/gameWallet' },//game wallet
        { text: '上線人數',to:'/onlinePpl' }//number of online
      ],
    }),
    methods:{
      goToHomePage(){
        this.$router.push('/memberList')
      },
      logout(){
        this.$store.commit('SET_IS_LOGIN', false);
        this.$router.push('/')
      }
    },
    created () {
      if(!this.$store.state.isLogin){
        this.$router.push('/')
      }
    },
  }
</script>