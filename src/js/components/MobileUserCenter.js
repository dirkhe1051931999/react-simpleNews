import React from 'react';
import {Row, Col} from "antd";
import MobileHeader from "./MobileHeader";
import MobileFooter from "./MobileFooter";
import {
  Menu,
  Icon,
  Tabs,
  message,
  Form,
  Input,
  Button,
  CheckBox,
  Modal,
  Upload,
  Card,
} from "antd";
import {Router, Route, Link, browserHistory} from "react-router";
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
export default class MobileUserCenter extends React.Component {
  constructor(){
    super();
    this.state={
      userCollection:"",
      userComments:"",
      previewImage:"",
      previewVisible:false,
      //
    };
  };
  //删除模态框
  handleCancel(e) {
    this.setState({previewVisible: false});
  }
  // 页面加载完成的生命周期
  componentDidMount(){
    var myFetchOption={
      method:"GET",
    }
    // 获取收藏的fetch
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid="+localStorage.userid,myFetchOption)
    .then(response=>response.json())
    .then(json=>{
      this.setState({userCollection:json})
    });
    // 获取评论的fetch
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid="+localStorage.userid,myFetchOption)
    .then(response=>response.json())
    .then(json=>{
      this.setState({userComments:json});

    })
  }
  render(){
    // 注意这块的使用方式 {userCollection,userComments} = this.state;
    const  {userCollection,userComments} = this.state;
    // 收藏信息的json 循环
    const userCollectionList = userCollection.length
    ?  userCollection.map((uc,index)=>(
      <Card
        key={index}
        title={uc.uniquekey}
        extra={
          <a href={`/#/details/${uc.uniquekey}`}>查看</a>
        }
      >
        <Link to={`details/${uc.uniquekey}`}>
          <p>{uc.Title}</p>
        </Link>
      </Card>
    ))
    : "没有加载到数据"
    // 评论信息的json 循环
    const userCommentsList = userComments.length
    ?  userComments.map((uComments,index)=>(
      <Card
        key={index}
        title={`您于${uComments.datetime}评论了文章 ${uComments.uniquekey}`}
        extra={
          <a href={`/#/details/${uComments.uniquekey}`}>查看</a>
        }
      >
        <Link to={`details/${uComments.uniquekey}`}>
          <p>{uComments.Commments}</p>
        </Link>
      </Card>
    ))
    : "没有加载到数据"
    const props = {
      //上传位置
      action:"127.0.0.1:81",
      //允许跨域
      headers:{
        "Access-Control-Allow-Origin":"*",
      },
      //上传列表的内建样式，支持三种基本样式 text, picture 和 picture-card
      listType:"picture-card",
      //默认的上传图片的信息
      defaultFileList:[{
        uid:-1,
        name:"xxx.png",
        state:"done",
        // 图片url与缩略图
        url:"https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png",
        thumburl:"https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png"
      }],
      //点击文件链接或预览图标时的回调
      onPreview:(file)=>{
        this.setState({
          previewImage:file.url,
          previewVisible:true,
        })
      }
    };
    return(
      <div>
        <MobileHeader></MobileHeader>
        <Row>
          <Col span={24}>
            <Tabs>
              <TabPane tab="我的收藏列表" key="1">
                <div className="comment">
                    <Row>
                      <Col span={24}>
                        {userCollectionList}
                      </Col>
                    </Row>
                </div>
              </TabPane>
              <TabPane tab="我的评论列表" key="2">
                <div className="comment">
                    <Row>
                      <Col span={24}>
                        {userCommentsList}
                      </Col>
                    </Row>
                </div>
              </TabPane>
              <TabPane tab="头像设置" key="3">
                <div className="clearfix">
                    <Upload {...props}>
                      <Icon type="plus">上传图像</Icon>
                      <div className="ant-upload-text">上传照片</div>
                    </Upload>
                    {/*弹出层*/}
                    <Modal visible ={this.state.previewVisible} footer={null} onCancel={this.handleCancel.bind(this)}>
                      <img alt="预览" src={this.state.previewImage}/>
                    </Modal>
                </div>
              </TabPane>
            </Tabs>
          </Col>
        </Row>
        <MobileFooter></MobileFooter>
      </div>
    );
  }
}
