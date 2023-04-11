import { Favorite, ThumbUp } from '@mui/icons-material';
import CommentIcon from '@mui/icons-material/Comment';
import EventIcon from '@mui/icons-material/Event';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonPinIcon from '@mui/icons-material/Person';
import ReviewsIcon from '@mui/icons-material/Reviews';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import * as React from 'react';
import { Outlet } from 'react-router-dom';
import LinkTab from './LinkTab';

export default function ProfileTabs() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
      <TabContext value={value}>
        <Box>
          <TabList onChange={handleChange}>
            <LinkTab value="1" icon={<Favorite />} label="Favorites" to="/profile" />
            <LinkTab value="2" icon={<CommentIcon />} label="Reviews" to="/profile/reviews" />
            <LinkTab value="3" icon={<EventIcon />} label="Created events" to="/profile/created" />
          </TabList>
        </Box>
        <Outlet></Outlet>
      </TabContext>
    </Box>
  );
}
