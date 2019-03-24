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
  Modal
} from "antd";
import {Router, Route, Link, browserHistory} from "react-router";
const SubMenu = Menu.SubMenu;
const FormItem = Form.Item;
const MenuItemGroup = Menu.ItemGroup;
const TabPane = Tabs.TabPane;
class MobileHeader extends React.Component {
  constructor() {
    super();
    this.state = {
      current: "top",
      modalVisible: false,
      action: "login",
      hasLogined: false,
      userNickName: "",
      userid: 0
    };
  }
  //cookie缓存
  componentWillMount(){
    if(localStorage.userid!="" ){
      this.setState({hasLogined:true});
      this.setState({userNickName:localStorage.userNickName,userid:localStorage.userid});
    }
  }
  //退出
  logout(){
    localStorage.userid = "";
    localStorage.userNickName = "";
    this.setState({hasLogined:false});
  }
  //点击setting弹出选项卡
  login() {
    this.showModal();
  };
  //弹出模态框
  showModal() {
    this.setState({modalVisible: true});
  }
  // 改变目录的焦点
  handleClick(e) {
    if (e.key == "register") {
      //点击注册按钮，焦点聚焦于注册
      this.setState({current: "register"})
      //弹出模态框
      this.showModal();
    } else {
      this.setState({current: e.key});
    }
  }
  //关闭模态框
  handleOk(e) {
    this.setState({modalVisible: false});
  }
  handleCancel(e) {
    this.setState({modalVisible: false});
  }
  handleSubmit(e) {
    //阻止冒泡
    e.preventDefault();
    //get请求方式
    var myFetchOption = {
      method: "GET"
    };
    //获取表单参数
    var formData = this.props.form.getFieldsValue();
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=" + this.state.action + "&username=" + formData.username + "&password=" + formData.password + "&r_userName=" + formData.r_userName + "&r_password=" + formData.r_password + "&r_confirmPassword=" + formData.r_confirmPassword, myFetchOption)
    .then(response => response.json())
    .then(json => {
      //登录成功
      this.setState({userNickName: json.NickUserName, userid: json.UserId});
      localStorage.userid = json.UserId;
      localStorage.userNickName = json.NickUserName;
    });
    if (this.state.action == "login") {
      this.setState({hasLogined: true})
      message.success("登录成功");
    }
    if(this.state.action == "register"){
      message.success("注册成功");
    }
      this.handleCancel();
  }
  callback(key) {
    key == 1
      ? this.setState({action: "login"})
      : this.setState({action: "register"})
  }
  render() {
    // 获取input参数
    let {getFieldDecorator} = this.props.form;
    const userShow = this.state.hasLogined
      ? <Link to={`/usercenter`}>
          <Icon type="inbox"/>
        </Link>
      : <Icon type="setting" onClick={this.login.bind(this)}/>
    return (
      <div id="mobileheader">
        <header>

            <img src="./src/img/logo.png"/>
            <span>疼寻新闻</span>
          
          {/*展示用户状态*/}
          {userShow}
        </header>
        {/*对话框*/}
        <Modal wrapClassName="vertical-center-modal" title="登录/注册" visible={this.state.modalVisible} onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)} onText="关闭">
          <Tabs type="card">
            <TabPane tab="登录" key="1">
              <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
                <FormItem lable="账户">
                  {getFieldDecorator("username")(<Input placeholder="请输入你的账号"/>)}
                </FormItem>
                <FormItem lable="密码">
                  {getFieldDecorator("password")(<Input type="password" placeholder="请输入你的账号"/>)}
                </FormItem>
                <Button type="primary" htmlType="submit">登录</Button>
              </Form>
            </TabPane>
            <TabPane tab="注册" key="2">
              <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
                <FormItem label="账户">
                  {getFieldDecorator('r_userName')(<Input placeholder="请输入你的账号"/>)}
                </FormItem>
                <FormItem label="密码">
                  {getFieldDecorator("r_password")(<Input type="password" placeholder="请输入你的密码"/>)}
                </FormItem>
                <FormItem label="确认密码">
                  {getFieldDecorator("r_confirmPassword")(<Input type="password" placeholder="请再次输入你的账号"/>)}
                </FormItem>
                <Button type="primary" htmlType="submit">注册</Button>
              </Form>
            </TabPane>
          </Tabs>
        </Modal>
      </div>
    );
  }
}
export default MobileHeader = Form.create({})(MobileHeader);
