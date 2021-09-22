export const initialState = {
  mainPosts: [
    {
      id: 1,
      User: {
        id: 1,
        nickname: '파랑',
      },
      content: '첫 게시글 #해시태그 #익스프레스',
      Images: [
        {
          src: 'https://source.unsplash.com/random/800x600',
        },
        {
          src: 'https://source.unsplash.com/user/erondu/800x600',
        },
        {
          src: 'https://source.unsplash.com/weekly?water/800x600',
        },
      ],
      Comments: [
        {
          User: {
            nickname: '테스터',
          },
          content: '안녕하세요.',
        },
        {
          User: {
            nickname: '테스터123',
          },
          content: '안녕하세요.123',
        },
        {
          User: {
            nickname: '취직준비생',
          },
          content: '감사합니다!',
        },
      ],
    },
  ],
  imagePaths: [],
  isAddPostLoading: false,
  isAddPostDone: false,
  isAddPostError: null,
  isAddCommentLoading: false,
  isAddCommentDone: false,
  isAddCommentError: null,
};

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

const dummyPost = {
  id: 2,
  content: '더미데이터1',
  User: {
    id: 1,
    nickname: '파랑',
  },
  Images: [],
  Comments: [],
};

export const addPost = data => ({
  type: ADD_POST_REQUEST,
  data,
});

export const adComment = data => ({
  type: ADD_COMMENT_REQUEST,
  data,
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST_REQUEST:
      return {
        ...state,
        isAddPostLoading: true,
        isAddPostDone: false,
        isAddPostError: null,
      };
    case ADD_POST_SUCCESS:
      return {
        ...state,
        isAddPostLoading: false,
        mainPosts: [dummyPost, ...state.mainPosts],
        isAddPostDone: true,
      };
    case ADD_POST_FAILURE:
      return {
        ...state,
        isAddPostLoading: false,
        isAddPostError: action.error,
      };
    case ADD_COMMENT_REQUEST:
      return {
        ...state,
        isAddCommentLoading: true,
        isAddCommentDone: false,
        isAddCommentError: null,
      };
    case ADD_COMMENT_SUCCESS:
      return {
        ...state,
        isAddCommentLoading: false,
        isAddCommentDone: true,
      };
    case ADD_COMMENT_FAILURE:
      return {
        ...state,
        isAddCommentLoading: false,
        isAddCommentError: action.error,
      };
    default:
      return state;
  }
};

export default reducer;
