/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';

import { colors } from '../../styles';
import Profile from '../Profile';
import { useModal } from '../Modal';

import { getDateGoodLook } from '../../modules/string';
import { useArticleContext, observer } from './context';

const ArticleHead = () => {
  const { article } = useArticleContext();
  const { thumbnail, id, name, group, code } = article!.author;
  const modal = useModal();

  const handleOpenProfile = Profile.useOpenProfile();

  return (
    <Head>
      <ProfilePhoto src={thumbnail} onClick={() => handleOpenProfile(code)} />
      <Profile.WhoDot name={name} group={group} />
      <p className="article-time">{getDateGoodLook(article!.createAt)}</p>
    </Head>
  );
};
export default observer(ArticleHead);

const Head = styled.div`
  display: flex;
  align-items: center;
  height: 60px;
  padding: 0 18px;

  .article-time {
    flex: 1;
    text-align: right;
    font-size: 13px;
    font-weight: 400;
    color: ${colors.blackAA};
  }
`;

const ProfilePhoto = styled(Profile.Photo)`
  margin-right: 8px;
`;

