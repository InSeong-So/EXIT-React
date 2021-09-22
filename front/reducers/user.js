export const initialState = {
  isLoggingIn: false,   // 로그인 시도 중
  isLoggedIn: false,    // 로그인 여부
  isLoggingOut: false,  // 로그아웃 시도 중
  me: null,
  signUpData: {},
  loginData: {},
}

// action creater
export const loginRequestAction = (data) => {
  return {
    type: 'LOG_IN_REQUEST',
    data,
  }
}

// action creater
export const logoutRequestAction = (data) => {
  return {
    type: 'LOG_OUT_REQUEST',
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOG_IN_REQUEST':
      return {
        ...state,
        isLoggingIn: true,
      }
    case 'LOG_IN_SUCCESS':
      return {
        ...state,
        isLoggingIn: false,
        isLoggedIn: true,
        me: { ...action.data, nickname: 'parang' }
      }
    case 'LOG_IN_FAILURE':
      return {
        ...state,
        isLoggingIn: false,
        isLoggedIn: true,
      }
    case 'LOG_OUT_REQUEST':
      return {
        ...state,
        isLoggingOut: true,
      }
    case 'LOG_OUT_SUCCESS':
      return {
        ...state,
        isLoggingOut: false,
        isLoggedIn: false,
        me: null
      }
    case 'LOG_OUT_FAILURE':
      return {
        ...state,
        isLoggingOut: false,
      }
    default:
      return state
  }
}

export default reducer