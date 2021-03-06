/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';

import ArticleHead from './ArticleHead';
import ArticleHeader from './ArticleHeader';
import ArticleBody from './ArticleBody';
import ArticleFooter from './ArticleFooter';
import ArticleEmpty from './ArticleEmpty';

import IArticle from '../../types/Article';
import { colors } from '../../styles';
import ArticleContext from './context';

import { useFetch as useFetchEmotion } from '../Emotion/hooks';
export { useOpenArticleEditor, useMoreMenu, useFetch } from './hooks';

const Article: React.FC<{
  article: IArticle;
  commentCount: number;
}> & { Empty: React.FC; } = ({ article, commentCount }) => {
  const { emotionCounts, setEmotionCounts } = useFetchEmotion(article.id);

  return (
    <ArticleContext.Provider
      value={{
        article,
        commentCount,
        emotionCounts,
      }}
    >
      {article && (
        <React.Fragment>
          <ArticleHeader />
          <ArticleHead />
          <ArticleBody />
          <ArticleFooter />
          <HR />
        </React.Fragment>
      )}
    </ArticleContext.Provider>
  );
};

Article.Empty = ArticleEmpty;
export default Article;

const HR = styled.hr`
  margin: 0;
  border: 0;
  height: 12px;
  background-color: ${colors.blackF5F6F7};
`;
