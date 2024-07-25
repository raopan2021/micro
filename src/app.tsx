import type { AxiosError, AxiosRequestConfig, AxiosResponse, RequestConfig, RunTimeLayoutConfig } from 'umi'

// 错误处理方案： 错误类型
enum ErrorShowType {
  SILENT = 0,
  WARN_MESSAGE = 1,
  ERROR_MESSAGE = 2,
  NOTIFICATION = 3,
  REDIRECT = 9,
}

// 与后端约定的响应数据格式
interface ResponseStructure<T = any> {
  success: boolean
  code: string
  data?: T
  message?: string
  [key: string]: any
}

/**
 * 业务错误处理
 */
function bizErrorHandler(error: any) {
  if (error.info) {
    const { errorMessage, errorCode, showType } = error.info
    switch (showType) {
      case ErrorShowType.SILENT:
        // do nothing
        break
      case ErrorShowType.WARN_MESSAGE:
        // TODO
        break
      case ErrorShowType.ERROR_MESSAGE:
        // TODO
        break
      case ErrorShowType.NOTIFICATION:
        // TODO
        break
      case ErrorShowType.REDIRECT:
        // TODO
        break
      default:
        // TODO
        console.error(errorMessage)
    }
  }
}
/**
 * 请求错误处理
 */
function responseStatusHandler(error: AxiosError) {
  if (error.response) {
    const { status } = error.response as AxiosResponse
    switch (status) {
      case 401:
        // TODO
        break
      case 403:
        // TODO
        break
      case 404:
        // TODO
        break
      default:
        console.error(`Response status:${status}`)
    }
  } else {
    console.error(error.message)
  }
}

export const request: RequestConfig = {
  errorConfig: {
    // 错误抛出
    errorThrower: (res: ResponseStructure) => {
      const { success, data, code, message, errorCode, errorMessage, showType } = res
      if (!success) {
        const error: any = new Error(errorMessage || message)
        error.name = 'BizError'
        error.info = { errorCode: errorCode ?? code, errorMessage: errorMessage ?? message, showType, data }
        throw error // 抛出自制的错误
      }
    },
    // 错误接收及处理
    errorHandler: (error: any, opts) => {
      if (opts?.skipErrorHandler) return
      // 我们的 errorThrower 抛出的错误。
      if (error.name === 'BizError') {
        bizErrorHandler(error)
      } else if (error.response) {
        // Axios 的错误
        // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
        responseStatusHandler(error)
      } else if (error.request) {
        // 请求已经成功发起，但没有收到响应
        // error.request 在浏览器中是 XMLHttpRequest 的实例
        // 而在node.js中是 http.ClientRequest 的实例
        // TODO
        console.error('None response! Please retry.')
      } else {
        // 发送请求时出了点问题
        // TODO
        console.error('Request error, please retry')
      }
    },
  },
  // 请求拦截器
  requestInterceptors: [
    [
      (config: AxiosRequestConfig) => {
        // 拦截请求配置，进行个性化处理。
        return { ...config }
      },
      (error) => {
        return Promise.reject(error)
      },
    ],
  ],
  // 响应拦截器
  responseInterceptors: [
    (response: AxiosResponse) => {
      // 拦截响应数据，进行个性化处理
      const { config, data } = response
      !data &&
        request.errorConfig?.errorThrower?.({
          success: false,
          code: 'E0001',
          message: '缺少响应数据',
        })
      if (!data.success) {
        // TODO
        request.errorConfig?.errorThrower?.(data)
      }
      return response
    },
  ],
}

// 更多参数见: https://procomponents.ant.design/components/layout#prolayout
export const layout: RunTimeLayoutConfig = () => {
  return {
    layout: 'mix',
  }
}
