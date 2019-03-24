import React from 'react';
import {Card} from "antd";

import {Router, Route, Link, BrowserHistory} from "react-router";
export default class PcNewsBlock extends React.Component {
  constructor() {
    super();
    this.state = {
      news: "" //存json的容器
    }
  }
  componentWillMount() {
    var myFetchOption = {
      //get请求方式
      method: "GET"
    };
      //fetch  请求的url type=this.props.type  count=this.props.count 用了props属性
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=" + this.props.type + "&count=" + this.props.count)
    .then(response => response.json())
    .then(json => this.setState({news: json}));
  };
  render() {
    const {news} = this.state; //news=this.state.news
    const newList = news.length
      ? news.map((newsItem, index) => (
        //遍历出所有标题放在li标签里
        <li key={index}>
          <Link to={`details/${newsItem.uniquekey}`} target="_blank">
            {newsItem.title}
          </Link>
        </li>
      ))
      : "没有加载到任何新闻"
    return (
      <div className="topNewsList">
        <Card>
          <ul>
            {newList}
          </ul>
        </Card>
      </div>
    );
  }
}
