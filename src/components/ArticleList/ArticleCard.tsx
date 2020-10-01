/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';

import Article from '../../types/Article';
import Profile from '../Profile';
import { Profile as IProfile } from '../../types/User';
import Button from '../Button';
import Icon from '../Icon';

import { colors } from '../../styles';

type ArticleCardProps = Article;

export default function ArticleCard(props: ArticleCardProps): JSX.Element {
  const { title, content, author, createAt } = props;
  const { thumbnail, name, group } = author as IProfile;
  const handleClickLike = React.useCallback(() => {
    console.log(title);
  }, [title]);
  const handleClickComment = React.useCallback(() => {
    console.log(title);
  }, [title]);
  const handleClickBookmark = React.useCallback(() => {
    console.log(title);
  }, [title]);

  return (
    <Card>
      <Head>
        <ProfilePhoto src={thumbnail} size={24} />
        <Profile.Who name={name} group={group} />
        <p className="article-time">
          {new Date(createAt).toLocaleDateString()}
        </p>
      </Head>
      <Body>
        <p className="article-title">{title}</p>
        <p className="article-content">{content}</p>
      </Body>
      <Bottom>
        <Button
          icon={<Icon icon="like" size="18px" />}
          onClick={handleClickLike}
        >
          공감하기
        </Button>
        <Button
          icon={<Icon icon="chat" size="18px" />}
          onClick={handleClickComment}
        >
          댓글달기
        </Button>
        <div className="right">
          <Button
            onClick={handleClickBookmark}
            icon={<Icon icon="bookmark" size="18px" />}
          />
        </div>
      </Bottom>
    </Card>
  );
}

const Card = styled.li`
  padding: 16px 18px;
  background-color: ${colors.white};
`;

const Head = styled.div`
  display: flex;
  align-items: center;
  height: 24px;

  .article-time {
    flex: 1;
    text-align: right;
    font-size: 13px;
    color: ${colors.black99};
  }
`;

const ProfilePhoto = styled(Profile.Photo)`
  margin-right: 8px;
`;

const Body = styled.div`
  padding: 16px 0;

  .article-title {
    font-size: 17px;
    line-height: 24px;
    color: ${colors.black100};
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .article-content {
    margin-top: 8px;
    font-size: 14px;
    line-height: 20px;
    color: ${colors.black99};
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
`;

const Bottom = styled.div`
  display: flex;
  height: 32px;
  * + * {
    margin-left: 8px;
  }
  margin-top: 4px;
  .right {
    display: flex;
    flex-direction: row-reverse;
    flex: 1;
  }
`;
