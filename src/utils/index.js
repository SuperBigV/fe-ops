import axios from 'axios';
import { Message } from 'element-ui';

export const xcTreeFetch = ({
  method,
  root = 'http://127.0.0.1:8085',
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
    root = 'http://127.0.0.1:8086',
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
      root = 'http://127.0.0.1:8084',
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

      export const xcElfFetch = ({
        method,
        root = 'http://127.0.0.1:8090',
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
  
        export const xcFetch = ({
          method,
          root = 'http://127.0.0.1:8081',
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
        
        export const xcAresFetch = ({
          method,
          root = 'http://127.0.0.1:8085',
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
