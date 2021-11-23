import React from 'react'

function Header() {
    return (
        <nav>
            <div className="nav-left">
                <h1 className="logo">Warrior Gains</h1>
                <ul>

                    {/* <li><img src="/notification.png" ></li>*/}
                    <li><i className="far fa-bell"></i></li>
                    {/* <li><img src="/inbox.png" ></li>*/}
                    <li><i className="fas fa-inbox"></i></li>
                    {/* <li><img src="/video.png" ></li>*/}
                    <li><i className="fas fa-video"></i></li>
                </ul>
            </div>
            <div className="nav-right">
                <div className="search-box">
                    <i className="fas fa-search"></i>
                    <input type="text" placeholder="Search" />
                </div>

                <div className="nav-user-icon online">
                    <i className="fas fa-users"></i>
                </div>


                <a className="btn btn-dark btn-lg" role="button" href="/" id="logOut"><i className="fas fa-sign-out-alt"></i>Log
                    Out</a>
            </div>
        </nav>
    )
}

export default Header
