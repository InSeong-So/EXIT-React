import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { END } from 'redux-saga';
import axios from 'axios';
import AppLayout from '../components/AppLayout';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { LOAD_POSTS_REQUEST } from '../reducers/post';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import wrapper from '../store/configureStore';

const Home = () => {
  const dispatch = useDispatch();
  const { me } = useSelector(state => state.user);
  const { mainPosts, hasMorePosts, isLoadPostsLoading, isRetweetError } =
    useSelector(state => state.post);

  useEffect(() => {
    if (isRetweetError) {
      alert(isRetweetError);
    }
  }, [isRetweetError]);

  useEffect(() => {
    const onScroll = () => {
      if (
        window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        if (hasMorePosts && !isLoadPostsLoading) {
          const lastId = mainPosts[mainPosts.length - 1]?.id;
          dispatch({
            type: LOAD_POSTS_REQUEST,
            lastId,
          });
        }
      }
    };

    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [hasMorePosts, isLoadPostsLoading, mainPosts]);

  return (
    <AppLayout>
      {me && <PostForm />}
      {mainPosts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  context =>
    async ({ req }) => {
      const cookie = req ? req.headers.cookie : '';
      axios.defaults.headers.Cookie = '';
      if (context.req && cookie) {
        axios.defaults.headers.Cookie = cookie;
      }
      context.dispatch({
        type: LOAD_MY_INFO_REQUEST,
      });

      context.dispatch({
        type: LOAD_POSTS_REQUEST,
      });

      // REQUEST 가 saga 에서 SUCCESS 될 때까지 기다려준다
      context.dispatch(END);
      await context.sagaTask.toPromise();
    },
);

export default Home;
