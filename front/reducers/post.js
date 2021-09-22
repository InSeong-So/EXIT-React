export const initialState = {
  mainPosts: [{
    id: 1,
    User: {
      id: 1,
      nickname: '파랑',
    },
    content: '첫 게시글 #해시태그 #익스프레스',
    Images: [
      {
        src: 'https://source.unsplash.com/random/800x600'
      },
      {
        src: 'https://source.unsplash.com/user/erondu/800x600'
      },
      {
        src: 'https://source.unsplash.com/weekly?water/800x600'
      },
    ],
    Comments: [
      {
        User: {
          nickname: '테스터'
        },
        content: '안녕하세요.'
      },
      {
        User: {
          nickname: '테스터123'
        },
        content: '안녕하세요.123'
      },
      {
        User: {
          nickname: '취직준비생'
        },
        content: '감사합니다!'
      },
    ]
  }],
  imagePaths: [],
  postAdded: false,
}

export const ADD_POST = 'ADD_POST';

const dummyPost = {
  id: 2,
  content: '더미데이터1',
  User: {
    id: 1,
    nickname: '파랑',
  },
  Images: [],
  Comments: [],
}

export const addPost = {
  type: ADD_POST
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        postAdded: true
      }
    default:
      return state
  }
}

export default reducer