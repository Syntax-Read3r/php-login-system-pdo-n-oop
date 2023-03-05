import React, { useEffect, useState } from "react";
import axiosClient from "../axios-client";

export default function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      getUsers();
    }, []);

    const getUsers = () => {
        setLoading(true);
        try {
            axiosClient
            .get("/users")
            .then(({data}) => {
                setLoading(false); //when the response is received
                console.log(data);
            })
            .catch((e) => {
                setLoading(false);
                console.log('failed to getUsers', e.response.data);
            });
        } catch (error) {
            console.error(error.response.data)
        }
    };

    return <div>Users</div>;
}
