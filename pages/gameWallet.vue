<template>
<v-container fluid class="px-10 pt-7" :class="{fontSize:$vuetify.breakpoint.mobile}">
        <v-row no-gutters >  
         
                      <span :style="{color:'black','font-size':'25px'}" > 遊戲錢包 </span>
                  
        </v-row>
         <v-row no-gutters >  
          <v-col cols="5">
              <hr style="height:5px;background-color:#4472C4;border-width:0;">
          </v-col>
          <v-col cols="7"></v-col>
          
        </v-row>
      

                        <v-row no-gutters class="mx-4 mt-2" v-for="(v,k,n) in userWallet" :key="n">
                            <v-col :md="12" :sm='12' >
                                <v-card min-width="280px" style="height:50px;background-color:#9ABDE4;" class="d-flex" >
                                    <div class="d-flex justify-start align-center" style="width:20%;height:100%;">
                                        <span class="ml-2">{{k}}  : </span>
                                    </div>
                                    <div class="d-flex justify-start align-center" style="width:60%;height:100%;">
                                          <v-row no-gutters style="height:40px" justify="end" v-if="unLockarr.includes(n)">
                                            <v-text-field color="black" outlined 
                                                    type="text" background-color="white" dense  
                                                    v-model="userWallet[k]"
                                                > 
                                                </v-text-field>
                                          </v-row>
                                          <span v-else>{{v}}</span>
                                       
                                    </div>
                                    <div class="d-flex justify-end align-center" style="width:20%;height:100%;">
                                        <v-btn v-if="!(unLockarr.includes(n))"
                                        class="mr-2" small @click="unlockRow(n)">
                                                <span style="font-weight:bold">修改</span>
                                                <!-- detail 確定-->
                                        </v-btn>
                                         <v-btn v-else
                                         class="mr-2" small @click="lockRow(n)">
                                                <span style="font-weight:bold">確定</span>
                                                <!-- detail 確定-->
                                        </v-btn>
                                    </div>
                                </v-card>
                            </v-col>
                            
                            
                        </v-row> 
 
          
        
 </v-container>
</template>
<style scoped>
    .fontSize{
        font-size: 11px;
    }
</style>
<script>
export default {
    data(){
        return{
            userWallet:{
                官方總錢包:'3000450asdada',
                官方入金錢包:'12123213213123213213213213',
                官方出金錢包:'12321321321321321321321312',
                玩家錢包上限:50,
                手續費錢包:'12321321321321321'
            },
            unLockarr:[]
        }
    },
    methods:{
      
        unlockRow(n){
            this.unLockarr.push(n)
        },
        lockRow(n){
            this.unLockarr=this.unLockarr.filter(i=>i!=n)
        }
    },
     watch: {
     }
}
</script>