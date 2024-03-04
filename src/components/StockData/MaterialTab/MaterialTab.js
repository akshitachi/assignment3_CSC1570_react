import React, { useState } from 'react';
import './MaterialTab.css';
import StockSummary from './Tabs/StockSummary';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

function MaterialTab() {
    const [activeTab, setActiveTab] = useState(1);

    const handleTabClick = (tabNumber) => {
        setActiveTab(tabNumber);
    };

    return (
        <div>
            <div className="tabs">
                <div
                    className={`tab${activeTab === 1 && 'active'}`}
                    onClick={() => handleTabClick(1)}
                >
                    Summary
                </div>
                <div
                    className={`tab${activeTab === 2 && 'active'}`}
                    onClick={() => handleTabClick(2)}
                >
                    Top News
                </div>
                <div
                    className={`tab${activeTab === 3 && 'active'}`}
                    onClick={() => handleTabClick(3)}
                >
                    Charts
                </div>
                <div
                    className={`tab${activeTab === 4 && 'active'}`}
                    onClick={() => handleTabClick(4)}
                >
                    Insights
                </div>
            </div>
            <div className="swiper1">
            <Swiper slidesPerView={3} navigation={true} modules={[Navigation]}>
                <div className='swiper-content'>
        <SwiperSlide className={`tab${activeTab === 1 && 'active'}`} onClick={() => handleTabClick(1)}>Summary</SwiperSlide>
        <SwiperSlide className={`tab${activeTab === 2 && 'active'}`} onClick={() => handleTabClick(2)}>Top News</SwiperSlide>
        <SwiperSlide className={`tab${activeTab === 3 && 'active'}`} onClick={() => handleTabClick(3)}>Charts</SwiperSlide>
        <SwiperSlide className={`tab${activeTab === 4 && 'active'}`} onClick={() => handleTabClick(4)}>Insights</SwiperSlide>
        </div>
      </Swiper>
      </div>
            <div className="tab-content">
                {activeTab === 1 && <StockSummary/>}
                {activeTab === 2 && <div>Content for Tab 2</div>}
                {activeTab === 3 && <div>Content for Tab 3</div>}
                {activeTab === 4 && <div>Content for Tab 4</div>}
            </div>
        </div>
    );
}

export default MaterialTab;
