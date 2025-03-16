import MuiRadio, { RadioProps as MuiRadioProps } from '@mui/material/Radio';
import { FC } from 'react';

export type RadioProps = MuiRadioProps;

const Radio: FC<RadioProps> = (props) => <MuiRadio { ...props }/>;

export default Radio;
