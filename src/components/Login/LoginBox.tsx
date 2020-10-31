/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';

import KakaoLogin from './KakaoLogin';
import { SignUpUser } from '../../types/User';
import BottomSheet from '../BottomSheet';
import SignUp from '../SignUp';

const Box = styled.div`
  padding: 29px 42px;

  h2 {
    font-size: 24px;
    line-height: 1.33;
    letter-spacing: -0.5px;
    text-align: center;
  }

  ul {
    display: flex;
    justify-content: space-evenly;
    padding: 40px 0 30px;
    li {
      width: 60px;
      height: 60px;
      cursor: pointer;
      img {
        width: 100%;
        height: 100%;
        border-radius: 22.5px;
      }
    }
  }
`;

interface LoginBoxProps {
  onClose: () => void;
}

export default function LoginBox(props: LoginBoxProps): JSX.Element {
  const { onClose } = props;
  const bottomSheet = BottomSheet.useBottomSheet();
  const handleClickKakao = React.useCallback((user: SignUpUser) => {
    onClose();
    setTimeout(() => {
      bottomSheet.open({
        title: ' 회원가입',
        headerType: 'close',
        isFull: true,
        contents: <SignUp {...user}/>,
      });
    }, 300);
  }, [bottomSheet, onClose])

  return (
    <Box>
      <h2>간편하게 로그인하고 <br/> 오너들과 이야기를 나눠보세요.</h2>
      <ul>
        <li>
          <KakaoLogin 
            onLoginKakao={handleClickKakao}
          />
        </li>
        <li>
          <img src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1566815760/noticon/s1118wnuadritgbmm9by.png"/>
        </li>
      </ul>
    </Box>
  );
}