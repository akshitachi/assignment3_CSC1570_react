import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import StockSummary from '../StockData/MaterialTab/Tabs/StockSummary';
import './MainSwiper.css';
import TopNews from '../StockData/MaterialTab/Tabs/TopNews';
import Charts from '../StockData/MaterialTab/Tabs/Charts';
import Insight from '../StockData/MaterialTab/Tabs/Insight';

export default function LabTabs() {
  const [value, setValue] = React.useState('1');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box>
      <TabContext value={value}>
        <Box>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Summary" value="1" />
            <Tab label="Top News" value="2" />
            <Tab label="Charts" value="3" />
            <Tab label="Insights" value="4" />
          </TabList>
        </Box>
        <TabPanel value="1"><StockSummary/></TabPanel>
        <TabPanel value="2"><TopNews/></TabPanel>
        <TabPanel value="3"><Charts/></TabPanel>
        <TabPanel value="4"><Insight/></TabPanel>

      </TabContext>
    </Box>
  );
}