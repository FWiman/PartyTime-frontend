import CommentIcon from '@mui/icons-material/Comment';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonPinIcon from '@mui/icons-material/Person';
import ReviewsIcon from '@mui/icons-material/Reviews';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import * as React from 'react';

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

export default function NavTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs value={value} onChange={handleChange} aria-label="nav tabs example">
        <LinkTab icon={<PersonPinIcon />} label="Activity page" href="/activities" />
        <LinkTab icon={<FavoriteIcon />} label="AppGetReviews" href="/favorites" />
        <LinkTab icon={<CommentIcon />} label="Comments" href="/comments" />
        <LinkTab icon={<ReviewsIcon />} label="Reviews" href="/review" />
      </Tabs>
    </Box>
  );
}
