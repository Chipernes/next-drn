import { FC } from 'react';
import Box from 'yoda-ui/components/Box';
import Icon, { Icons } from 'yoda-ui/components/Icons/Icon';
import Tag from 'yoda-ui/components/Tags/Tag';
import { TagCommon } from 'yoda-ui/components/Tags/Tags.types';
import { YodaSpacing } from 'yoda-ui/yodaTheme';

type TagIconProps = {
  label?: string;
  icon: Icons;
} & TagCommon;

const TagIcon: FC<TagIconProps> = ({ label, icon, color, bgcolor }) => (
  <Tag color={ color } bgcolor={ bgcolor }>
    <Box display="flex" width="100%">
      <Box marginLeft={ YodaSpacing.xxSmall } marginY="auto">
        { label }
      </Box>
      <Box marginRight={ YodaSpacing.xxSmall } marginLeft={ YodaSpacing.xxLarge } marginY="auto">
        <Icon name={ icon } />
      </Box>
    </Box>
  </Tag>
);

export default TagIcon;
