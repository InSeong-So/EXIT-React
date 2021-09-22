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

export const FOLLOW_REQUEST = 'FOLLOW_REQUEST';
export const FOLLOW_SUCCESS = 'FOLLOW_SUCCESS';
export const FOLLOW_FAILURE = 'FOLLOW_FAILURE';

export const UNFOLLOW_REQUEST = 'UNFOLLOW_REQUEST';
export const UNFOLLOW_SUCCESS = 'UNFOLLOW_SUCCESS';
export const UNFOLLOW_FAILURE = 'UNFOLLOW_FAILURE';

const dummyUser = data => ({
	...data,
	nickname: '파랑',
	id: 1,
	Posts: [],
	Followings: [],
	Followers: [],
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

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case SIGN_UP_REQUEST:
			return {
				...state,
				isSignupLoading: true,
				isSignupDone: false,
				isSignupError: null,
			};
		case SIGN_UP_SUCCESS:
			return {
				...state,
				isSignupLoading: false,
				isSignupDone: true,
			};
		case SIGN_UP_FAILURE:
			return {
				...state,
				isSignupLoading: false,
				isSignupError: action.error,
			};
		case LOG_IN_REQUEST:
			return {
				...state,
				isLoginLoading: true,
				isLoginDone: false,
				isLoginError: null,
			};
		case LOG_IN_SUCCESS:
			return {
				...state,
				isLoginLoading: false,
				isLoginDone: true,
				isLogin: true,
				me: dummyUser(action.data),
			};
		case LOG_IN_FAILURE:
			return {
				...state,
				isLoginLoading: false,
				isLoginError: action.error,
			};
		case LOG_OUT_REQUEST:
			return {
				...state,
				isLogoutLoading: true,
				isLogoutDone: false,
				isLogoutError: null,
			};
		case LOG_OUT_SUCCESS:
			return {
				...state,
				isLogoutLoading: false,
				isLogoutDone: true,
				isLogin: false,
				me: null,
			};
		case LOG_OUT_FAILURE:
			return {
				...state,
				isLogoutLoading: false,
				isLogoutError: action.error,
			};
		default:
			return state;
	}
};

export default reducer;
