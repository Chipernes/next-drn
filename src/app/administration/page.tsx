'use client';

import { Container, Typography } from '@mui/material';
import useAdministrationConfig from './administration.config';
import AdminHomeCard from 'components/AdminHomeCard/AdminHomeCard';
import Grid from 'yoda-ui/components/Grid';

const AdminHomePage = () => {
  const cards = useAdministrationConfig();

  return (
    <Container sx={ { mt: 4 } }>
      <Typography variant="h4" gutterBottom>
        Адміністративна панель
      </Typography>

      <Grid container spacing={ 3 }>
        {
          cards.map((card) => (
            <Grid item xs={ 12 } sm={ 6 } md={ 4 } key={ card.title }>
              <AdminHomeCard { ...card } />
            </Grid>
          ))
        }
      </Grid>
    </Container>
  );
};

export default AdminHomePage;
