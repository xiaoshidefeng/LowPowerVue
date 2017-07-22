import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
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
                    component: resolve => require(['../components/page/BaseForm.vue'], resolve)
                }
            ]
        },
        {
            path: '/readme',
            component: resolve => require(['../components/page/Readme.vue'], resolve)
        },
    ]
})
