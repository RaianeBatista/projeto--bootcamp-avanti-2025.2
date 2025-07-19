import { CardContent, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

export function UserCard() {
    const [users, setUsers] = useState([]);

    const getUsers = async () => {
        const { data } = await axios.get("http://localhost:8080/usuarios");
        setUsers(data);
    };

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <>
            <Typography variant="h4">Users</Typography>
            <Grid>
                {users.map((user) => (
                    <Grid key={user.id}>
                        <Grid>
                            <CardContent>
                                <Typography>{user.name}</Typography>
                                <Typography>{user.email}</Typography>
                                <Typography>{user.phone}</Typography>
                                <Typography>{user.isAdmin}</Typography>
                            </CardContent>
                        </Grid>
                    </Grid>
                ))}
            </Grid>
        </>
    );
}
