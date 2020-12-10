export const state = () => ({
    isLogin: false,
    token: null
  })
  
  export const mutations = {
    SET_IS_LOGIN (state, value) {
        state.isLogin = value;
    },
    SET_TOKEN (state, value){
        state.token = value;
    }
  }