import React from 'react';
import {Row, Col, BackTop} from "antd";
import PCHeader from "./PcHeader";
import PcFooter from "./PcFooter";
import CommonComents from "./CommonComents";
import PcNewsImgBlock from "./PcNewsImgBlock";
export default class PcNewsDetails extends React.Component {

  constructor() {
    super();
    this.state = {
      newItems: ""
    };
  };
  //绑定html 使用dangerouslySetInnerHTML={createMarkup}方法，让json里面的html去加载进jsx中的div中
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
      <div>
        <PCHeader></PCHeader>
        <Row>
          <Col span={2}></Col>
          <Col span={14} className="container">
            {/*加载解析后的的新闻*/}
            <div className="articleContainer" dangerouslySetInnerHTML={this.createMarkup()}></div>
            <hr/>
            <CommonComents uniquekey={this.props.params.uniquekey} ></CommonComents>
          </Col>
          <Col span={6}>
            {/*加载解析后的的新闻的右侧的推荐新闻*/}
            <PcNewsImgBlock  marginTop="20px 0" type="top" count={40} width="100%" cartTitle="相关新闻" imageWidth="140px"></PcNewsImgBlock>
          </Col>
          <Col span={2}></Col>
        </Row>
        {/*快速返回的顶部*/}
        <BackTop></BackTop>
        <PcFooter></PcFooter>
      </div>
    );
  }
}
