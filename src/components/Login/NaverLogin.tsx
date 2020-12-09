/* eslint-disable @typescript-eslint/camelcase */
/** @jsx jsx */
import { jsx } from '@emotion/core';
import dotenv from 'dotenv';
import React from 'react';
import ReactNaverLogin from 'react-naver-login';

import APIS from '../../apis';
import NaverLoginIcon from './login-naver.svg';
import { SignUpUser, Profile } from '../../types/User';

dotenv.config();

interface NaverLoginProps {
  onSignUp: (user: SignUpUser) => void;
  onSetUserProfile: (userProfile: Profile) => void;
}

interface NaverProfile {
  age: string;
  birthday: string;
  email: string;
  gender: string;
  id: string;
  name: string;
  nickname: string;
  profile_image: string;
}

export default function NaverLogin(props: NaverLoginProps): JSX.Element {
  const { onSignUp, onSetUserProfile } = props;
  const handleLogin = React.useCallback(
    async (result: NaverProfile) => {
      const { id, email, nickname, profile_image } = result;
      try {
        const {
          data: { data },
        } = await APIS.auth.check(id, 'naver');
        if (data) {
          onSetUserProfile(data);
          return;
        }
      } catch (error) {
        return;
      }

      const user: SignUpUser = {
        email,
        snsId: id,
        name: nickname,
        thumbnail: profile_image,
        profileImage: profile_image,
        provider: 'naver',
      };
      onSignUp(user);
    },
    [onSetUserProfile, onSignUp],
  );
  return (
    <ReactNaverLogin
      clientId={process.env.REACT_APP_NAVER_CLIENT_ID || ''}
      callbackUrl={process.env.REACT_APP_NAVER_LOGIN_CALLBACK_URL || ''}
      render={(props) => (
        <img src={NaverLoginIcon} onClick={() => props.onClick()} />
      )}
      onSuccess={(result) => {
        handleLogin(result);
      }}
      onFailure={(err: unknown) => console.error(err)}
    />
  );
}