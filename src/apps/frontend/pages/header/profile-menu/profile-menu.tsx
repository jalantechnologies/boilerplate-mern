import { Avatar } from 'baseui/avatar';
import { Block } from 'baseui/block';
import { StatefulMenu } from 'baseui/menu';
import { StatefulPopover, TRIGGER_TYPE } from 'baseui/popover';
import { PLACEMENT } from 'baseui/toast';
import * as React from 'react';

export interface ProfileMenuItem {
  label: string;
  onClickHandler: () => void;
}

interface ProfileMenuProps {
  items: ProfileMenuItem[];
  userName: string;
  userAvatarUrl: string;
}

const ProfileMenu: React.FunctionComponent<ProfileMenuProps> = ({
  items,
  userAvatarUrl,
  userName,
}) => (
  <StatefulPopover
    triggerType={TRIGGER_TYPE.click}
    placement={PLACEMENT.bottomLeft}
    content={() => (
      <Block>
        <StatefulMenu
          items={items}
          onItemSelect={({ item }: { item: ProfileMenuItem }) => item.onClickHandler()
          }
        />
      </Block>
    )}
    returnFocus
    autoFocus
  >
    <a href="#">
      <Avatar name={userName} size="scale1600" src={userAvatarUrl} />
    </a>
  </StatefulPopover>
);

export default ProfileMenu;
