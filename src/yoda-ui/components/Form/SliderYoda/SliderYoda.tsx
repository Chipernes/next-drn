import { Typography } from '@mui/material';
import Slider from '@mui/material/Slider';
import { FC } from 'react';
import Box from 'yoda-ui/components/Box';
import { sliderYodaStyle } from 'yoda-ui/components/Form/SliderYoda/SliderYoda.style';
import { SliderYodaProps } from 'yoda-ui/components/Form/SliderYoda/SliderYoda.types';
import { useYodaField } from 'yoda-ui/yodaForm';

const SliderYoda: FC<SliderYodaProps> = ({
  defaultValue = 50,
  valueLabelDisplay = 'on',
  maxWidth = '100%',
  label,
  onChange,
  name,
  validation,
}) => {
  const {
    onChangeSlide,
  } = useYodaField({ name, defaultValue, onChange, validation });

  return (
    <Box maxWidth={ maxWidth } sx={ sliderYodaStyle }>
      <Typography>
        { label }
      </Typography>
      <Slider
        defaultValue={ defaultValue }
        valueLabelDisplay={ valueLabelDisplay }
        name={ name }
        onChange={ onChangeSlide }
      />
    </Box>
  );
};

export default SliderYoda;

