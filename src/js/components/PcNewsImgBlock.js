import React from 'react';
import {Card} from "antd";
import {Router, Route, Link, BrowserHistory} from "react-router";
export default class PcNewsImgBlock extends React.Component {
  constructor() {
    super();
    this.state = {
      news: ""
    }
  }
  componentWillMount() {
    var myFetchOption = {
      method: "GET"
    };
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=" + this.props.type + "&count=" + this.props.count)
    .then(response => response.json())
    .then(json => this.setState({news: json}));
  };
  /*
  * this.props.imageWidth, card的大小
  * this.props.cartTitle card标题
  * this.props.width  card的宽度
  */
  render() {
    // 写的行内样式styleImage
    const styleImage={
      display:"block",
      width:this.props.imageWidth,
      height:"90px",
    }
    // 写的行内样式styleH3 width:this.props.imageWidth,
    const styleH3 ={
      width:this.props.imageWidth,
      // 字太多以点显示
      whiteSpace:"nowrap",
      overflow:"hidden",
      textOverflow:"ellipsis",
    }
    const {news} = this.state;
    const newList = news.length
      ? news.map((newsItems,index)=>(
        <div key={index} className="imageblock">
            <Link to={`details/${newsItems.uniquekey}`} target="_blank">
                <div className="custom-image">
                  {/*用到了行内样式*/}
                  <img alt={newsItems.uniquekey} src={newsItems.thumbnail_pic_s} style={styleImage}/>
                </div>
                <div className="custom-title">
                    {/*用到了行内样式*/}
                    <h3 style={styleH3}>{newsItems.title}</h3>
                    <p>{newsItems.author_name}</p>
                </div>
            </Link>
        </div>
      ))
      : "没有加载到任何新闻"
    return (
      <div className="topNewsList">
        <Card title={this.props.cartTitle} bordered={true} style={{width:this.props.width}} style={{margin:this.props.marginTop}}>
          <ul>
            {newList}
          </ul>
        </Card>
      </div>
    );
  }
}
