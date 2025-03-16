import { FC, ReactNode } from 'react';
import Box from 'yoda-ui/components/Box';
import { TagCommon } from 'yoda-ui/components/Tags/Tags.types';
import { YodaBorderRadius, YodaColors, YodaFontWeight, YodaSpacing } from 'yoda-ui/yodaTheme';

type TagProps = TagCommon & {
  children?: ReactNode;
  fitContent?: boolean;
  border?: boolean;
  fontWeight?: YodaFontWeight;
  paddingY?: YodaSpacing;
  paddingX?: YodaSpacing;
  width?: string;
  height?: string;
  minHeight?: string;
  borderRadius?: string;
};

const useTagStyles = (props: TagProps) => ({
  display: props.fitContent ? 'inline' : 'block',
  backgroundColor: props.bgcolor || YodaColors.gray5,
  border: props.border ? `1.5px solid ${props.color}` : '',
  minHeight: props.minHeight || null,
});

const Tag: FC<TagProps> = ({ children, color, fontWeight, paddingX, paddingY, borderRadius, ...rest }) => {
  const style = useTagStyles(rest);
  return (
    <Box
      borderRadius={ borderRadius || YodaBorderRadius.small }
      sx={ style }
      color={ color || YodaColors.white }
      display="flex"
      fontWeight={ fontWeight || YodaFontWeight.light }
      justifyContent="center"
      paddingX={ paddingX || YodaSpacing.xxSmall }
      paddingY={ paddingY || YodaSpacing.xxSmall }
    >
      { children }
    </Box>
  );
};

export default Tag;
