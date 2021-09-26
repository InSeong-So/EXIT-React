import shortId from 'shortid';
import faker from 'faker';
import produce from '../util/produce';

export const initialState = {
  mainPosts: [],
  hasMorePosts: true,
  imagePaths: [],
  isLoadPostLoading: false,
  isLoadPostDone: false,
  isLoadPostError: null,
  isAddPostLoading: false,
  isAddPostDone: false,
  isAddPostError: null,
  isAddCommentLoading: false,
  isAddCommentDone: false,
  isAddCommentError: null,
  isRemovePostLoading: false, // 게시글 삭제 시도 중
  isRemovePostDone: false, // 게시글 삭제 완료
  isRemovePostError: null, // 게시글 삭제 에러
  isLikePostLoading: false, // 게시글 좋아요 시도 중
  isLikePostDone: false, // 게시글 좋아요 완료
  isLikePostError: null, // 게시글 좋아요 에러
  isUnLikePostLoading: false, // 게시글 싫어요 시도 중
  isUnLikePostDone: false, // 게시글 싫어요 완료
  isUnLikePostError: null, // 게시글 싫어요 에러
};

export const generateDummyPost = number =>
  Array(number)
    .fill()
    .map(() => ({
      id: shortId.generate(),
      User: {
        id: shortId.generate(),
        nickname: faker.name.findName(),
      },
      content: faker.lorem.paragraph(),
      Images: [
        {
          src: faker.image.image(),
        },
      ],

      Comments: [
        {
          User: {
            id: shortId.generate(),
            nickname: faker.name.findName(),
          },
          content: faker.lorem.sentence(),
        },
      ],
    }));

export const LOAD_POST_REQUEST = 'LOAD_POST_REQUEST';
export const LOAD_POST_SUCCESS = 'LOAD_POST_SUCCESS';
export const LOAD_POST_FAILURE = 'LOAD_POST_FAILURE';

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export const LIKE_POST_REQUEST = 'LIKE_POST_REQUEST';
export const LIKE_POST_SUCCESS = 'LIKE_POST_SUCCESS';
export const LIKE_POST_FAILURE = 'LIKE_POST_FAILURE';

export const UNLIKE_POST_REQUEST = 'UNLIKE_POST_REQUEST';
export const UNLIKE_POST_SUCCESS = 'UNLIKE_POST_SUCCESS';
export const UNLIKE_POST_FAILURE = 'UNLIKE_POST_FAILURE';

const dummyPost = data => ({
  id: data.id,
  content: data.content,
  User: {
    id: 1,
    nickname: '파랑',
  },
  Images: [],
  Comments: [],
});

const dummyComment = data => ({
  id: shortId.generate(),
  content: data,
  User: {
    id: 1,
    nickname: '파랑',
  },
});

export const addPost = data => ({
  type: ADD_POST_REQUEST,
  data,
});

export const adComment = data => ({
  type: ADD_COMMENT_REQUEST,
  data,
});

const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_POST_REQUEST:
        draft.isLoadPostLoading = true;
        draft.isLoadPostDone = false;
        draft.isLoadPostError = null;
        break;
      case LOAD_POST_SUCCESS:
        draft.isLoadPostLoading = false;
        draft.isLoadPostDone = true;
        draft.mainPosts = action.data.concat(draft.mainPosts);
        draft.hasMorePosts = draft.mainPosts.length < 50;
        break;
      case LOAD_POST_FAILURE:
        draft.isLoadPostLoading = false;
        draft.isLoadPostError = action.error;
        break;
      case ADD_POST_REQUEST:
        draft.isAddPostLoading = true;
        draft.isAddPostDone = false;
        draft.isAddPostError = null;
        break;
      case ADD_POST_SUCCESS:
        draft.isAddPostLoading = false;
        draft.isAddPostDone = true;
        draft.mainPosts.unshift(action.data);
        break;
      case ADD_POST_FAILURE:
        draft.isAddPostLoading = false;
        draft.isAddPostError = action.error;
        break;
      case ADD_COMMENT_REQUEST:
        draft.isAddCommentLoading = true;
        draft.isAddCommentDone = false;
        draft.isAddCommentError = null;
        break;
      case ADD_COMMENT_SUCCESS: {
        const p = draft.mainPosts.find(post => post.id === +action.data.PostId);
        p.Comments.unshift(action.data);
        draft.isAddCommentLoading = false;
        draft.isAddCommentDone = true;
        break;
      }
      case ADD_COMMENT_FAILURE:
        draft.isAddCommentLoading = false;
        draft.isAddCommentError = action.error;
        break;
      case REMOVE_POST_REQUEST:
        draft.isRemovePostLoading = true;
        draft.isRemovePostDone = false;
        draft.isRemovePostError = null;
        break;
      case REMOVE_POST_SUCCESS:
        draft.mainPosts = draft.mainPosts.filter(
          post => post.id !== action.data,
        );
        draft.isRemovePostLoading = false;
        draft.isRemovePostDone = true;
        break;
      case REMOVE_POST_FAILURE:
        draft.isRemovePostLoading = false;
        draft.isRemovePostError = action.error;
        break;
      case LIKE_POST_REQUEST:
        draft.isLikePostLoading = true;
        draft.isLikePostDone = false;
        draft.isLikePostError = null;
        break;
      case LIKE_POST_SUCCESS:
        draft.mainPosts
          .find(post => post.id === action.data.postId)
          .Likers.push({ id: action.data.userId });
        draft.isLikePostLoading = false;
        draft.isLikePostDone = true;
        break;
      case LIKE_POST_FAILURE:
        draft.isLikePostLoading = false;
        draft.isLikePostError = action.error;
        break;
      case UNLIKE_POST_REQUEST:
        draft.isUnLikePostLoading = true;
        draft.isUnLikePostDone = false;
        draft.isUnLikePostError = null;
        break;
      case UNLIKE_POST_SUCCESS:
        {
          const posts = draft.mainPosts.find(
            post => post.id === action.data.postId,
          );
          posts.Likers = posts.Likers.filter(
            liker => liker.id !== action.data.userId,
          );
          draft.isUnLikePostLoading = false;
          draft.isUnLikePostDone = true;
        }
        break;
      case UNLIKE_POST_FAILURE:
        draft.isUnLikePostLoading = false;
        draft.isUnLikePostError = action.error;
        break;
      default:
        break;
    }
  });

export default reducer;
