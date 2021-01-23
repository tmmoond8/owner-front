/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import { useLocation } from 'react-router-dom';

import Page from './BasePage';
import Icon, { IconKey } from '../components/Icon';
import HR from '../components/HR';
import MenuBar from '../components/MenuBar';
import { useStore, observer } from '../stores';

import Profile from '../components/Profile';
import { colors } from '../styles';
import ActivationsContainer from '../components/Profile/ActivationsContainer';

const menus = [
  { menu: '게시글', key: 'article', icon: 'article' },
  { menu: '댓글', key: 'comment', icon: 'chatOutline' },
  { menu: '북마크', key: 'bookmark', icon: 'bookmark' },
];

const Mobile = () => {
  const { user } = useStore();
  const { profileImage, name, group, description } = user.profile;
  const { handleModifyProfile, handleOpenUserActivations } = useProfileHandler();
  
  return (
    <React.Fragment>
      <Profile.Header />
      <Body>
        <Profile.Profile
          name={name}
          group={group}
          profileImage={profileImage}
          description={description}
        />
        <Profile.ProfileModifyButton onClick={handleModifyProfile}>
          프로필 수정
        </Profile.ProfileModifyButton>
        <HR height={1} color={colors.blackF5F6F7} marginTop={26} />
        <Profile.UserHistoryMenus>
          {menus.map(({ menu, icon, key }) => (
            <Profile.UserHistoryMenu key={key} onClick={() => handleOpenUserActivations(key)}>
              <Icon icon={icon as IconKey} size="36px" />
              <span>{menu}</span>
            </Profile.UserHistoryMenu>
          ))}
        </Profile.UserHistoryMenus>
        <HR height={1} color={colors.blackF5F6F7} />
        <Profile.AppMenus>
          <li>
            공지사항
            <Icon icon="arrowRight" size="16px" />
          </li>
          <li>
            자주 묻는 질문
            <Icon icon="arrowRight" size="16px" />
          </li>
          <li>
            앱 설정
            <Icon icon="arrowRight" size="16px" />
          </li>
        </Profile.AppMenus>
      </Body>
      <StyledMenuBar />
    </React.Fragment>
  );
}

const Tablet = () => {
  const { user } = useStore();
  const location = useLocation();
  const { profileImage, name, group, description, code } = user.profile;
  const { handleModifyProfile } = useProfileHandler();
 
  return (
    <TabletWrapper className="MyProfileWrapper">
      <Profile.Header />
      <Body className="MyProfileBody">
        <Profile.Profile
          name={name}
          group={group}
          profileImage={profileImage}
          description={description}
        />
        <Profile.ProfileModifyButton onClick={handleModifyProfile}>
          프로필 수정
        </Profile.ProfileModifyButton>
      </Body>
      <Activations userCode={user.profile.code} tab={'comment'}/>
    </TabletWrapper>
  );
}

export default observer(() => {
  const { ui } = useStore();

  return (
    <StyledPage>
      {ui.queryMatch.Mobile && <Mobile />}
      {(ui.queryMatch.Tablet || ui.queryMatch.Desktop) && <Tablet />}
    </StyledPage>
  )
});

const StyledPage = styled(Page)`
  display: flex;
  flex-direction: column;
`;

const Body = styled.div`
  flex: 1;
  padding: 0 18px 20px;
  overflow-y: scroll;
  background-color: ${colors.white};
`;

const StyledMenuBar = styled(MenuBar)`
  position: static;
`;

const TabletWrapper = styled.div`
  overflow-y: scroll;

  .TabletBody {
    overflow-y: visible;
  }

  .eg-flick-camera > * {
    overflow-y: visible;
    .ArticleCard, .Comment {
      margin-top: 1px;
      box-shadow: 0 -1px #f5f6f7;
    }
  }
`;

const Activations = styled(ActivationsContainer)`
  margin: 16px 0 0 0;
  .Tabs {
    height: 56px;
    .TabItem {
      flex: none;
      line-height: 56px;
      padding: 0 6px;
    }
    .TabItem + .TabItem {
      margin-left: 20px;
    }
  }
`;

const useProfileHandler = () => {
  const { util } = useStore();

  const handleModifyProfile = React.useCallback(() => {
    util.history.push('/myProfile/edit')
  }, []);

  const handleOpenUserActivations = React.useCallback((menu) => {
    util.history.push('/myActivations', { menu })
  }, [util]);

  return {
    handleModifyProfile,
    handleOpenUserActivations,
  }
}