/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';

import BottomSheet from '../BottomSheet';
import { colors } from '../../styles';
import Icon from '../Icon';

import EmotionBox from './EmotionBox';
import Button from '../Button';
import { useStore, observer } from '../../stores';

const EmotionCounter: React.FC<{
  articleId: number;
  emotionCount: number;
}> = ({ articleId, emotionCount: _emotionCount }) => {
  const { user } = useStore();
  const [emotionCount, setEmotionCount] = React.useState(_emotionCount);
  const bottomSheet = BottomSheet.useBottomSheet();

  const handleClickEmotion = () => {
    bottomSheet.open({
      title: `공감 ${emotionCount}`,
      contents: (
        <EmotionBox
          articleId={articleId}
          handleClose={() => bottomSheet.close()}
          setEmotionCount={setEmotionCount}
          needLogin={user.needLogin}
        />
      ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };
  const color = undefined;
  // const color = React.useMemo(
  //   () => (yourEmotion ? colors.primary : undefined),
  //   [yourEmotion],
  // );
  return (
    <EmotionCounterButton
      icon={<Icon icon="emojiSmile" size="18px" color={color} />}
      onClick={handleClickEmotion}
    >
      <Counter className="Counter" color={color}>
        {emotionCount}
      </Counter>
    </EmotionCounterButton>
  );
};

export default observer(EmotionCounter);

const EmotionCounterButton = styled(Button)`
  && {
    border-radius: 4px;
    border: solid 1px #ebebeb;
    cursor: pointer;
    svg {
      cursor: pointer;
    }
  }
`;

const Counter = styled.span<{ color?: string }>`
  &.Counter {
    margin-left: 0;
    ${(p) => p.color && `color: ${p.color};`}
  }
`;
