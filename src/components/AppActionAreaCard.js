import { CardActionArea } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { PATHS } from 'utils/paths';
import CityList from './List';

export default function ActionAreaCard({ city }) {
  return (
    <Card className="card-homepage" sx={{ maxWidth: 345 }}>
      <CardActionArea component={Link} to={`/events/location/${city.id}`}>
        <CardMedia className="card-media" component="img" height="160" image={city.image} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {city.text}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {city.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

// component={Link} to={PATHS.city(city.id)}
