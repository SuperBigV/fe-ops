import Vue from 'vue';
import Vuex from 'vuex';
import { saveAs } from 'file-saver'
import { xcTreeFetch } from '@/utils';
import { xcElfFetch } from '@/utils';
import { xcThemisFetch } from '@/utils';
import { xcFetch } from '@/utils';
import { xcAresFetch } from '@/utils';
import { xcCmdbFetch } from '@/utils';
import { Message } from 'element-ui';


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      username: '',
    },
    nodeassets: [],
    node_path: '',
    users: {},
    systemusers: {},
    suppliers: [],
    approvers: [],
    orders: [],
    tree:[],
    search_user_privs: {},
    user_privs: {},
    systems:[],
    jobs: [],
    templates:[],
    nodes:[],
    node_type:'',
    assets: [],
    all_assets: [],
    pdls: [],
  },
  mutations: {
    GET_USERNAME(state, user) {
      state.user = user;
    },

    SET_USERS(state, users){
      state.users=users
    },
    SET_SYSTEM_USERS(state, system_user){
      state.systemusers = system_user
    },
    SET_NODE_ASSETS(state, node_assets){
      state.nodeassets = node_assets
    },
    SET_ALL_ASSETS(state, assets){
      state.all_assets = assets
    },
    SET_NODE_PATH(state, node_path){
      state.node_path = node_path.data
    },
    SET_SYSTEMS(state, systems){
      state.systems=systems
    },
    SET_JOBS(state, jobs){
      state.jobs = jobs
    },

    SET_GROUP(state, groups){
      state.groups = groups
    },
    SET_NODE_TYPE(state, node_type){
      state.node_type = node_type
    },

    GET_SUPPLIERS(state, suppliers) {
      suppliers.forEach((supplier) => {
        (supplier.region || []).forEach((r) => {
          (r.zone || []).forEach((z) => {
            if (z.amount === undefined) {
              // eslint-disable-next-line
              z.amount = 0;
            }
          });
        });
      });
      state.suppliers = suppliers;
    },
    GET_APPROVES(state, approvers) {
      state.approvers = approvers;
    },
    CLEAR_ORDERS(state) {
      state.orders = [];
    },
    SET_Result(state, data){
      state.result = data
    },
    SET_USER_PRIVS(state, data){
      state.user_privs = data
    },
    SET_SEARCH_USER_PRIVS(state, data){
      state.search_user_privs = data
    },
    SET_SEARCH_USER_TEMP_PRIVS(state, data){
      state.search_user_temp_privs = data
    },
    SET_ORDERS(state, orders) {
      state.orders = orders;
    },
    SET_USER_TREE(state, user_tree){
      state.tree = user_tree
    },
    SET_TEMPLATES(state, templates){
      state.templates = templates
    },
    SET_TEMPLATE_INSTANCES(state, instances){
      state.template_instance = instances
    },
    
    SET_NODES(state, nodes){
      state.nodes = nodes
    },
    SET_NEAREST_POINTS(state, nearest_pints){
      state.nearestPoints = nearest_pints
    },
    SET_SEARCH_HOSTS(state, hosts){
      state.nodeassets = hosts
    },
    SET_ASSETS(state, assets){
      state.assets = assets
    },
    GET_SUPPLIERS(state, suppliers) {
      suppliers.forEach((supplier) => {
        (supplier.region || []).forEach((r) => {
          (r.zone || []).forEach((z) => {
            if (z.amount === undefined) {
              // eslint-disable-next-line
              z.amount = 0;
            }
          });
        });
      });
      state.suppliers = suppliers;
    },
    GET_APPROVES(state, approvers) {
      state.approvers = approvers;
    },
    GET_PDLS(state, pdls){
      state.pdls = pdls;
    },
    CLEAR_ORDERS(state) {
      state.orders = [];
    },
    SET_ORDERS(state, orders) {
      state.orders = orders;
    },
  },
  actions: {
    // 获取登录用户信息
    async getUserName(context) {
      try {
        const res = await xcThemisFetch({
          method: 'get',
          path: '/user/',
        });
        context.commit('GET_USERNAME', res.data.data);
      } catch (e) {
        if (e.code === 1002 && e.data) {
          location.href = `${e.data.url}?next_url=${location.href}`;
        }
      }
    },
    async getUsers(context, { page, pageSize }) {
      console.log("page:", page)
      const res = await xcThemisFetch({
        method: 'get',
        path: '/api/v2/users/all/',
        params: {
          page_num: page,
          per_page: pageSize
        }
       
      });
      context.commit('SET_USERS', res.data);
    },


    async updateUser(_, data) {
      const res = await xcThemisFetch({
        method: 'post',
        path: '/api/user/update/',
        params: data,
      });
      Message({
        message: res.msg,
        type: 'success',
        duration: 2000,
      });
    },


    
    async privUser(_, data) {
      const res = await xcThemisFetch({
        method: 'post',
        path: '/api/privilege/v1/create/',
        data,
      });
      Message({
        message: res.msg,
        type: 'success',
        duration: 2000,
      });
    },

    async tempGrant(_, data) {
      const res = await xcThemisFetch({
        method: 'post',
        path: '/api/v1/privilege/temp/create/',
        data,
      });
      Message({
        message: res.msg,
        type: 'success',
        duration: 2000,
      });
    },

    async addUser(_, data) {
      const res = await xcThemisFetch({
        method: 'post',
        path: '/api/user/create/',
        data,
      });
      Message({
        message: res.msg,
        type: 'success',
        duration: 2000,
      });
    },

    async deleteUser(_, user_id) {
      const res = await xcThemisFetch({
        method: 'post',
        path: '/api/user/delete/',
        data:{
          id: user_id
        },
      });
      Message({
        message: res.msg,
        type: 'success',
        duration: 2000,
      });
    },

    async deleteJob(_, job_id) {
      const res = await xcElfFetch({
        method: 'post',
        path: '/api/elf/v1/delete',
        data:{
          id: job_id
        },
      });
      Message({
        message: res.msg,
        type: 'success',
        duration: 2000,
      });
    },    

    async doElf(_, data) {
      const res = await xcElfFetch({
        method: 'post',
        path: '/api/elf/manual/elf/',
        data: data
      });
      Message({
        message: res.msg,
        type: 'success',
        duration: 2000,
      });
    }, 

    async getSystemUsers(context, { page, pageSize }) {
      const res = await xcThemisFetch({
        method: 'get',
        path: '/api/user/system/list/',
        params: {
          page_num: page,
          per_page: pageSize
        }
       
      });
      
      context.commit('SET_SYSTEM_USERS', res.data);
    }, 

    async addSystemUser(context, data){
      const res = await xcPostUpload({
        method: 'post',
        path: '/api/user/system/create/',
        data,
      });
      Message({
        message: res.msg,
        type: 'success',
        duration: 2000,
      });
    },
    async updateSystemUser(context, data){
      const res = await xcPostUpload({
        method: 'post',
        path: '/api/user/system/create/',
        data,
      });
      Message({
        message: res.msg,
        type: 'success',
        duration: 2000,
      });
    },
    async uploadAssetsFile(context, data){
      const res = await xcCmdbFetch({
        method: 'post',
        path: '/api/v1/assets/upload/',
        header: {"Content-Type": "multipart/form-data"},
        data,
      });
      Message({
        message: res.msg,
        type: 'success',
        duration: 2000,
      });
    },


    async deleteSystemUser(_, user_id) {
      const res = await xcThemisFetch({
        method: 'post',
        path: '/api/user/system/delete/',
        data:{
          id: user_id
        },
      });
      Message({
        message: res.msg,
        type: 'success',
        duration: 2000,
      });
    },
    async addTreeNode(context, data){
      const res = await xcTreeFetch({
        method: 'post',
        path: '/api/v1/node/create/',
        data
      });
      Message({
        message: res.msg,
        type: 'success',
        duration: 2000,
      });
    },

    
    async deleteNode(context, node_id){
      const res = await xcTreeFetch({
        method: 'post',
        path: '/api/v1/node/delete/',
        params:{
          id: node_id
        }
      });
      Message({
        message: res.msg,
        type: 'success',
        duration: 2000,
      });
    },
    
    async bind_hosts(context, data){
      const res = await xcTreeFetch({
        method: 'post',
        path: '/api/v1/bind/hosts/',
        data
      });
      Message({
        message: res.msg,
        type: 'success',
        duration: 2000,
      });
    }, 

    

    async reboot(context, data){
      const res = await xcTreeFetch({
        method: 'post',
        path: '/api/v1/host/reboot/',
        data
      });
      Message({
        message: res.msg,
        type: 'success',
        duration: 2000,
      });
    }, 

    async offline(context, data){
      const res = await xcTreeFetch({
        method: 'post',
        path: '/api/v1/host/delete/',
        data
      });
      Message({
        message: res.msg,
        type: 'success',
        duration: 2000,
      });
    }, 

    async rename(context, data){
      const res = await xcTreeFetch({
        method: 'post',
        path: '/api/v1/host/rename/',
        data
      });
      Message({
        message: res.msg,
        type: 'success',
        duration: 2000,
      });
    }, 

    async unbind_hosts(context, data){
      const res = await xcTreeFetch({
        method: 'post',
        path: '/api/v1/unbind/hosts/',
        data
      });
      Message({
        message: res.msg,
        type: 'success',
        duration: 2000,
      });
    }, 
    
    // async getUserPrivTags(context) {
    //   const res = await xcTreeFetch({
    //     method: 'get',
    //     path: '/api/v2/trees/',
    //   });
      
    //   context.commit('SET_USER_TREE', res.data);
    // },

    async getUserPrivTags(context) {
      const res = await xcTreeFetch({
        method: 'get',
        path: '/api/v1/priv/tags/',
      });
      
      context.commit('SET_USER_TREE', res.data);
    },

    async globalSearch(context, select_word){
      const res = await xcTreeFetch({
        method: 'get',
        path: '/api/v1/global/search/',
        params:{
          search: select_word
        }
      });
      
      context.commit('SET_SEARCH_HOSTS', res.data);
    },

    async globalSearchUser(context, select_word){
      const res = await xcThemisFetch({
        method: 'get',
        path: '/api/user/v1/user/global/search/',
        params:{
          username: select_word
        }
      });
      
      
      context.commit('SET_USERS', res.data);
    },
    async SearchUserPrivs(context, select_word){
      const res = await xcThemisFetch({
        method: 'get',
        path: '/api/user/v1/privilege/global/search/',
        params:{
          search: select_word
        }
      });
      
      
      context.commit('SET_USER_PRIVS', res.data);
    },
    
    async globalSearchUserPrivs(context, select_word){
      const res = await xcThemisFetch({
        method: 'get',
        path: '/api/user/v1/privilege/global/search/',
        params:{
          search: select_word
        }
      });
      context.commit('SET_SEARCH_USER_PRIVS', res.data);
    },

    
    async globalSearchUserTempPrivs(context, select_word){
      const res = await xcThemisFetch({
        method: 'get',
        path: '/api/user/v1/privilege/temp/global/search/',
        params:{
          search: select_word
        }
      });
      
      context.commit('SET_SEARCH_USER_TEMP_PRIVS', res.data);
    },
    async getNextNodeType(context, node_type){
      const res = await xcTreeFetch({
        method: 'get',
        path: '/api/v1/next/node/type/',
        params:{
          node_type: node_type
        }
      });
      
      context.commit('SET_NODE_TYPE', res.data);
    }, 
    async getNodeAssets(context, node_id){
      const res = await xcTreeFetch({
        method: 'get',
        path: '/api/v2/node/hosts/',
        params: {
          node_id: node_id,
        }
      });
      
      context.commit('SET_NODE_ASSETS', res.data);
    },

    async getAllAssets(context){
      const res = await xcTreeFetch({
        method: 'get',
        path: '/api/v2/node/hosts/',
        params: {
          node_id: 1,
        }
      });
      
      context.commit('SET_ALL_ASSETS', res.data.data);
    },

    async getNodes(context){
      const res = await xcTreeFetch({
        method: 'get',
        path: '/api/v2/tag/paths/',
      });
      context.commit('SET_NODES', res.data);
    },

    async getNodePath(context, node_id){
      const res = await xcTreeFetch({
        method: 'get',
        path: '/api/v2/tag/path/',
        params: {
          node_id: node_id
        }
      });
      
      context.commit('SET_NODE_PATH', res.data);
    },
  
  async getSystems(context){
    const res = await xcThemisFetch({
      method: 'get',
      path: '/api/system/v1/list/',
    });
    
    context.commit('SET_SYSTEMS', res.data); 
  },

  async addSystem(context, data){
    const res = await xcThemisFetch({
      method: 'post',
      path: '/api/system/v1/create/',
      data
    });
    Message({
      message: res.msg,
      type: 'success',
      duration: 2000,
    }); 
  },

  async addGroup(context, data){
    const res = await xcThemisFetch({
      method: 'post',
      path: '/api/v1/group/add/',
      data
    });
    Message({
      message: res.msg,
      type: 'success',
      duration: 2000,
    }); 
  },
  


  async delGroup(context, data){
    const res = await xcThemisFetch({
      method: 'post',
      path: '/api/v1/group/del/',
      data
    });
    Message({
      message: res.msg,
      type: 'success',
      duration: 2000,
    }); 
  },

  async getGroup(context){
    const res = await xcThemisFetch({
      method: 'get',
      path: '/api/v1/group/list/',
    });
    
    context.commit('SET_GROUP', res.data); 
  },   
  
  async resetPass(context, username){
    const res = await xcThemisFetch({
      method: 'post',
      path: '/api/v1/reset/password/',
      params: {
        username: username
      }
    });
    Message({
      message: res.msg,
      type: 'success',
      duration: 2000,
    }); 
  },

  async personalInfoUpdate(context, data){
    const res = await xcThemisFetch({
      method: 'post',
      path: '/api/personal/info/update/',
      data
    });
    Message({
      message: res.msg,
      type: 'success',
      duration: 2000,
    }); 
  },

 
  
  async updateSystem(context, data){
    const res = await xcThemisFetch({
      method: 'post',
      path: '/api/system/v1/update/',
      data,
    });
    Message({
      message: res.msg,
      type: 'success',
      duration: 2000,
    });
  },
  
  async getTemplates(context){
    const res = await xcThemisFetch({
      method: 'get',
      path: '/api/template/v1/list/',
    });
    
    context.commit('SET_TEMPLATES', res.data); 
  },   

  async logout(context){
    const res = await xcThemisFetch({
      method: 'get',
      path: '/logout/',
    });
    if (res.code === 1001 && res.data) {
      location.href = `${res.data.url}?next_url=${location.href}`;
    } 
  
  },   

  async getTempInstances(context, { page, pageSize }){
    const res = await xcThemisFetch({
      method: 'get',
      path: '/api/template/instance/v1/list/',
      params:{
        page_num: page,
        per_page: pageSize 
      }
    });
    
    context.commit('SET_TEMPLATE_INSTANCES', res.data); 
  },   
  async getNearestPoints(context, data){
    const res = await xcThemisFetch({
      method: 'get',
      path: '/api/template/v1/nearest/points/',
      params: {
        tag: data.tag,
        template_name: data.template_name
      }
    });
    
    context.commit('SET_NEAREST_POINTS', res.data); 
  },   

  
  async deleteTemplate(context, temp_id){
    const res = await xcThemisFetch({
      method: 'post',
      path: '/api/template/v1/delete/',
      params:{
        temp_id: temp_id
      },
    });
    Message({
      message: res.msg,
      type: 'success',
      duration: 2000,
    });
  },

  
  async deleteUserPriv(context, data){
    const res = await xcThemisFetch({
      method: 'post',
      path: '/api/privilege/v1/delete/',
      data
    });
    Message({
      message: res.msg,
      type: 'success',
      duration: 2000,
    });
  }, 

  async deleteUserTempPriv(context, data){
    const res = await xcThemisFetch({
      method: 'post',
      path: '/api/privilege/temp/v1/delete/',
      data
    });
    Message({
      message: res.msg,
      type: 'success',
      duration: 2000,
    });
  }, 

  async addTemplate(context, data){
    const res = await xcThemisFetch({
      method: 'post',
      path: '/api/template/v1/create/',
      data
    });
    Message({
      message: res.msg,
      type: 'success',
      duration: 2000,
    });
  },
  
  async createTempateInstance(context, data){
    const res = await xcThemisFetch({
      method: 'post',
      path: '/api/template/v1/instance/create/',
      data
    });
    Message({
      message: res.msg,
      type: 'success',
      duration: 2000,
    });
  },
  async editTempateInstance(context, data){
    const res = await xcThemisFetch({
      method: 'post',
      path: '/api/template/v1/instance/inhert/',
      data,
    });
    Message({
      message: res.msg,
      type: 'success',
      duration: 2000,
    });
  },

  async downloadTemplate(context){
    let link = document.createElement('a')
    link.style.display = 'none'
    link.href = 'http://cmdb.pe.ixiaochuan.cn/api/v1/asset/temp/download/'
    // link.href = 'http://atlas.ixiaochuan.cn:8084/api/v1/asset/temp/download/'
    link.setAttribute('download', 'assets.xlsx')
    document.body.appendChild(link)
    link.click()
    
  },

  async getAssets(context, { page, pageSize }){
    console.log("pages_:", page)
    console.log("size_:", pageSize)
    const res = await xcCmdbFetch({
      method: 'get',
      path: '/api/v2/assets/list/',
      params:{
        page_num: page,
        per_page: pageSize 
      }
    });
    
    context.commit('SET_ASSETS', res.data); 
  },    

  async globalSearchAsset(context, hostname){
    const res = await xcCmdbFetch({
      method: 'get',
      path: '/api/v1/global/search/',
      params:{
        hostname: hostname
      }
    });
    
    context.commit('SET_ASSETS', res.data); 
  },    
  //   async getUserPrivTags(context) {
  //     try {
  //       const res = await xcTreeFetch({
  //         method: 'get',
  //         path: '/api/v2/trees/',
  //       });
  //       console.log(res.data)
  //       context.commit('SET_USER_TREE', res.data);
  //     } catch (e) {
  //       if (e.code === 1002 && e.data) {
  //         location.href = `${e.data.url}?next_url=${location.href}`;
  //       }
  //     }
  //   },

  // }
  // });
  async getJobs(context){
    const res = await xcElfFetch({
      method: 'get',
      path: '/api/elf/v1/list/',
    });
    
    context.commit('SET_JOBS', res.data); 
  },
  async getResults(context, { page, pageSize }){
    const res = await xcElfFetch({
      method: 'get',
      path: '/api/elf/result/list',
      params:{
        page_num: page,
        per_page: pageSize 
      }
    });
    context.commit('SET_Result', res.data); 
  },

  async addJob(context, data){
    const res = await xcElfFetch({
      method: 'post',
      path: '/api/elf/v1/create/',
      data
    });
    Message({
      message: res.msg,
      type: 'success',
      duration: 2000,
    }); 
  },

  async updateJob(context, data){
    const res = await xcElfFetch({
      method: 'post',
      path: '/api/elf/v1/update/',
      data,
    });
    Message({
      message: res.msg,
      type: 'success',
      duration: 2000,
    });
  },
  async getSuppliers(context) {
    const res = await xcFetch({
      method: 'get',
      path: '/api/v1/suppliers/',
    });
    context.commit('GET_SUPPLIERS', res.data.supplizer);
  },
// 获取审批人
async getApprovers(context) {
  const res = await xcThemisFetch({
    method: 'get',
    path: '/api/v2/users/all/',
  });
  context.commit('GET_APPROVES', res.data.data);
},

 // 获取审批人
 async getPdls(context) {
  const res = await xcAresFetch({
    method: 'get',
    path: '/api/v2/tag/paths/',
  });
  context.commit('GET_PDLS', res.data);
},

// 提交主机工单
async purchase(_, data) {
  const res = await xcFetch({
    method: 'post',
    path: '/auth/v1/purchase/action/',
    data,
  });
  Message({
    message: res.msg,
    type: 'success',
    duration: 2000,
  });
},
async getOrders(context, { orderType, page, pageSize }) {
  const pathMap = {
    approve: '/api/v1/order/will/approve/', // 获取需要我审批的工单
    approveing: '/api/v1/order/approveing/', // 获取我发起的待审批的工单
    deliveried: '/api/v1/order/deliveried/', // 获取已交付工单
    approved: '/api/v1/order/approved/', // 获取已审批工单
    refuse: '/api/v1/order/refuse/', // 获取被拒绝的工单
    do: '/api/v1/order/create/', // 获取待执行的工单
  };
  context.commit('CLEAR_ORDERS');

  const res = await xcFetch({
    method: 'get',
    path: pathMap[orderType],
    params: {
      page_num: page,
      per_page: pageSize,
    },
  });
  context.commit('SET_ORDERS', res.data.orders);
  return res;
},
async checkOrder(_, orderId) {
  const res = await xcFetch({
    method: 'post',
    path: '/auth/v1/order/check/',
    data: {
      order_id: orderId,
    },
  });
  Message({
    message: res.msg,
    type: 'success',
    duration: 2000,
  });
},
async refuseOrder(_, { id, reason }) {
  await xcFetch({
    method: 'post',
    path: '/auth/v1/order/refuse/',
    data: {
      order_id: id,
      reason,
    },
  });
},

async doOrder(_,order) {
  const res = await xcFetch({
    method: 'post',
    path: '/auth/v1/order/do/',
    data: order,
  });
  Message({
    message: res.msg,
    type: 'success',
    duration: 2000,
  });
},
  },
 
  
  


  });
  