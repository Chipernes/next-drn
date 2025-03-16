import { keyframes } from '@emotion/react';
import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/system';
import { FC } from 'react';
import Box from 'yoda-ui/components/Box';
import { YodaColors, YodaSpacing } from 'yoda-ui/yodaTheme';

type LoaderProps = {
  center?: boolean;
  paddingX?: YodaSpacing;
  size?: number;
  color?: YodaColors;
};

const useLoaderStyle = ({ color, size }: { color: YodaColors; size: number }) => {
  const loaderAnimation = keyframes`
    0%, 80%, 100% {
      box-shadow: 0 ${size}rem 0 -1.3rem;
    }
    40% {
      box-shadow: 0 ${size}rem 0 0;
    }
`;

  const circleStyle = {
    borderRadius: '50%',
    width: `${size}rem`,
    height: `${size}rem`,
    animation: `${loaderAnimation} 1800ms infinite ease-in-out both`,
  };

  const loaderStyle: SxProps<Theme> = {
    position: 'relative',
    animationDelay: '-0.16s',
    color,
    top: `${-size}rem`,
    zIndex: 5,
    opacity: 0.8,
    ...circleStyle,
    '&:after': {
      ...circleStyle,
      content: '\'\'',
      position: 'absolute',
      top: 0,
      left: `${size * 1.3}rem`,
      animationDelay: '+0.32s',
    },
    '&:before': {
      ...circleStyle,
      content: '\'\'',
      position: 'absolute',
      top: 0,
      left: `${size * -1.3}rem`,
      animationDelay: '-0.32s',
    },
  };

  return { loaderStyle };
};

const Loader: FC<LoaderProps> = ({
  center,
  paddingX = YodaSpacing.xLarge,
  size = 2.5,
  color = YodaColors.gray2,
}) => {
  const { loaderStyle } = useLoaderStyle({ color, size });
  return (
    <Box paddingX={ paddingX } alignSelf={ center ? 'center' : 'start' } color={ YodaColors.inherit }>
      <Box sx={ loaderStyle } />
    </Box>
  );
};

export default Loader;
