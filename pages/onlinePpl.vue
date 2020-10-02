<template>
 <v-container fluid class="px-10 pt-7" :class="{fontSize:$vuetify.breakpoint.mobile}">
        <v-row no-gutters >  
                      <span :style="{color:'black','font-size':'20px'}" >  上線人數</span>
         
        </v-row>
         <v-row no-gutters >  
          <v-col cols="5">
              <hr style="height:5px;background-color:#4472C4;border-width:0;">
          </v-col>
          <v-col cols="7"></v-col>
          
        </v-row>
      
         
                            
                            
                        
                        <v-expansion-panels class="mx-4 mt-1">
                            <v-expansion-panel
                            class="mx-4 mt-1" 
                             style="background-color:#9ABDE4"
                            >
                            <v-expansion-panel-header >
                                每日上線人數:
                                <template v-slot:actions>
                                    <v-icon x-large color="primary">$expand</v-icon>
                                </template>
                             </v-expansion-panel-header>
                            <v-expansion-panel-content>
                                 <v-flex  xs12 md12  class="mt-1">
                                                <v-card flat  color="#9ABDE4" min-height="35vh" >
                                                    <v-card  flat min-height="30vh" color="#9ABDE4">
                                                                <v-row>
                                                                    <v-col cols="4">日期 </v-col>
                                                                    <v-col cols="4">  上線人數</v-col>
                                                                    <v-col cols="4"></v-col>
                                                                </v-row> 
                                                                <hr  style="height:3px;background-color:#4472C4;border-width:0;">
                                                                <v-row  class="my-1" dense v-for="n in 10" :key="n">
                                                                    <v-col cols="4">2020/09/15 12:54 </v-col>
                                                                    <v-col cols="4">   15人</v-col>
                                                                    <v-col cols="4">
                                                                       
                                                                    </v-col>
                                                                </v-row> 
                                                    </v-card>
                                                    <v-row no-gutters  justify="center" align="center">
                                                        
                                                        <v-btn icon x-large color="#4472C4" style="transform:rotateY(180deg)" @click="changePage('-')"> 
                                                            <v-icon x-large>forward</v-icon>
                                                        </v-btn>
                                                        <div style="height:40px;width:50px;">
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
                            class="mx-4 mt-1" 
                             style="background-color:#9ABDE4"
                            >
                            <v-expansion-panel-header >
                               每局上線人數: 
                                <template v-slot:actions>
                                    <v-icon x-large color="primary">$expand</v-icon>
                                </template>
                             </v-expansion-panel-header>
                            <v-expansion-panel-content>
                                 <v-flex  xs12 md12  class="mt-1">
                                                <v-card flat  color="#9ABDE4" min-height="35vh" >
                                                    <v-card  flat min-height="30vh" color="#9ABDE4">
                                                                <v-row>
                                                                    <v-col cols="4">局號 </v-col>
                                                                    <v-col cols="4"> 上線人數</v-col>
                                                                    <v-col cols="4"></v-col>
                                                                </v-row> 
                                                                <hr  style="height:3px;background-color:#4472C4;border-width:0;">
                                                                <v-row  class="my-1" dense v-for="n in 10" :key="n">
                                                                    <v-col cols="4">第800局 </v-col>
                                                                    <v-col cols="4"> 56人</v-col>
                                                                    <v-col cols="4">
                                                                       
                                                                    </v-col>
                                                                </v-row> 
                                                    </v-card>
                                                    <v-row no-gutters  justify="center" align="center">
                                                        
                                                        <v-btn icon x-large color="#4472C4" style="transform:rotateY(180deg)" @click="changePage('-')"> 
                                                            <v-icon x-large>forward</v-icon>
                                                        </v-btn>
                                                        <div style="height:40px;width:50px;">
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
    .fontSize{
        font-size: 11px;
    }
</style>
<script>
export default {
    data(){
        return{
            pageNumber:1,
        }
    },
    methods:{
        searchMembers(){
            console.log('searchmember')
        },
        changePage(e){
            if(this.pageNumber<=1){
                if(e=='-'){
                    return
                }else{
                    this.pageNumber+=1
                }
            }else{

            switch(e){
                case '+':
                    this.pageNumber+=1
                    break;
                case '-':
                    this.pageNumber-=1
                    break;
            }
            }
        }
    },
     watch: {
           pageNumber: function (val, oldVal) {
               //debounce if necessary
            console.log('new: %s, old: %s', val, oldVal)
        },
     }
}
</script>