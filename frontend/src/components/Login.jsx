import React from "react";
import './Form.css';

function Login() {
    return (
        <section className="loginPage">
            <div className="container box">
                <form action="/login" className="form" id="form" method="POST">

                    <div className="form-control">
                        <label for="">Email</label>
                        <input type="email" name="username" placeholder="Enter Email" id="email" />
                        <small>Error message</small>
                    </div>

                    <div className="form-control">
                        <label for="">Password</label>
                        <input type="password" id="password" name="password" placeholder="Enter Password" />
                        <small>Error message</small>
                    </div>
                    {/* Eye Icon */}
                    <span className="show-pass">
                        <i className="fas fa-eye" id="eye"></i>
                    </span>

                    <button>Log In</button>
                    <a className="btn btn-light btn-lg" href="/register" role="button" id="register-btn">Register</a>

                </form>
            </div>
        </section>
    );
}

export default Login;