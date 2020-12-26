/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';

import { toast } from 'react-toastify';
import { colors } from '../../styles';
import Icon from '../Icon';
import Content from '../Content';
import Emotion from '../Emotion';
import { useBottomSheet } from '../BottomSheet';
import { useStore } from '../../stores';
import { useArticleContext, observer } from './context';
import { EmotionType } from '../../types/Emotion';

const ArticleFooter = () => {
  const {
    article,
    viewCount,
    commentCount,
    emotionCounts,
  } = useArticleContext();
  const { user } = useStore();
  const bottomSheet = useBottomSheet();

  const [emotionCount, setEmotionCount] = React.useState(
    article?.emotionCount ?? 0,
  );

  const handleClickEmotion = React.useCallback(() => {
    bottomSheet.open({
      title: `공감 ${emotionCount}`,
      contents: (
        <Emotion.Box
          articleId={article!.id}
          myEmotion={user.emotions[article!.id]}
          handleClose={() => bottomSheet.close()}
          setEmotionCount={setEmotionCount}
          handleEmotionUpdate={(emotionType: EmotionType) =>
            user.setEmotion(article!.id, emotionType)
          }
        />
      ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [article, bottomSheet, emotionCount]);

  const handleClickComment = React.useCallback(() => {
    // selector로 가져오는 것이 항상 나쁠까?
    const commentEditor = document.querySelector<HTMLDivElement>(
      '.CommentEditor',
    );
    if (commentEditor) {
      commentEditor.focus();
    }
  }, []);

  return (
    <React.Fragment>
      <InteractionCounter>
        <ul>
          <li>{`조회 ${viewCount}회`}</li>
          <li>{`댓글 ${commentCount}`}</li>
          <li>{`공감 ${emotionCount}`}</li>
        </ul>
        <Emotion.Band emotionCounts={emotionCounts} />
      </InteractionCounter>
      <Content.HR size={1} color="" />
      <InteractionPanel>
        <li onClick={handleClickEmotion}>
          <Icon icon="emojiSmileOutline" size="20px" /> 공감표현
        </li>
        <li onClick={handleClickComment}>
          <Icon icon="chatOutline" size="20px" /> 댓글쓰기
        </li>
        <li
          onClick={() => {
            toast(
              "'시작과끝' 활동 알림을 켭니다. 새 글을 작성하면 알림을 보내드려요",
            );
          }}
        >
          <Icon icon="share" size="20px" /> 공유하기
        </li>
      </InteractionPanel>
    </React.Fragment>
  );
};

export default observer(ArticleFooter);

const InteractionCounter = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  height: 48px;
  ul {
    display: flex;
    flex: 1;
    padding: 0 18px;
    color: ${colors.black99};
    font-size: 13px;

    li + li {
      position: relative;
      margin-left: 12px;
      &::before {
        content: '·';
        position: absolute;
        left: -10px;
        top: 0;
        font-weight: 600;
      }
    }
  }
`;
const InteractionPanel = styled.ul`
  display: flex;
  justify-content: space-between;
  height: 54px;
  width: 100%;
  max-width: 307px;
  margin: 0 auto;
  color: ${colors.black66};

  font-size: 14px;
  li {
    display: flex;
    align-items: center;
    cursor: pointer;

    svg {
      margin-right: 6px;
    }
  }
`;
