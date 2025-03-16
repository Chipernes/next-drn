import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { IconButtonProps } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import IconButton from 'yoda-ui/components/Icons/IconButton';

type CollapseIconProps = {
  expand: boolean;
} & IconButtonProps;

const CollapseIcon = (props: CollapseIconProps) => {
  // eslint-disable-next-line unused-imports/no-unused-vars
  const { expand, sx, ...other } = props;
  const theme = useTheme();

  const style = {
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    ...sx,
  };

  return (
    <IconButton sx={ style } { ...other }>
      <ExpandMoreIcon />
    </IconButton>
  );
};

export default CollapseIcon;
