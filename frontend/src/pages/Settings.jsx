import { useState } from 'react';
import { Box, Tabs, Tab, Typography, Grid, Paper } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SecurityIcon from '@mui/icons-material/Security';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ProfileSettings from '../components/settings/ProfileSettings';
import SecuritySettings from '../components/settings/SecuritySettings';
import NotificationSettings from '../components/settings/NotificationSettings';
import { NOUN } from 'common/constants/translation';

// Main Settings Page Component
export default function Settings() {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const renderTabContent = () => {
    switch (tabIndex) {
      case 0:
        return <ProfileSettings />;
      case 1:
        return <SecuritySettings />;
      case 2:
        return <NotificationSettings />;
      default:
        return null;
    }
  };

  return (
    <div className="div flex flex-col mt-[22px]">
      <div className="text-[#262626] font-semibold text-[22px] [font-family:'Poppins-Medium',Helvetica] leading-normal mt-[-1px] relative w-fit">
        {NOUN.SETTINGS.toUpperCase()}
      </div>

      <Grid container>
        {/* Vertical Tabs on the Left */}
        <Grid item xs={3}>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={tabIndex}
            onChange={handleTabChange}
            sx={{
              borderRight: 1,
              borderColor: 'divider',
              minHeight: '100vh',
              bgcolor: 'background.paper',
            }}
          >
            <Tab icon={<AccountCircleIcon />} label={NOUN.PROFILE} />
            <Tab icon={<SecurityIcon />} label={NOUN.SECURITY} />
            <Tab icon={<NotificationsIcon />} label={NOUN.NOTIFICATIONS} />
          </Tabs>
        </Grid>

        {/* Settings Content on the Right */}
        <Grid item xs={9}>
          <Box p={3}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              {renderTabContent()}
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}
