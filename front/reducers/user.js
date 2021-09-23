import produce from '../util/produce';

export const initialState = {
  isSignupLoading: false, // 회원가입 시도 중
  isSignupDone: false, // 회원가입 완료
  isSignupError: null, // 회원가입 에러
  isLoginLoading: false, // 로그인 시도 중
  isLogin: false, // 로그인 여부
  isLoginError: null, // 로그인 에러
  isLogoutLoading: false, // 로그아웃 시도 중
  isLogoutDone: false, // 로그아웃 완료
  isLogoutError: null, // 로그아웃 에러
  isChangeNicknameLoading: false, // 닉네임 변경 시도 중
  isChangeNicknameDone: false, // 닉네임 변경 완료
  isChangeNicknameError: null, // 닉네임 변경 에러
  me: null,
  signUpData: {},
  LoginData: {},
};

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const CHANGE_NICKNAME_REQUEST = 'CHANGE_NICKNAME_REQUEST';
export const CHANGE_NICKNAME_SUCCESS = 'CHANGE_NICKNAME_SUCCESS';
export const CHANGE_NICKNAME_FAILURE = 'CHANGE_NICKNAME_FAILURE';

export const FOLLOW_REQUEST = 'FOLLOW_REQUEST';
export const FOLLOW_SUCCESS = 'FOLLOW_SUCCESS';
export const FOLLOW_FAILURE = 'FOLLOW_FAILURE';

export const UNFOLLOW_REQUEST = 'UNFOLLOW_REQUEST';
export const UNFOLLOW_SUCCESS = 'UNFOLLOW_SUCCESS';
export const UNFOLLOW_FAILURE = 'UNFOLLOW_FAILURE';

export const ADD_POST_TO_ME = 'ADD_POST_TO_ME';
export const REMOVE_POST_TO_ME = 'REMOVE_POST_TO_ME';

const dummyUser = data => ({
  ...data,
  nickname: '파랑',
  id: 1,
  Posts: [{ id: 1 }],
  Followings: [
    { nickname: '파랑파랑' },
    { nickname: '랑파랑파' },
    { nickname: '파파파랑' },
    { nickname: '파랑랑랑' },
  ],
  Followers: [
    { nickname: '파랑파랑' },
    { nickname: '랑파랑파' },
    { nickname: '파파파랑' },
    { nickname: '파랑랑랑' },
  ],
});

// action creater
export const LoginRequestAction = data => {
  return {
    type: LOG_IN_REQUEST,
    data,
  };
};

// action creater
export const LogoutRequestAction = () => {
  return {
    type: LOG_OUT_REQUEST,
  };
};

const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SIGN_UP_REQUEST:
        draft.isSignupLoading = true;
        draft.isSignupDone = false;
        draft.isSignupError = null;
        break;
      case SIGN_UP_SUCCESS:
        draft.isSignupLoading = false;
        draft.isSignupDone = true;
        break;
      case SIGN_UP_FAILURE:
        draft.isSignupLoading = false;
        draft.isSignupError = action.error;
        break;
      case LOG_IN_REQUEST:
        draft.isLoginLoading = true;
        draft.isLoginDone = false;
        draft.isLoginError = null;
        break;
      case LOG_IN_SUCCESS:
        draft.isLoginLoading = false;
        draft.isLoginDone = true;
        draft.isLogin = true;
        draft.me = dummyUser(action.data);
        break;
      case LOG_IN_FAILURE:
        draft.isLoginLoading = false;
        draft.isLoginError = action.error;
        break;
      case LOG_OUT_REQUEST:
        draft.isLogoutLoading = true;
        draft.isLogoutDone = false;
        draft.isLogoutError = null;
        break;
      case LOG_OUT_SUCCESS:
        draft.isLogoutLoading = false;
        draft.isLogoutDone = true;
        draft.isLogin = false;
        draft.me = null;
        break;
      case LOG_OUT_FAILURE:
        draft.isLogoutLoading = false;
        draft.isLogoutError = action.error;
        break;
      case CHANGE_NICKNAME_REQUEST:
        draft.isChangeNicknameLoading = true;
        draft.isChangeNicknameDone = false;
        draft.isChangeNicknameError = null;
        break;
      case CHANGE_NICKNAME_SUCCESS:
        draft.isChangeNicknameLoading = false;
        draft.isChangeNicknameDone = true;
        break;
      case CHANGE_NICKNAME_FAILURE:
        draft.isChangeNicknameLoading = false;
        draft.isChangeNicknameError = action.error;
        break;
      case ADD_POST_TO_ME:
        draft.me.Posts.unshift({ id: action.data });
        break;
      case REMOVE_POST_TO_ME:
        draft.me.Posts = draft.me.Posts.filter(post => post.id !== action.data);
        break;
      default:
        break;
    }
  });

export default reducer;
