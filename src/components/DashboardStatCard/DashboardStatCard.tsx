'use client';

import { Card, CardContent, Typography } from '@mui/material';

const DashboardStatCard = ({ title, value }: { title: string; value: string | number }) => (
  <Card>
    <CardContent>
      <Typography variant="subtitle2" color="textSecondary">{ title }</Typography>
      <Typography variant="h5">{ value }</Typography>
    </CardContent>
  </Card>
);

export default DashboardStatCard;
