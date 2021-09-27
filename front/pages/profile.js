import Head from 'next/head';
import { useSelector } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
import Router from 'next/router';
import axios from 'axios';
import useSWR from 'swr';
import { END } from 'redux-saga';
import AppLayout from '../components/AppLayout';
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import wrapper from '../store/configureStore';

const fetcher = url =>
  axios.get(url, { withCredentials: true }).then(result => result.data);

const Profile = () => {
  const [followersLimit, setFollowersLimit] = useState(3);
  const [followingsLimit, setFollowingsLimit] = useState(3);

  const { me } = useSelector(state => state.user);
  const { data: followingsData, error: followingError } = useSWR(
    `http://localhost:3001/user/followers?limit=${followersLimit}`,
    fetcher,
  );
  const { data: followersData, error: followerError } = useSWR(
    `http://localhost:3001/user/followings?limit=${followingsLimit}`,
    fetcher,
  );

  useEffect(() => {
    if (!(me && me.id)) {
      Router.replace('/');
    }
  }, [me && me.id]);

  const loadMoreFollowers = useCallback(() => {
    setFollowersLimit(prev => prev + 3);
  }, []);

  const loadMoreFollowings = useCallback(() => {
    setFollowingsLimit(prev => prev + 3);
  }, []);

  if (!me) {
    return null;
  }

  if (followingError || followerError) {
    console.error(followingError || followerError);
    return <div>팔로잉/팔로워 로딩 중 에러가 발생했습니다.</div>;
  }

  return (
    <>
      <Head>
        <title>내 프로필 | ParangChat</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowList
          header="팔로잉"
          data={followingsData || []}
          onClickMore={loadMoreFollowings}
          loading={!followingsData && !followingError}
        />
        <FollowList
          header="팔로워"
          data={followersData || []}
          onClickMore={loadMoreFollowers}
          loading={!followersData && !followerError}
        />
      </AppLayout>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  store =>
    async ({ req }) => {
      // console.log(req.headers);
      const cookie = req ? req.headers.cookie : '';
      axios.defaults.headers.Cookie = '';
      if (req && cookie) {
        axios.defaults.headers.Cookie = cookie;
      }
      store.dispatch({
        type: LOAD_MY_INFO_REQUEST,
      });
      store.dispatch(END);
      await store.sagaTask.toPromise();
    },
);

export default Profile;
