import { createRouter, createWebHashHistory} from 'vue-router';

const Index = ()=>import("../components/index.vue")
const Mine = ()=>import("../components/mine.vue")
const Login = ()=>import("../components/login.vue")
const Register = ()=>import("../components/register.vue")
const SortCore = ()=>import("../components/algos/animate/sort-core.vue")
const Sort = ()=>import("../components/algos/sort.vue")
const SortInteractive = ()=>import("../components/algos/interactive/sort-interactive.vue")
const Hello = ()=>import("../components/hello.vue")


import store from "../store";

const routes=[
  {
    path: '/',
    component: Index,
    children:[
      {
        path: '/',
        component: Hello
      },
      {
        path: '/sort/interactive',
        component:SortInteractive,
      },
      {
        path: '/sort/:type',
        component:Sort,
      }
    ]
  },
  {
    path: '/mine',
    component: Mine
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/register',
    component: Register,
  },
  {
    path: '/debug/s',
    component: SortCore,
  },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
router.beforeEach((to,from,next)=>{

  store.dispatch("Load");
  if(to.fullPath.search("register|login") !== -1){
    if(!store.state.isSignedIn){
      next();
    }
    else{
      router.push("/");
      next();
    }
  }
  else if(to.fullPath.search("mine|interactive") !== -1){
    if(store.state.isSignedIn){
      next();
    }
    else{
      router.push("/login");
      next();
    }
  }
  else{
    next();
  }
})
export default router