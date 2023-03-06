import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function UserForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    const {setNotification} = useStateContext()
    const [user, setUser] = useState({
        id: null,
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    if (id) {
        useEffect(() => {
            setLoading(true);
            axiosClient
                .get(`/users/${id}`)
                .then(({ data }) => {
                    setLoading(false);
                    setUser(data);
                })
                .catch((e) => {
                    setLoading(false);
                    console.log(e);
                });
        }, []);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if (user.id) {
            console.log('i m here 1');

            axiosClient
                .put(`/users/${user.id}`, user)
                .then(() => {
                    //TODO show notification
                    setNotification('User was successfully updated')
                    navigate("/users");
                })
                .catch((error) => {
                    console.error('empty',error);
                    console.log('failed to reach if and update', error);
                    // const response = error.response;
                    // if (response && response.status === 422) {
                    //     console.log('failed to update',response.data.errors);
                    //     setErrors(response.data.errors);
                    // }
                });
        } else {
            console.log('i m here 2');
            axiosClient
            .post(`/users`, user)
            .then(() => {
                //TODO show notification
                setNotification('User was successfully created')
                navigate("/users");
            })
            .catch((error) => {
                const response = error.response;
                if (response && response.status === 422) {
                    console.log('failed to create',response.data.errors);

                    setErrors(response.data.errors);
                }
            });
        }
    };
    return (
        <>
            {user.id && <h1>Update User: {user.name}</h1>}
            {!user.id && <h1>New User</h1>}
            <div className="card animated fadeInDown">
                {loading && <div className="text-center">Loading...</div>}
                {errors && (
                    <div className="alert">
                        {Object.keys(errors).map((key) => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div>
                )}

                {/* create form  */}
                {!loading && (
                    <form onSubmit={onSubmit}>
                        <input
                            onChange={(e) =>
                                setUser({ ...user, name: e.target.value })
                            }
                            value={user.name}
                            type="text"
                            placeholder="Name"
                        />
                        <input
                            onChange={(e) =>
                                setUser({ ...user, email: e.target.value })
                            }
                            value={user.email}
                            type="email"
                            placeholder="Email"
                        />
                        <input
                            onChange={(e) =>
                                setUser({ ...user, password: e.target.value })
                            }
                            type="password"
                            placeholder="Password"
                        />
                        <input
                            onChange={(e) =>
                                setUser({
                                    ...user,
                                    password_confirmation: e.target.value,
                                })
                            }
                            type="password"
                            placeholder="Password Confirmation"
                        />
                        <button className="btn">Save</button>
                    </form>
                )}
            </div>
        </>
    );
}
