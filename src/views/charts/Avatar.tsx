// Create a new CustomAvatar.tsx file in the same folder as RechartsPieChart.tsx

import Avatar, { AvatarProps } from '@mui/material/Avatar';
import { SxProps } from '@mui/system';

interface CustomAvatarProps extends AvatarProps {
  backgroundColor?: string;
}

const CustomAvatar = ({ backgroundColor, ...rest }: CustomAvatarProps) => {
  const avatarStyle: SxProps = {
    backgroundColor: backgroundColor || undefined,
  };

  return <Avatar {...rest} sx={avatarStyle} />;
};

export default CustomAvatar;
