/* eslint-disable @typescript-eslint/camelcase */
/** @jsx jsx */
import { jsx } from '@emotion/core';

import React from 'react';
import ReactKakaoLogin from 'react-kakao-login';
import APIS from '../../apis';

import KakaoLoginIcon from './login-kakao.svg';
import { SignUpUser, Profile } from '../../types/User';

interface KakaoLoginProps {
  onSignUp: (user: SignUpUser) => void;
  onSetUserProfile: (userProfile: Profile) => void;
}

export default function KakaoLogin(props: KakaoLoginProps): JSX.Element {
  const { onSignUp, onSetUserProfile } = props;
  const handleLogin = React.useCallback(
    async (result) => {
      const {
        id,
        kakao_account: {
          email,
          profile: { nickname, profile_image_url, thumbnail_image_url },
        },
      } = result.profile;
      try {
        const {
          data: { data },
        } = await APIS.auth.check(id, 'kakao');
        if (data) {
          onSetUserProfile(data);
          return;
        }
      } catch (error) {
        return;
      }

      const user: SignUpUser = {
        email,
        snsId: id.toString(),
        name: nickname,
        thumbnail: thumbnail_image_url,
        profileImage: profile_image_url,
        provider: 'kakao',
      };
      onSignUp(user);
    },
    [onSetUserProfile, onSignUp],
  );
  return (
    <ReactKakaoLogin
      token={process.env.REACT_APP_KAKAO_LOGIN_KEY || ''}
      onSuccess={(result) => handleLogin(result)}
      onFail={(result: any) => console.log(result)}
      render={(props: any) => (
        <img src={KakaoLoginIcon} onClick={props.onClick} />
      )}
    />
  );
}
