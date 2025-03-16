import { FC } from 'react';
import { DropzoneInputProps, DropzoneRootProps } from 'react-dropzone';
import Box from 'yoda-ui/components/Box';
import Button from 'yoda-ui/components/Button';
import { ButtonType } from 'yoda-ui/components/Button/Button.types';
import Icon from 'yoda-ui/components/Icons/Icon';
import { Icons } from 'yoda-ui/components/Icons/Icon/Icon';
import { YodaBorderRadius, YodaColors, YodaFontWeight, YodaSpacing } from 'yoda-ui/yodaTheme';

type DropZoneProps = {
  label: string;
  btnLabel: string;
  btnIcon: Icons;
  message: string;
  getRootProps: <T extends DropzoneRootProps>(props?: T | undefined) => T;
  getInputProps: <T extends DropzoneInputProps>(props?: T | undefined) => T;
  isDragActive: boolean;
};

const DropZone: FC<DropZoneProps> = ({
  label,
  btnLabel,
  btnIcon,
  message,
  getRootProps,
  getInputProps,
  isDragActive,
}) => {
  const boxStyle = {
    border: `2px dashed ${isDragActive ? YodaColors.blue4 : YodaColors.gray3}`,
    borderRadius: `${YodaBorderRadius.medium}`,
  };

  const labelBox = <>
    <Box paddingBottom={ YodaSpacing.medium }>
      { label }
    </Box>
  </>;

  return (
    <>
      { label && labelBox }
      <Box
        display="flex"
        width="100%"
        paddingY={ YodaSpacing.medium }
        { ...getRootProps() }
        flexDirection="column"
        sx={ boxStyle }
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          alignSelf="Center"
          justifySelf="center"
          fontWeight={ YodaFontWeight.light }
        >
          <Button buttonType={ ButtonType.secondary } startIcon={ <Icon name={ btnIcon } /> }>
            { btnLabel }
          </Button>
          <input { ...getInputProps() } data-testid="dropzone" />
          <Box
            color={ YodaColors.gray4 }
            textAlign="center"
          >
            { message }
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default DropZone;
