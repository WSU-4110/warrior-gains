import React from "react";
import './Form.css';


function Register() {
    return (
        <section className="registrationPage">
            <div className="container box">
                <form action="/register" className="form" id="form" method="POST">
                    <h2>Join Warrior Gains!</h2>

                    <div className="form-control">
                        <label for="">First Name</label>
                        <input type="text" name="fname" placeholder="First Name" id="fname" />
                        <small>Error message</small>
                    </div>

                    <div className="form-control">
                        <label for="">Last Name</label>
                        <input type="text" name="lname" placeholder="Last Name" id="lname" />
                        <small>Error message</small>
                    </div>

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

                    <div className="form-control">
                        <label for="">Confirm Password</label>
                        <input type="password" placeholder="Re-enter Password" id="password2" />
                        <small>Error message</small>
                    </div>

                    <div className="form-control">
                        <label for="">Date of Birth</label>
                        <input type="date" name="dob" placeholder="Enter Date of Birth" id="dob" />
                        <small>Error message</small>
                    </div>

                    {/* Eye Icon */}
                    <span className="show-pass">
                        <i className="fas fa-eye" id="eye"></i>
                    </span>

                    {/* Progress Bar */}
                    <div className="progress">
                        <div className="progress-bar" id="password-strength"></div>
                    </div>

                    {/* List */}
                    <ul className="form-list">
                        <li>
                            <span className="low-upper-case">
                                <i className="fas fa-circle"></i>
                                &nbsp; Lowercase & Uppercase
                            </span>
                        </li>
                        <li>
                            <span className="number">
                                <i className="fas fa-circle"></i>
                                &nbsp; Number (0-9)
                            </span>
                        </li>
                        <li>
                            <span className="special-char">
                                <i className="fas fa-circle"></i>
                                &nbsp; Special Character (!@#$%^&*)
                            </span>
                        </li>
                        <li>
                            <span className="eight-char">
                                <i className="fas fa-circle"></i>
                                &nbsp; At least 8 Character
                            </span>
                        </li>
                    </ul>


                    <button>Submit</button>
                </form>
            </div>
        </section>
    );
}

export default Register;