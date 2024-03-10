
import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import './Swiper.css';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import StockSummary from '../StockData/MaterialTab/Tabs/StockSummary';
import TopNews from '../StockData/MaterialTab/Tabs/TopNews';
import Charts from '../StockData/MaterialTab/Tabs/Charts';
import Insight from '../StockData/MaterialTab/Tabs/Insight';

export default function ScrollableTabsButtonVisible() {
  const [value, setValue] = React.useState('1');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <TabContext value={value}>
    <Box
      sx={{
        flexGrow: 1,
        maxWidth: { xs: 320, sm: 480 },
        bgcolor: 'background.paper',
      }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
        aria-label="visible arrows tabs example"
        sx={{
          [`& .${tabsClasses.scrollButtons}`]: {
            '&.Mui-disabled': { opacity: 0.3 },
          },
        }}
      >
        <Tab label="Summary" value="1" sx={{ textTransform: 'none' }}/>
        <Tab label="Top News" value="2" sx={{ textTransform: 'none' }}/>
        <Tab label="Charts" value="3" sx={{ textTransform: 'none' }}/>
        <Tab label="Insights" value="4" sx={{ textTransform: 'none' }} />
      </Tabs>
      <TabPanel value="1"><StockSummary/></TabPanel>
  <TabPanel value="2"><TopNews/></TabPanel>
  <TabPanel value="3"><Charts/></TabPanel>
  <TabPanel value="4"><Insight/></TabPanel>
    </Box>
    </TabContext>
  );
}
