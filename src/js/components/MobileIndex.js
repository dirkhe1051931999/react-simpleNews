import React from 'react';
import MobileHeader from "./MobileHeader";
import MobileFooter from "./MobileFooter";
import MobileList from "./MobileList";
import {Tabs,Carousel} from "antd";
const TabPane = Tabs.TabPane;
export default class MobileIndex extends React.Component {
  render() {
    // 轮播的参数设定
    const settings = {
      dots:true, //是否显示面板指示点
      infinite:true,//样式展现
      speed:500,//速度
      slidesToshow:1,//从那一张开始
      autoplay:true,//自动播放
    }
    return (
      <div>
        <MobileHeader></MobileHeader>
        <Tabs>
          <TabPane tab="头条" key="1">
            {/*轮播图*/}
            <div className="carousel">
              <Carousel {...settings}>
                <div><img src="./src/img/carousel_1.jpg" alt="carousel_1.jpg"/></div>
                <div><img src="./src/img/carousel_2.jpg" alt="carousel_2.jpg"/></div>
                <div><img src="./src/img/carousel_3.jpg" alt="carousel_3.jpg"/></div>
                <div><img src="./src/img/carousel_4.jpg" alt="carousel_4.jpg"/></div>
              </Carousel>
            </div>
            {/*新闻list*/}
            <MobileList count={20} type="top"/>
          </TabPane>
          <TabPane tab="社会" key="2">
            {/*新闻list*/}
            <MobileList count={20} type="shehui"/>
          </TabPane>
          <TabPane tab="国内" key="3">
            {/*新闻list*/}
            <MobileList count={20} type="guonei"/>
          </TabPane>
          <TabPane tab="国际" key="4">
            {/*新闻list*/}
            <MobileList count={20} type="guoji"/>
          </TabPane>
          <TabPane tab="娱乐" key="5">
            {/*新闻list*/}
            <MobileList count={20} type="yule"/>
          </TabPane>
        </Tabs>
        <MobileFooter></MobileFooter>
      </div>
    )
  }
}
