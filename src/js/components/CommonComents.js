import React from 'react';
import {Row, Col} from "antd";
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
  Card,
  notification
} from "antd";
import {Router, Route, Link, browserHistory} from "react-router";
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const {TextArea} = Input;
class commonComments extends React.Component {
  constructor(){
    super();
    this.state = {
      comments: ""
    };
  };
  // 页面加载完毕去fetch 获取数据
  componentDidMount() {
    var myFetchOption = {
      method: "GET"
    }
    // this.props.params.uniquekey 代表从别的模块的url获得的参数
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey="+this.props.uniquekey, myFetchOption)
    .then(response => response.json())
    .then(json => {
      this.setState({comments: json});
    });
  }
  //评论提交
  handleSubmit(e){
    e.preventDefault();
    var myFetchOption = {
      method: "GET"
    };
    //获取表单参数
    var formData = this.props.form.getFieldsValue();
    // console.log(formData);
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid="+localStorage.userid+"&uniquekey="+this.props.uniquekey+"&commnet="+formData.remark, myFetchOption)
    .then(response => response.json())
    .then(json => {
        //获取json后 重新页面加载
        // console.log(1);
        //全局提醒
        message.success("评论成功");
        this.componentDidMount();
    });
  }
  //提醒通知框
  openNotification(){
    notification.open({
      message:"提醒",
      icon: <Icon type="smile-circle" style={{ color: '#108ee9' }} />,
      description:"收藏成功",
    })
  }
  // 收藏
  addUserCollection(){
    var myFetchOption = {
      method:"GET",
    }
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid="+localStorage.userid+"&uniquekey="+this.props.uniquekey,myFetchOption)
    .then(response=>response.json())
    .then(json=>{
        // 收藏成功后进行收藏的提醒
        // 通知提醒框
        this.openNotification()
    });
  }
  render(){
    let {getFieldDecorator} = this.props.form; //呈递表单的内容
    let {comments}  = this.state; // comments = this.state.comments
    //获取评论的内容
    const commentList = comments.length
    ? comments.map( (comments,index)=>(
      // extra是附加显示的东西
      <Card key={index} title={comments.UserName} extra={<a href="#">发布于{comments.datetime}</a>}>
          <p>{comments.Comments}</p>
      </Card>
    ))
    : "未获得评论"
    return (
      <div className="commit">
        <Row>
          <Col span={24}>
            {commentList}
            {/*提交评论的区域*/}
            <Form onSubmit={this.handleSubmit.bind(this)}>
                <FormItem label="你的评论">
                  {/*默认值是空 initialvalue*/}
                  {getFieldDecorator("remark",{initialvalue:""})(<Input type="textarea" placeholder="..."/>)}
                </FormItem>
                <Button htmlType="submit" type="primary" >提交</Button>
                &nbsp;&nbsp;
                <Button htmlType="button" type="primary" onClick={this.addUserCollection.bind(this)}>收藏</Button>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}
//要进行二次封装 PCHeader Form表单的提交用
export default commonComments = Form.create({})(commonComments);
