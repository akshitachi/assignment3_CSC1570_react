import React, { useState } from 'react';
import './MaterialTab.css';
import 'swiper/css';
import 'swiper/css/navigation';
import ScrollableTabsButtonVisible from '../../Utils/Swiper';
import LabTabs from '../../Utils/MainSwiper';

function MaterialTab() {
    const [activeTab, setActiveTab] = useState(1);
    const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
    const handleTabClick = (tabNumber) => {
        setActiveTab(tabNumber);
    };

    return (
        <div className='swiper2'>
            <div className='tab-content'>
            <LabTabs/>
            </div>
            <div className="swiper1">
           <ScrollableTabsButtonVisible/>
      </div>
        </div>
    );
}

export default MaterialTab;
