import axios from 'axios';
import { Message } from 'element-ui';

export const xcFetch = ({
  method,
  root = 'http://atlas.ixiaochuan.cn:8086',
  // root = 'http://themis.pe.ixiaochuan.cn',
  path,
  params = {},
  data,
  headers = {},
}) => axios({
  method,
  url: `${root}${path}`,
  params,
  data,
  headers: {
    ...headers,
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  timeout: 1000 * 20,
}).then((res) => {
  if (res.data.code !== 1001) {
    throw res.data;
  }
  return res.data;
})
  .catch((e) => {
    const message = e.msg || e.message || '服务器内部错误';
    Message({
      message,
      type: 'error',
      duration: 2000,
    });
    throw e;
  });

  // form (url, data, config, success, fail) {
  //   axios.post(baseURL + url, data, config).then(function (response) {
  //     return success(checkStatus(response));
  //   }).catch(function (res) {
  //     return fail(checkCode(res));
  //   });
  // };
  
 
export const xcPostUpload = ({
    method,
    // root = 'http://themis.pe.ixiaochuan.cn',
    root = 'http://atlas.ixiaochuan.cn:8086',
    path,
    params = {},
    data,
    headers = {},
  }) => axios({
    method,
    url: `${root}${path}`,
    params,
    data,
    headers: {
      ...headers,
      'Content-Type': 'multipart/form-data',
    },
    withCredentials: true,
    timeout: 1000 * 20,
  }).then((res) => {
    if (res.data.code !== 1001) {
      throw res.data;
    }
    return res.data;
  })
    .catch((e) => {
      const message = e.msg || e.message || '服务器内部错误';
      Message({
        message,
        type: 'error',
        duration: 2000,
      });
      throw e;
    });

export const emitter = {
  methods: {
    $xcDispatch(componentName, eventName, value) {
      let parent = this.$parent;
      while (parent) {
        if (parent.$options.componentName === componentName) {
          parent.$emit(eventName, value);
          break;
        }
        parent = parent.$options.parent;
      }
    },
  },
};
export const xcTreeFetch = ({
  method,
  root = 'http://atlas.ixiaochuan.cn:8085',
  // root = 'http://ares.pe.ixiaochuan.cn',
  path,
  params = {},
  data,
  headers = {},
}) => axios({
  method,
  url: `${root}${path}`,
  params,
  data,
  headers: {
    ...headers,
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  timeout: 1000 * 20,
}).then((res) => {
  if (res.data.code !== 1001) {
    throw res.data;
  }
  return res.data;
})
  .catch((e) => {
    const message = e.msg || e.message || '服务器内部错误';
    Message({
      message,
      type: 'error',
      duration: 2000,
    });
    throw e;
  });

  export const xcThemisFetch = ({
    method,
    root = 'http://atlas.ixiaochuan.cn:8086',
    // root = 'http://themis.pe.ixiaochuan.cn',
    path,
    params = {},
    data,
    headers = {},
  }) => axios({
    method,
    url: `${root}${path}`,
    params,
    data,
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    withCredentials: true,
    timeout: 1000 * 20,
  }).then((res) => {
    if (res.data.code !== 1001) {
      throw res.data;
    }
    return res.data;
  })
    .catch((e) => {
      const message = e.msg || e.message || '服务器内部错误';
      Message({
        message,
        type: 'error',
        duration: 2000,
      });
      throw e;
    });

    export const xcCmdbFetch = ({
      method,
      root = 'http://atlas.ixiaochuan.cn:8084',
      // root = 'http://cmdb.pe.ixiaochuan.cn',
      path,
      params = {},
      data,
      headers = {},
    }) => axios({
      method,
      url: `${root}${path}`,
      params,
      data,
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
      withCredentials: true,
      timeout: 1000 * 20,
    }).then((res) => {
      if (res.data.code !== 1001) {
        throw res.data;
      }
      return res.data;
    })
      .catch((e) => {
        const message = e.msg || e.message || '服务器内部错误';
        Message({
          message,
          type: 'error',
          duration: 2000,
        });
        throw e;
      });

   