import React from 'react'
import './Profile.css'

function Profile() {
    return (
        <section>
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <ul className="list-group">
                                <li className="list-group-item"><span><strong>About Me</strong></span>
                                    <p>Welcome to my profile. insert bio here </p>
                                    <a className="btn btn-dark btn-lg" role="button" href="#Edit">Edit</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-md-6">
                            <ul className="list-group">
                                <li className="list-group-item">
                                    <blockquote>
                                        <p>@user Hello World</p>
                                        <button className="btn" type="button" style={{ color: "#eb3b60" }}>
                                            <span> 5 Likes</span></button>
                                        <button className="btn comment" type="button" style={{ color: "#eb3b60" }}>
                                            <span style={{ color: "#f9d616" }}> 2 Comments</span></button>

                                    </blockquote>
                                </li>
                                <li className="list-group-item">
                                    <blockquote>
                                        <p>@user Hello World</p>
                                        <button className="btn" type="button" style={{ color: "#eb3b60" }}>
                                            <span> 5 Likes</span></button>
                                        <button className="btn comment" type="button" style={{ color: "#eb3b60" }}>
                                            <span style={{ color: "#f9d616" }}> 2 Comments</span></button>
                                    </blockquote>
                                </li>
                                <li className="list-group-item">
                                    <blockquote>
                                        <p>@user Hello World</p>
                                        <button className="btn" type="button" style={{ color: "#eb3b60" }}>
                                            <span> 5 Likes</span></button>
                                        <button className="btn comment" type="button" style={{ color: "#eb3b60" }}>
                                            <span style={{ color: "#f9d616" }}> 2 Comments</span></button>
                                    </blockquote>
                                </li>
                                <li className="list-group-item">
                                    <blockquote>
                                        <p>@user Hello World</p>
                                        <button className="btn" type="button" style={{ color: "#eb3b60" }}>
                                            <span> 5 Likes</span></button>
                                        <button className="btn comment" type="button" style={{ color: "#eb3b60" }}>
                                            <span style={{ color: "#f9d616" }}> 2 Comments</span></button>
                                    </blockquote>
                                </li>
                                <li className="list-group-item">
                                    <blockquote>
                                        <p>@user Hello World</p>
                                        <button className="btn" type="button" style={{ color: "#eb3b60" }}>
                                            <span> 5 Likes</span></button>
                                        <button className="btn comment" type="button" style={{ color: "#eb3b60" }}>
                                            <span style={{ color: "#f9d616" }}> 2 Comments</span></button>
                                    </blockquote>
                                </li>
                            </ul>
                        </div>
                        <div className="col-md-3">
                            {/* <button className="btn" type="button" style={{width:"100%"}.
                                {background-color: "green"},
                                color:"#fff",
                                padding:"16px 32px",
                                margin:"0px 0px 6px",
                                border:none,
                                box-shadow:"none",
                                text-shadow:"none",
                                opacity:"0.9",
                                text-transform:"uppercase",
                                font-weight:"bold",
                                font-size:"13px",
                                letter-spacing:"0.4px",
                                line-height:"1",
                                outline:"none"}>NEW POST</button> */}
                            <ul className="list-group"></ul>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    )
}

export default Profile;