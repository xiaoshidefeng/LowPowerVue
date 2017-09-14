import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/readme'
        },
        {
            path: '/readme',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            children:[
                {
                    path: '/',
                    component: resolve => require(['../components/page/Readme.vue'], resolve)
                },
                {
                    path: '/lowpower',
                    component: resolve => require(['../components/page/BaseTable.vue'], resolve)
                },
                {
                    path: '/binddorm',
                    meta: {
                        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
                    },
                    component: resolve => require(['../components/page/BaseForm.vue'], resolve)

                },
                {
                  path: '/forget_password',
                  component: resolve => require(['../components/page/ForgetPassword.vue'], resolve)
                }
            ]
        },
        {
            path: '/readme',
            component: resolve => require(['../components/page/Readme.vue'], resolve)
        }
    ]

})

router.beforeEach((to, from, next) => {
  if (to.matched.some(res => res.meta.requireAuth)) {
    if(getCookie('lowPowerToken') != null) {
      next();
    } else {
      next({
        path: '/readme',
        query: {redirect: to.fullPath}
      })
    }
  } else {
    next();
  }
})

function getCookie(name) {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg))
    return unescape(arr[2]);
  else
    return null;
}

export default router
//
// export default new Router({
//     mode: 'history',
//     routes: [
//         {
//             path: '/',
//             redirect: '/readme'
//         },
//         {
//             path: '/readme',
//             component: resolve => require(['../components/common/Home.vue'], resolve),
//             children:[
//                 {
//                     path: '/',
//                     component: resolve => require(['../components/page/Readme.vue'], resolve)
//                 },
//                 {
//                     path: '/lowpower',
//                     component: resolve => require(['../components/page/BaseTable.vue'], resolve)
//                 },
//                 {
//                     path: '/binddorm',
//                     meta: {
//                         requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
//                     },
//                     component: resolve => require(['../components/page/BaseForm.vue'], resolve)
//
//                 },
//                 {
//                   path: '/forget_password',
//                   component: resolve => require(['../components/page/ForgetPassword.vue'], resolve)
//                 }
//             ]
//         },
//         {
//             path: '/readme',
//             component: resolve => require(['../components/page/Readme.vue'], resolve)
//         }
//     ]
//
// })
