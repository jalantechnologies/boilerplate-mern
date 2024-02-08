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
  userAvatarUrl: string;
}

const ProfileMenu: React.FunctionComponent<ProfileMenuProps> = ({
  items,
  userAvatarUrl,
}) => (
  <StatefulPopover
    triggerType={TRIGGER_TYPE.click}
    placement={PLACEMENT.bottomLeft}
    content={() => (
        <StatefulMenu
          items={items}
          onItemSelect={({ item }: { item: ProfileMenuItem }) => item.onClickHandler()
          }
        />
    )}
    returnFocus
    autoFocus
  >
    <Block>
      <Avatar size="scale1600" src={userAvatarUrl} />
    </Block>
  </StatefulPopover>
);

export default ProfileMenu;