import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '自述文件' },
            children:[
                {
                    path: '/dashboard',
                    component: resolve => require(['../components/page/Dashboard.vue'], resolve),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/user-form',
                    component: resolve => require(['../components/page/UserTable.vue'], resolve),
                    meta: { title: '用户管理' }
                },
                {
                    path: '/group-form',
                    component: resolve => require(['../components/page/GroupTable.vue'], resolve),
                    meta: { title: '用户组管理' }
                },
                {
                    path: '/system-user-form',
                    component: resolve => require(['../components/page/SystemUserTable.vue'], resolve),
                    meta: { title: '系统用户管理' }
                },
                {
                    path: '/system',
                    component: resolve => require(['../components/page/SystemTable.vue'], resolve),
                    meta: { title: '系统管理' }
                },
                {
                    path: '/elf',
                    component: resolve => require(['../components/page/SystemElf.vue'], resolve),
                    meta: { title: '初始化' }
                },
                {
                    path: '/user-priv',
                    component: resolve => require(['../components/page/UserPriv.vue'], resolve),
                    meta: { title: '用户授权' }
                },

                {
                    path: '/user-priv-search',
                    component: resolve => require(['../components/page/PrivSearch.vue'], resolve),
                    meta: { title: '用户权限' }
                },
                {
                    path: '/user-priv-temp',
                    component: resolve => require(['../components/page/UserTempPriv.vue'], resolve),
                    meta: { title: '临时权限' }
                },
                {
                    path: '/priv-template',
                    component: resolve => require(['../components/page/PrivTemplate.vue'], resolve),
                    meta: { title: '权限模板' }
                },
                {
                    path: '/priv-instance',
                    component: resolve => require(['../components/page/PrivInstance.vue'], resolve),
                    meta: { title: '模板实例' }
                }, 
                {
                    path: '/tree',
                    component: resolve => require(['../components/page/Tree.vue'], resolve),
                    meta: { title: '服务树' }
                },
                {
                    path: '/atlas',
                    component: resolve => require(['../components/page/Budget.vue'], resolve),
                    meta: { title: '预算' }
                },
                {
                    path: '/order',
                    component: resolve => require(['../components/page/Order.vue'], resolve),
                    meta: { title: '工单' }
                },
                {
                    path: '/cmdb',
                    component: resolve => require(['../components/page/CMDB.vue'], resolve),
                    meta: { title: 'CMDB' }
                },
                {
                    path: '/elfresult',
                    component: resolve => require(['../components/page/ElfResult.vue'], resolve),
                    meta: { title: '初始化结果' }
                },
                {
                    path: '/404',
                    component: resolve => require(['../components/page/404.vue'], resolve),
                    meta: { title: '404' }
                }
            
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})
