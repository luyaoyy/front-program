import Vuex from "vuex";
import Vue from "vue";
Vue.use(Vuex)
const actions={}
const mutations={}
const state={
    user:{},
    admin:{},
    allMovieList:[],
    movie:{},
    isFavorite:true,
    commentList:[]
}
const store=new Vuex.Store({
    actions,
    mutations,
    state
})
export default store