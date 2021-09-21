import React, { useState, useCallback } from 'react';
import { Form, Input, Button } from 'antd';
import Link from 'next/link';
import styled from 'styled-components';
import useInput from '../hooks/useInput';
import PropTypes from 'prop-types';

const ButtonWrapper = styled.div`
  margin-top: 10px;
`
// 스타일링에 객체를 사용하지 말고 리렌더링에 대한 캐싱 처리
// const style = useMemo(() => ({marginTop:10}), []);

const FormWrapper = styled(Form)`
  padding: 10px;
`

const LoginForm = ({setIsLoggedIn}) => {

  const [id, onChangeId] = useInput('');
  const [password, onChangePassword] = useInput('');
  const onSubmitForm = useCallback(() => {
    console.log(id, password);
    setIsLoggedIn(true);
  }, [id, password]);

  return (
    <FormWrapper onFinish={onSubmitForm}>
      <div>
        <label htmlFor="user-id">아이디</label>
        <br />
        <Input name="user-id" value={id} onChange={onChangeId} required />
      </div>
      <div>
        <label htmlFor="user-password">비밀번호</label>
        <br />
        <Input name="user-password" value={password} onChange={onChangePassword} required />
      </div>
      <ButtonWrapper>
        <Button type="primary" htmlType="submit" loading={false}>로그인</Button>
        <Link href="/signup"><a><Button>회원가입</Button></a></Link>
      </ButtonWrapper>
    </FormWrapper>
  )
}

LoginForm.prototype = {
  setIsLoggedIn: PropTypes.func.isRequired
}

export default LoginForm