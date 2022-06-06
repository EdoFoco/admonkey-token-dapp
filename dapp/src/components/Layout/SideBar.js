import React from 'react'

class SideBar extends React.Component {
    render() {
        return (
            <div className="sidebar">
                <div className='sidebar-logo' />
                <div className='sidebar-h1'>AdMonkey</div>
                <div style={{ margin: 'auto', padding: '20px', textAlign: 'center' }}>
                    <a className="buy-button" href="https://pancakeswap.com">Buy now</a>
                </div>
                <div className='sidebar-box'>
                    <div className='sidebar-h1'>Contract Details</div>
                </div>

            </div>);
    }
}

export default SideBar;
