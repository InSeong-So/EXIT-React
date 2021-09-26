import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Avatar, Button } from 'antd';
import Link from 'next/link';

import END from 'redux-saga';
import { LOAD_MY_INFO_REQUEST, LogoutRequestAction } from '../reducers/user';
import { LOAD_POSTS_REQUEST } from '../reducers/post';
import wrapper from '../store/configureStore';

const About = () => {
  const dispatch = useDispatch();
  const { me, isLogoutLoading } = useSelector(state => state.user);

  const onLogOut = useCallback(() => {
    dispatch(LogoutRequestAction());
  }, []);

  return (
    <Card
      actions={[
        <div key="twit">
          <Link href={`/user/${me.id}`}>
            <a>
              짹짹
              <br />
              {me.Posts.length}
            </a>
          </Link>
        </div>,
        <div key="followings">
          <Link href="/profile">
            <a>
              팔로잉
              <br />
              {me.Followings.length}
            </a>
          </Link>
        </div>,
        <div key="followings">
          <Link href="/profile">
            <a>
              팔로워
              <br />
              {me.Followers.length}
            </a>
          </Link>
        </div>,
      ]}
    >
      <Card.Meta
        avatar={
          <Link href={`/user/${me.id}`} prefetch={false}>
            <a>
              <Avatar>{me.nickname[0]}</Avatar>
            </a>
          </Link>
        }
        title={me.nickname}
      />
      <Button onClick={onLogOut} loading={isLogoutLoading}>
        로그아웃
      </Button>
    </Card>
  );
};

export const getStaticProps = wrapper.getStaticProps(
  context =>
    async ({ req }) => {
      context.dispatch({
        type: LOAD_MY_INFO_REQUEST,
      });

      context.dispatch({
        type: LOAD_POSTS_REQUEST,
      });

      context.dispatch(END);
      await context.sagaTask.toPromise();
    },
);

export default About;
