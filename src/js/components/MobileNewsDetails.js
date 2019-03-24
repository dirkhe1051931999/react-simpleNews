import React from 'react';
import {Row, Col, BackTop} from "antd";
import MobileHeader from "./MobileHeader";
import MobileFooter from "./MobileFooter";
import PcNewsImgBlock from "./PcNewsImgBlock";
import CommonComents from "./CommonComents";
export default class MobileNewsDetails extends React.Component {

  constructor() {
    super();
    this.state = {
      newItems: ""
    };
  };
  //绑定html 使用dangerouslySetInnerHTML={createMarkup}方法
  createMarkup() {
    return {__html: this.state.newItems.pagecontent};
  };
  //页面加载完毕执行的生命周期
  componentDidMount() {
    var myFetchOption = {
      method: "GET"
    }
    // this.props.params.uniquekey 代表从别的模块的url获得的参数
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=" + this.props.params.uniquekey, myFetchOption)
    .then(response => response.json())
    .then(json => {
      this.setState({newItems: json});
      document.title = this.state.newItems.title + "疼寻新闻";
    });
  }

  render() {
    return (
      <div id="mobileDetailsContainer">
        <MobileHeader></MobileHeader>
        <div className="ucMobileList">
          <Row>
            {/*加载解析后的的新闻*/}
            <Col span={24} className="container">
              <div className="articleContainer" dangerouslySetInnerHTML={this.createMarkup()}></div>
              <hr/>
              <CommonComents uniquekey={this.props.params.uniquekey} ></CommonComents>
            </Col>
          </Row>
          <MobileFooter></MobileFooter>
          <BackTop></BackTop>
        </div>
      </div>
    );
  }
}
