'use client';

import { Card, CardActionArea, CardContent, Typography, Box } from '@mui/material';
import { IKImage } from 'imagekitio-next';
import Link from 'next/link';
import { FC } from 'react';
import { config } from 'config/config';

type AdminHomeCardPropsType = {
  title: string;
  description: string;
  href: string;
  imageUrl: string;
};

const AdminHomeCard: FC<AdminHomeCardPropsType> = ({ title, description, href, imageUrl }) => (
  <Card
    sx={
      {
        width: '100%',
        maxWidth: 360,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        boxShadow: 2,
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          boxShadow: 6,
          transform: 'translateY(-6px)',
        },
      }
    }
    elevation={ 2 }
  >
    <Link href={ href } passHref legacyBehavior>
      <CardActionArea
        sx={
          {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            height: '100%',
            p: 2,
          }
        }
      >
        <Box
          sx={
            {
              width: '100%',
              mb: 2,
              borderRadius: 2,
              overflow: 'hidden',
              boxShadow: '0 4px 10px rgb(0 0 0 / 0.1)',
              flexShrink: 0,
              maxHeight: 180,
              position: 'relative',
            }
          }
        >
          <IKImage
            urlEndpoint={ config.env.imagekit.urlEndpoint }
            path={ imageUrl }
            alt={ title }
            width={ 400 }
            height={ 300 }
            style={
              {
                width: '100%',
                height: 'auto',
                display: 'block',
                objectFit: 'cover',
                borderRadius: 8,
              }
            }
          />
        </Box>

        <CardContent
          sx={
            {
              p: 0,
              pt: 0,
              flexGrow: 1,
              display: 'flex',
              flexDirection: 'column',
            }
          }
        >
          <Typography
            variant="h6"
            component="div"
            sx={ { fontWeight: 600, mb: 1, color: 'text.primary' } }
          >
            { title }
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={
              {
                flexGrow: 1,
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitLineClamp: 4,
                WebkitBoxOrient: 'vertical',
              }
            }
          >
            { description }
          </Typography>
        </CardContent>
      </CardActionArea>
    </Link>
  </Card>
);

export default AdminHomeCard;
