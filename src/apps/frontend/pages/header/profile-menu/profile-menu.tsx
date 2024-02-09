import { Block } from 'baseui/block';
import { StatefulMenu } from 'baseui/menu';
import { StatefulPopover, TRIGGER_TYPE } from 'baseui/popover';
import { PLACEMENT } from 'baseui/toast';
import * as React from 'react';
import Avatar from 'react-avatar';

export interface ProfileMenuItem {
  label: string;
  onClickHandler: () => void;
}

interface ProfileMenuProps {
  items: ProfileMenuItem[];
  userName: string;
}

const ProfileMenu: React.FunctionComponent<ProfileMenuProps> = ({
  items,
  userName,
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
      <Avatar size="50" name={userName} />
    </Block>
  </StatefulPopover>
);

export default ProfileMenu;
