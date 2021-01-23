/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';

import Page from './BasePage';
import Icon, { IconKey } from '../components/Icon';
import HR from '../components/HR';
import MenuBar from '../components/MenuBar';
import { useStore, observer } from '../stores';

import Profile from '../components/Profile';
import { CAROUSEL } from '../types/constants';
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
  const [contentHeight, setContentHeight ] = React.useState('0px');
  const { profileImage, name, group, description, code } = user.profile;
  const { handleModifyProfile } = useProfileHandler();
  const handleChangeActication = React.useCallback((index: number) => {
    const cameraElement = document.querySelector(`#${CAROUSEL.PROFILE} .eg-flick-camera`);
    if (cameraElement) {
      if (cameraElement && cameraElement.childNodes && cameraElement.childNodes.length > index) {
        const childHeight = (cameraElement.childNodes[index] as any).scrollHeight;
        setContentHeight(`${childHeight}px`);
      }
    }
  }, []);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      handleChangeActication(0);
    }, 500);
    return () => clearTimeout(timer);
  }, [])
 
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
      <Activations 
        userCode={user.profile.code} 
        tab={'article'} 
        onChange={handleChangeActication}
        height={contentHeight}
      />
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

const Activations = styled(ActivationsContainer)<{height: string}>`
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
  
  #${CAROUSEL.PROFILE} {
    overflow: auto;
    height: auto;
    > div {
      height: auto; 
      .eg-flick-panel {
        height: auto;
      }
    }
    .eg-flick-camera, .eg-flick-viewport {
      height: ${p => p.height} !important;
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