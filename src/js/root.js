import React from 'react';
import ReactDOM from 'react-dom';
import MediaQuery from "react-responsive";
import {Router, Route, hashHistory} from 'react-router';

import PCIndex from "./components/PcIndex";
import PcNewsDetails from "./components/PcNewsDetails";
import MobileNewsDetails from "./components/MobileNewsDetails";
import MobileIndex from "./components/MobileIndex";
import PcUserCenter from "./components/PcUserCenter";
import MobileUserCenter from "./components/MobileUserCenter";

import 'antd/dist/antd.css';
export default class Root extends React.Component {
  render() {
    return (
      <div>
        {/*>1224px*/}
          <MediaQuery query="(min-device-width: 1224px)">
            {/*>在root下设置pc路由*/}
            <Router history={hashHistory}>
              <Route path="/" component={PCIndex}></Route>
              <Route path="/details/:uniquekey" component={PcNewsDetails}></Route>
              <Route path="/usercenter" component={PcUserCenter}></Route>
            </Router>

          </MediaQuery>
          {/*<1224px*/}
          <MediaQuery query="(max-device-width: 1224px)">
            {/*>在root下设置mobile路由*/}
            <Router history={hashHistory}>
              <Route path="/" component={MobileIndex}></Route>
              <Route path="/details/:uniquekey" component={MobileNewsDetails}></Route>
              <Route path="/usercenter" component={MobileUserCenter}></Route>
            </Router>
          </MediaQuery>
        </div>

    );
  };
}
ReactDOM.render(
  <Root/>, document.getElementById('mainContainer'));
