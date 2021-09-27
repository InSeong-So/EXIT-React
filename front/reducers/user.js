import produce from '../util/produce';

export const initialState = {
  isLoadMyInfoLoading: false, // 내 정보 가져오는 중
  isLoadMyInfoDone: false, // 내 정보 가져오기 완료
  isLoadMyInfoError: null, // 내 정보 가져오기 에러
  isLoadUserLoading: false, // 유저 정보 가져오는 중
  isLoadUserDone: false, // 유저 정보 가져오기 완료
  isLoadUserError: null, // 유저 정보 가져오기 에러
  isLoadFollowersLoading: false, // 팔로워 가져오는 중
  isLoadFollowersDone: false, // 팔로워 가져오기 완료
  isLoadFollowersError: null, // 팔로워 가져오기 에러
  isLoadFollowingsLoading: false, // 팔로잉 가져오는 중
  isLoadFollowingsDone: false, // 팔로잉 가져오기 완료
  isLoadFollowingsError: null, // 팔로잉 가져오기 에러
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
  isFollowLoading: false, // 팔로우 시도 중
  isFollowDone: false, // 팔로우 완료
  isFollowError: null, // 팔로우 에러
  isUnFollowLoading: false, // 언팔로우 시도 중
  isUnFollowDone: false, // 언팔로우 완료
  isUnFollowError: null, // 언팔로우 에러
  isRemoveFollowerLoading: false, // 언팔로우 시도 중
  isRemoveFollowerDone: false, // 언팔로우 완료
  isRemoveFollowerError: null, // 언팔로우 에러
  me: null,
  signUpData: {},
  LoginData: {},
};

export const LOAD_MY_INFO_REQUEST = 'LOAD_MY_INFO_REQUEST';
export const LOAD_MY_INFO_SUCCESS = 'LOAD_MY_INFO_SUCCESS';
export const LOAD_MY_INFO_FAILURE = 'LOAD_MY_INFO_FAILURE';

export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST';
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';
export const LOAD_USER_FAILURE = 'LOAD_USER_FAILURE';

export const LOAD_FOLLOWERS_REQUEST = 'LOAD_FOLLOWERS_REQUEST';
export const LOAD_FOLLOWERS_SUCCESS = 'LOAD_FOLLOWERS_SUCCESS';
export const LOAD_FOLLOWERS_FAILURE = 'LOAD_FOLLOWERS_FAILURE';

export const LOAD_FOLLOWINGS_REQUEST = 'LOAD_FOLLOWINGS_REQUEST';
export const LOAD_FOLLOWINGS_SUCCESS = 'LOAD_FOLLOWINGS_SUCCESS';
export const LOAD_FOLLOWINGS_FAILURE = 'LOAD_FOLLOWINGS_FAILURE';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const CHANGE_NICKNAME_REQUEST = 'CHANGE_NICKNAME_REQUEST';
export const CHANGE_NICKNAME_SUCCESS = 'CHANGE_NICKNAME_SUCCESS';
export const CHANGE_NICKNAME_FAILURE = 'CHANGE_NICKNAME_FAILURE';

export const FOLLOW_REQUEST = 'FOLLOW_REQUEST';
export const FOLLOW_SUCCESS = 'FOLLOW_SUCCESS';
export const FOLLOW_FAILURE = 'FOLLOW_FAILURE';

export const UNFOLLOW_REQUEST = 'UNFOLLOW_REQUEST';
export const UNFOLLOW_SUCCESS = 'UNFOLLOW_SUCCESS';
export const UNFOLLOW_FAILURE = 'UNFOLLOW_FAILURE';

export const REMOVE_FOLLOWER_REQUEST = 'REMOVE_FOLLOWER_REQUEST';
export const REMOVE_FOLLOWER_SUCCESS = 'REMOVE_FOLLOWER_SUCCESS';
export const REMOVE_FOLLOWER_FAILURE = 'REMOVE_FOLLOWER_FAILURE';

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
      case LOAD_USER_REQUEST:
        draft.isLoadUserLoading = true;
        draft.isLoadUserError = null;
        draft.isLoadUserDone = false;
        break;
      case LOAD_USER_SUCCESS:
        draft.isLoadUserLoading = false;
        draft.userInfo = action.data;
        draft.isLoadUserDone = true;
        break;
      case LOAD_USER_FAILURE:
        draft.isLoadUserLoading = false;
        draft.isLoadUserError = action.error;
        break;
      case LOAD_MY_INFO_REQUEST:
        draft.isLoadMyInfoLoading = true;
        draft.isLoadMyInfoDone = false;
        draft.isLoadMyInfoError = null;
        break;
      case LOAD_MY_INFO_SUCCESS:
        draft.isLoadMyInfoLoading = false;
        draft.me = action.data;
        draft.isLoadMyInfoDone = true;
        break;
      case LOAD_MY_INFO_FAILURE:
        draft.isLoadMyInfoLoading = false;
        draft.isLoadMyInfoError = action.error;
        break;
      case LOAD_FOLLOWERS_REQUEST:
        draft.isLoadFollowersLoading = true;
        draft.isLoadFollowersDone = false;
        draft.isLoadFollowersError = null;
        break;
      case LOAD_FOLLOWERS_SUCCESS: {
        draft.isLoadFollowersLoading = false;
        draft.me.Followers = action.data;
        draft.isLoadFollowersDone = true;
        break;
      }
      case LOAD_FOLLOWERS_FAILURE:
        draft.isLoadFollowersLoading = false;
        draft.isLoadFollowersError = action.error;
        break;
      case LOAD_FOLLOWINGS_REQUEST:
        draft.isLoadFollowingsLoading = true;
        draft.isLoadFollowingsDone = false;
        draft.isLoadFollowingsError = null;
        break;
      case LOAD_FOLLOWINGS_SUCCESS:
        draft.isLoadFollowingsLoading = false;
        draft.me.Followings = action.data;
        draft.isLoadFollowingsDone = true;
        break;
      case LOAD_FOLLOWINGS_FAILURE:
        draft.isLoadFollowingsLoading = false;
        draft.isLoadFollowingsError = action.error;
        break;
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
        draft.me = action.data;
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
        draft.me.nickname = action.data.nickname;
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
        draft.me.Posts = draft.me.Posts.filter(
          post => post.id !== +action.data,
        );
        break;
      case FOLLOW_REQUEST:
        draft.isFollowLoading = true;
        draft.isFollowDone = false;
        draft.isFollowError = null;
        break;
      case FOLLOW_SUCCESS:
        draft.isFollowLoading = false;
        draft.me.Followings.push({ id: +action.data.userId });
        draft.isFollowDone = true;
        break;
      case FOLLOW_FAILURE:
        draft.isFollowLoading = false;
        draft.isFollowError = action.error;
        break;
      case UNFOLLOW_REQUEST:
        draft.isUnFollowLoading = true;
        draft.isUnFollowDone = false;
        draft.isUnFollowError = null;
        break;
      case UNFOLLOW_SUCCESS:
        draft.isUnFollowLoading = false;
        draft.me.Followings = draft.me.Followings.filter(
          following => following.id !== +action.data.userId,
        );
        draft.isUnFollowDone = true;
        break;
      case UNFOLLOW_FAILURE:
        draft.isUnFollowLoading = false;
        draft.isUnFollowError = action.error;
        break;
      case REMOVE_FOLLOWER_REQUEST:
        draft.isRemoveFollowerLoading = true;
        draft.isRemoveFollowerDone = false;
        draft.isRemoveFollowerError = null;
        break;
      case REMOVE_FOLLOWER_SUCCESS:
        draft.isRemoveFollowerLoading = false;
        draft.me.Followers = draft.me.Followers.filter(
          follower => follower.id !== +action.data.userId,
        );
        draft.isRemoveFollowerDone = true;
        break;
      case REMOVE_FOLLOWER_FAILURE:
        draft.isUnFollowLoading = false;
        draft.isUnFollowError = action.error;
        break;
      default:
        break;
    }
  });

export default reducer;
