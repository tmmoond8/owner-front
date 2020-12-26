import React from 'react';
import ContextMenuViewer, { ContextMenuData } from '../ContextMenu';
import BottomSheetViewer, {
  BottomSheetData,
  useBottomSheet,
} from '../BottomSheet';
import { useStore, observer } from '../../stores';
import global from '../../types/global';
import { Profile as UserProfile } from '../../types/User';
import { useCheckLogin } from '../../hooks';
import UiStore from '../../stores/uiStore';

const UiProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { ui, user } = useStore();
  const bottomSheet = useBottomSheet();
  const needLogin = useCheckLogin(
    (profile: UserProfile) => user.setProfile(profile),
    bottomSheet,
  );
  user.needLogin = () => needLogin(user.profile.code);

  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  useSetupContextMenu(ui);
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  useSetupBottomSheet(ui);

  return (
    <React.Fragment>
      {ui.contextMenus.map((contextMenu) => (
        <ContextMenuViewer
          key={`${contextMenu.id}_${contextMenu.xPosition}_${contextMenu.yPosition}`}
          {...contextMenu}
        />
      ))}
      {ui.bottomSheets.map((bottomSheet) => (
        <BottomSheetViewer key={bottomSheet.id} {...bottomSheet} />
      ))}
      {children}
    </React.Fragment>
  );
};

export default observer(UiProvider);

function useSetupBottomSheet(ui: UiStore) {
  React.useEffect(() => {
    global.__OWNER__.openBottomSheet = (data: BottomSheetData) => {
      ui.bottomSheets = [...ui.bottomSheets, data];
    };
    global.__OWNER__.closeBottomSheet = (targetId: string) => {
      ui.bottomSheets = ui.bottomSheets.filter(({ id }) => id !== targetId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

function useSetupContextMenu(ui: UiStore) {
  React.useEffect(() => {
    global.__OWNER__.openContextMenu = (data: ContextMenuData) => {
      ui.contextMenus = [...ui.contextMenus, data];
    };
    global.__OWNER__.closeContextMenu = (targetId: string) => {
      ui.contextMenus = ui.contextMenus.filter(({ id }) => id !== targetId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
