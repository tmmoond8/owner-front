/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import { colors } from '../styles';
import { useRouteMatch } from 'react-router';
import React from 'react';
import APIS from '../apis';
import "react-notion/src/styles.css";
import { NotionRenderer } from "react-notion";
import BackHeader from '../components/Header/BackHeader';
import Page from './BasePage';
import { useStore, observer } from '../stores';


const NotionEmbedPage: React.FC<{ pageId?: string; title?: string }> = ({ pageId, title }) => {
  const { ui } = useStore();
  const { params } = useRouteMatch<{id: string | undefined}>();
  const [notice, setNotice] = React.useState<any>(null);
  const HeaderOption = { title }
  const notionRenderRef = React.useRef<HTMLElement>();
  React.useEffect(() => {
    (async () => {
      const { data } = await APIS.notion.getPage(params.id ?? pageId ?? '7c13bd34a78d4c41b5b1956e19e272b4');
      setNotice(data);
    })();
  }, [])

  return (
    <StyledPage>
      {ui.queryMatch.Mobile && <BackHeader options={HeaderOption} />}
      {notice && (
        <NotionRenderer mapPageUrl={url => `/notice/${url}`} blockMap={notice}/>
      )}
    </StyledPage>
  );
};

export default observer(NotionEmbedPage);

const StyledPage = styled(Page)`
  display: flex;
  flex-direction: column;
  .notion {
    flex: 1;
    padding: 16px 18px;
    overflow-y: scroll;
    background-color: ${colors.white};
  }
`;