/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import UserList from './UserList';
import ArticleList from '../ArticleList';
import Carousel from '../Carousel';

import { colors } from '../../styles';
import APIS from '../../apis';
import { CAROUSEL } from '../../types/constants';
import Article from '../../types/Article';
import { useStore, observer} from '../../stores';

const tabs = [ 
  { id: 'article', display: '게시글' }, 
  { id: 'nickname', display: '닉네임' }, 
];

const SearchResults: React.FC<{search: string}> = ({search}) => {
  const { user } = useStore();
  const [tabIndex, setTabIndex] = React.useState(0);
  const [ articles, setArticles] = React.useState<Article[]>([]);
  const handleClickTab = React.useCallback((tab) => {
    const tabIndex = tabs.findIndex(({ id }) => id === tab.id);
    (window as any).__OWNER__[CAROUSEL.SEARCH](tabIndex);
    setTabIndex(tabs.findIndex(({ id }) => id === tab.id));
  }, [])

  React.useEffect(() => {
    const timer = setTimeout(async () => {
      const { data } = await APIS.article.search(search);
      if (data.ok) {
        setArticles(data.articles)
      }
    }, 500)
    return () => clearTimeout(timer);
  }, [search])

  return (
    <Wrapper>
      <Tabs>
        {tabs.map((tab, index) => (
          <Tab key={tab.id} className="tab" onClick={() => handleClickTab(tab)} selected={index === tabIndex}>
            {tab.display}
          </Tab>)
        )}
      </Tabs>
      <Carousel
        id={CAROUSEL.SEARCH}
        index={tabIndex}
        onChangeIndex={setTabIndex}
      >
        <ArticleList
          articles={articles}
          bookmarks={user.bookmarks}
        />
        <UserList/>
      </Carousel>
    </Wrapper>
  )
}

export default observer(SearchResults);

const Wrapper = styled.div`
  flex: 1;
`;

const Tabs = styled.ol`
  display: flex;
  align-items: center;
  height: 44px;
  padding: 0 18px;
  box-shadow: inset 0 -1px 0 0 ${colors.blackF5F6F7};
  .tab + .tab {
    margin: 0 0 0 18px;
  }
`;

const Tab = styled.li<{selected: boolean}>`
  flex: 1;
  line-height: 44px;
  font-size: 15px;
  font-weight: 400;
  text-align: center;
  color: ${p => p.selected ? colors.black33 : colors.blackBF};
  
  cursor: pointer;
  ${p => p.selected && css`
    box-shadow: inset 0 -1px 0 0 ${colors.black33};
  `}
`;