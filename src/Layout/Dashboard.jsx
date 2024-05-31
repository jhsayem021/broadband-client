import React, { useState } from 'react';
import DashboardNav from '../Pages/Dashboard/DashboardNav/DashboardNav';
import DashboardHeader from '../Pages/DashboardHeader/DashboardHeader';
import { Outlet } from 'react-router-dom';
import { Layout, theme } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
// const items = [UserOutlined, VideoCameraOutlined, UploadOutlined, UserOutlined].map(
//   (icon, index) => ({
//     key: String(index + 1),
//     icon: React.createElement(icon),
//     label: `nav ${index + 1}`,
//   }),
// );

const Dashboard = () => {

    
      return (
        <Layout>
          <Sider
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={(broken) => {
              console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
              console.log(collapsed, type);
            }}
           
          >
            <div className="demo-logo-vertical" />
            {/* <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} items={items} /> */}
            <DashboardNav></DashboardNav>
          </Sider>
          <Layout>
            
            <DashboardHeader/>
            <Content>
              <div
              className='bg-slate-200 h-full pt-4 md:pt-10  '

              >
              <Outlet></Outlet>
              </div>
            </Content>
            
          </Layout>
        </Layout>
    );
};

export default Dashboard;