import { YodaColors } from 'yoda-ui/yodaTheme';

const switchHeight = 28;
const switchWidth = 52;
const switchPadding = 2;
const switchThumbSize = 24;

const checkIconSvgPath = `<path fill="${encodeURIComponent(YodaColors.completed)}" d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>`;
const thumbIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="12" width="12" viewBox="0 0 20 20">${checkIconSvgPath}</svg>`;

export const switchStyle = {
  width: switchWidth,
  height: switchHeight,
  padding: 0,
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: switchThumbSize,
    height: switchThumbSize,
  },
  '& .MuiSwitch-track': {
    borderRadius: '33px',
    backgroundColor: YodaColors.gray1,
    opacity: 1,
  },
  '& .MuiSwitch-switchBase': {
    padding: `${switchPadding}px`,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: `translateX(${switchThumbSize}px)`,
      color: YodaColors.white,
      '& .MuiSwitch-thumb': {
        backgroundImage: `url('data:image/svg+xml;utf8,${thumbIcon}')`,
        backgroundRepeat: 'no-repeat',
        backgroundPositionX: '40%',
        backgroundPositionY: '40%',
      },
      '& + .MuiSwitch-track': {
        backgroundColor: YodaColors.completed,
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.8,
      },
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color: YodaColors.gray1,
    },
  },
};
