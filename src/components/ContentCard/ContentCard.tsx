import { FC } from 'react';
import { contentCardStyle } from './ContentCard.style';
import { ContentCardProps } from './ContentCard.types';
import Card from 'yoda-ui/components/Card/Card';

const ContentCard: FC<ContentCardProps> = ({ sx, children, onClick = () => {}, ...rest }) => {
  const computedStyle = { ...contentCardStyle, ...sx };

  return (
    <Card sx={ computedStyle } variant="outlined" { ...rest } onClick={ onClick }>
      { children }
    </Card>
  );
};

export default ContentCard;
