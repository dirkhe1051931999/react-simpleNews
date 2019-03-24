import React from 'react';
import PCHeader from "./PcHeader";
import PcFooter from "./PcFooter";
import PcNewsContainer from "./PcNewsContainer";
import {Row, Col} from "antd";
import {Tabs,Carousel} from "antd";
const TabPane = Tabs.TabPane;
export default class PCIndex extends React.Component {
    render(){
      return(
        <div>
          <PCHeader></PCHeader>
          <PcNewsContainer></PcNewsContainer>
          <PcFooter></PcFooter>
        </div>
      )
    }
}
