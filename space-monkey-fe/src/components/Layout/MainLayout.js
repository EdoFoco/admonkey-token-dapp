import React from 'react'
//import HeadSiderContainer from './HeaderContainer'
//import Footer from './Footer'
import SideBar from './SideBar';
import MainContent from './MainContent';

//import './main-layout.sass';

class MainLayout extends React.Component {
    render() {
        return (
            <div className="mainLayout">
                <SideBar />
                <MainContent>
                    {this.props.children}
                </MainContent>
            </div>);
    }
}

export default MainLayout;
