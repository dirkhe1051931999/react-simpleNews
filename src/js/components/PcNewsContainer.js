import React from 'react';
import {Row, Col} from "antd";
import {Tabs,Carousel} from "antd";
import PcNewsBlock from "./PcNewsBlock";
import PcNewsImgBlock from "./PcNewsImgBlock";
import PcProducts from "./PcProducts"
const TabPane = Tabs.TabPane;
export default class PcNewsContainer extends React.Component {
    render(){
      //轮播图参数
      const settings = {
        dots:true, //是否显示面板指示点
        infinite:true,//样式展现
        speed:500,//速度
        slidesToshow:1,//从那一张开始
        autoplay:true,//自动播放
      }
      return(
          <div>
            <Row>
              <Col span={2}></Col>
              <Col span={20} className="container">
                <div className="leftContainer">
                  {/*轮播图*/}
                  <div className="carousel">
                    <Carousel {...settings}>
                      <div><img src="./src/img/carousel_1.jpg" alt="carousel_1.jpg"/></div>
                      <div><img src="./src/img/carousel_2.jpg" alt="carousel_2.jpg"/></div>
                      <div><img src="./src/img/carousel_3.jpg" alt="carousel_3.jpg"/></div>
                      <div><img src="./src/img/carousel_4.jpg" alt="carousel_4.jpg"/></div>
                    </Carousel>
                  </div>
                  {/*轮播图下面显示的新闻图片块*/}
                  <PcNewsImgBlock count={6} type="shehui" width="400px" cartTitle="社会头条" imageWidth="112px"/>
                </div>
                <Tabs default className="tabs_news">
                  <TabPane tab="头条新闻" key="1">
                      <PcNewsBlock type="top" count={22} width="100%" bordered="false" />
                  </TabPane>
                  <TabPane tab="娱乐新闻" key="2">
                      <PcNewsBlock type="yule" count={22} width="100%" bordered="false" />
                  </TabPane>
                  <TabPane tab="国际新闻" key="3">
                      <PcNewsBlock type="guoji" count={22} width="100%" bordered="false" />
                  </TabPane>
                  <TabPane tab="国内新闻" key="4">
                      <PcNewsBlock type="guonei" count={22} width="100%" bordered="false" />
                  </TabPane>
                </Tabs>
                <Tabs className="tabs_product">
                  <TabPane tab="疼寻新闻产品" key="1">
                      <PcProducts></PcProducts>
                  </TabPane>
                </Tabs>
                <div>
                  {/*新闻图片块*/}
                  <PcNewsImgBlock count={9} type="top" width="100%" cartTitle="头条" imageWidth="111px"/>
                  <PcNewsImgBlock count={27} type="yule" width="100%" cartTitle="娱乐头条" imageWidth="110px"/>
                </div>
              </Col>
              <Col span={2}></Col>
            </Row>
          </div>
      )
    }
}
