import VueRouter from "vue-router";

const router = new VueRouter({
    routes: [
        {
            name: 'out',
            path: '/out',
            component: () => import('@/pages/LoginForm/LoginForm')
        },
        {
            name: 'adminInner',
            path: '/adminSucess',
            component: () => import('@/pages/AdminSuccessLogin/AdminSuccessLogin'),
            children: [
                {
                    path: 'Chart',
                    component: () => import('@/pages/Chart/Chart')
                },
                {
                    path: 'AdminInformation',
                    component: () => import('@/pages/AdminInformation/AdminInformation')
                },
                {
                    path: 'MovieList',
                    component: () => import('@/pages/MovieList/MovieList')
                },
                {
                    path: 'SlideImg',
                    component: () => import('@/pages/SlideShowImg/SlideShowImg')
                },
                {
                    path: 'TicketOrderList',
                    component: () => import('@/pages/TicketOrderList/TicketOrderList')
                },
                {
                    path: '/adminSucess',
                    redirect: '/adminSucess/Chart'
                }
            ]
        },


        {
            path: '/UserHomePage',
            name: 'UserHomePage',
            component: () => import('@/pages/UserHomePage/UserHomePage'),
            children: [
                {
                    path: '/UserHomePage',//使用components,路径要写绝对路径，即写全路径
                    components: {
                        SlidShowImg: () => import('@/pages/UserHomePage/pages/SlideShowImg'),
                        MovieCard: () => import('@/pages/UserHomePage/pages/HotMovieCard'),
                        WaitMovieCard: () => import('@/pages/UserHomePage/pages/WaitMovieCard'),
                    }
                },


                {
                    path: '/UserHomePage/MovieDetail',
                    name: 'MovieDetail',
                    components: {
                        MovieDetail: () => import('@/pages/MovieDetail/MovieDetail')
                    },
                    redirect: '/UserHomePage/MovieDetail',
                    children: [
                        {
                            path: '/',
                            name: 'CommentAndIntroduce',
                            component: () => import('@/pages/MovieDetail/CommentAndIntroduce')
                        },
                        {
                            path: 'MovieSession',
                            name: 'MovieSession',
                            component: () => import('@/pages/MovieDetail/MovieSession')
                        }
                    ]
                },


                {
                    path: '/UserHomePage/Movie',
                    components: {
                        Movie: () => import('@/pages/UserHomePage/nevigapages/Movie/AllMovie')
                    },
                    children: [
                        {
                            path: 'HotMovie', //使用component,路径不需要写全
                            name: 'HotMovie',
                            component: () => import("@/pages/UserHomePage/nevigapages/Movie/HotMovie")
                        },
                        {
                            path: 'WaitMovie',
                            name: 'WaitMovie',
                            component: () => import('@/pages/UserHomePage/nevigapages/Movie/WaitMovie')
                        },
                        {
                            path: '/',
                            redirect: '/UserHomePage/Movie/HotMovie'
                        }
                    ]
                },
                {
                    path: "/UserHomePage/SearchResult",
                    components: {
                        SearchResult: () => import('@/pages/UserHomePage/pages/SearchResult')
                    }
                },


                {
                    path: '/UserHomePage/UserOrder',
                    name: 'UserOrder',
                    components:{
                        UserOrder:()=>import('@/pages/UserHomePage/nevigapages/UserOrder/UserOrder')
                    }
                },


                {
                    path: "/UserHomePage/UserInfo",
                    components: {
                        UserNavigation: () => import('@/pages/UserHomePage/nevigapages/UserInfo/UserNavigation')
                    },
                    children: [
                        {
                            path: 'ShowCenter',
                            name: 'ShowCenter',
                            component: () => import ("@/pages/UserHomePage/nevigapages/UserInfo/ShowCenter")
                        },
                        {
                            path: "ShowComment",
                            name: "ShowComment",
                            component: () => import ("@/pages/UserHomePage/nevigapages/UserInfo/ShowComment")
                        },
                        {
                            path: "ShowBalance",
                            name: "ShowBalance",
                            component: () => import ("@/pages/UserHomePage/nevigapages/UserInfo/ShowBalance")
                        },
                        {
                            path: "ShowInfo",
                            name: "ShowInfo",
                            component: () => import ("@/pages/UserHomePage/nevigapages/UserInfo/ShowInfo")
                        },
                        {
                            path: '',
                            redirect: "/UserHomePage/UserInfo/ShowCenter"
                        }
                    ]
                }
            ]
        },


        {
            path: '/',
            redirect: '/UserHomePage'
        },


        {
            path: '/MovieSeat',
            name: 'MovieSeat',
            component: () => import('@/pages/MovieSeat/MovieSeat')
        }
    ]
})

export default router