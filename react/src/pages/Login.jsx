import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";

export default function login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [errors, setErrors] = useState();
    const { setUser, setToken } = useStateContext();

    const onSubmit = (e) => {
        e.preventDefault();

        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };
        axiosClient
            .post("/login", payload)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
            })
            .catch((error) => {
                const response = error.response;

                // 422 is a validation error
                if (response && response.status === 422) {
                    if(response.data.errors) {
                        setErrors(response.data.errors)
                    } else {
                        setErrors({
                            email: [response.data.message],
                        })
                    }
                }
            });
    };

    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form onSubmit={onSubmit}>
                    <h1 className="title">Login into your</h1>

                    {/* display errors on screen if errors is true */}
                    {/* errors to be displayed if error is set */}
                    {errors && (
                        <div className="alert">
                            {Object.keys(errors).map((key) => (
                                <p key={key}>{errors[key][0]}</p>
                            ))}
                        </div>
                    )}

                    <input ref={emailRef} type="email" placeholder="Email..." />
                    <input
                        ref={passwordRef}
                        type="password"
                        placeholder="Password..."
                    />
                    <button className="btn btn-block">Login</button>
                    <p className="message">
                        Not Regestired?{" "}
                        <Link to="/signup">Create an account</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
