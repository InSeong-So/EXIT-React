import Head from 'next/head';
import AppLayout from "../components/AppLayout";
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from "../components/FollowList";

const Profile = () => {

  const followingList = [
    { nickname: '현파랑' },
    { nickname: 'isso' },
    { nickname: '파랑 채팅' },
  ];

  const followerList = [
    { nickname: '현파랑' },
    { nickname: 'isso' },
    { nickname: '파랑 채팅' },
  ];

  return (
    <>
      <Head>
        <title>내 프로필 | ParangChat</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowList header='팔로잉 목록' data={followingList} />
        <FollowList header='팔로워 목록' data={followerList} />
      </AppLayout>
    </>
  )
};

export default Profile;