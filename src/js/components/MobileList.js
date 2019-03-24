import React from 'react';
import {Col,Row} from "antd";
import {Router, Route, Link, BrowserHistory} from "react-router";
export default class MobileList extends React.Component {
  constructor() {
    super();
    this.state = {
      // 获取的json参数
      news: ""
    }
  }
  //fetch请求
  componentWillMount() {
    //get请求方式
    var myFetchOption = {
      method: "GET"
    };
    //请求的url type=this.props.type  count=this.props.count 用了props属性
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=" + this.props.type + "&count=" + this.props.count)
    // 以json形式响应
    .then(response => response.json())
    // 把json存在news里面
    .then(json => this.setState({news: json}));
  };
  render() {
    const {news} = this.state; //news=this.state.news
    const newList = news.length
    //遍历
      ? news.map((newsItem, index) => (
          <section key={index} className="m_article list-item special_section clearfix">
            <Link to={`details/${newsItem.uniquekey}`}>
            {/*图片*/}
              <div className="m_article_img">
                  <img src={newsItem.thumbnail_pic_s} alt={newsItem.title}/>
              </div>
              <div className="m_article_info">
                {/*标题*/}
                <div className="m_article_title">
                    <span>{newsItem.title}</span>
                </div>

                <div className="m_article_desc clearfix">
                    <div className="m_article_desc_l">
                      {/*类型*/}
                        <span className="m_article_channel">{newsItem.realtype}</span>
                      {/*时间*/}
                        <span className="m_article_time">{newsItem.date}</span>
                    </div>
                </div>
              </div>
            </Link>
          </section>
      ))
      : "没有加载到任何新闻"
    return (
      <div>
        <Row>
          <Col span={24}>
              {newList}
          </Col>
        </Row>
      </div>
    );
  }
}
