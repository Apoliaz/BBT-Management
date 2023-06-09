import { React, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import user from '../assets/icon/users.png';
import lock from '../assets/icon/lock.png';
import '../assets/style/login.css';
import IpContext from '../ipContext';

import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';


function Login() {

    const ip = useContext(IpContext);

    const [isAlert, setAlert] = useState(false)

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const getLogin = () => {
        axios.post("http://"+ ip +":5000/login", {
            username: username,
            password: password
        }, 
        {crossdomain: true})
        .then(response => {
            if(response.data[0][0].emp_id){
                localStorage.setItem('token', response.data[1].token)
                window.location = '/';
            } else if(response.data[0] === 'Incorrect Username and/or Password!') {
                setAlert(true);
            }
        });
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.post("http://"+ ip +":5000/session", {
            token: token
        }, {crossdomain: true})
        .then(response => {
            if (response.data.user_id) {
                window.location = '/';
            } 
        });
    }, [ip]);

    return (
        <>
            <div className="login-container">
                <Box sx={{width: '30%'}}>
                    <Collapse in={isAlert}>
                        <Alert
                        severity="error"
                        action={
                            <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setAlert(false);
                            }}
                            >
                            <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                        sx={{ mb: 2 }}
                        >
                        ชื่อผู้ใช้ หรือ รหัสผ่าน ไม่ถูกต้อง !
                        </Alert>
                    </Collapse>
                </Box>
                <div className="loginBx">
                    <div className="login-form">
                        <div className="login-titleBx">
                            <div className="login-title-styleBx"></div>
                            <span>เข้าสู่ระบบ</span>
                            <div className="login-title-styleBx"></div>
                        </div>
                        <div className="login-inputBx">
                            <img src={user} alt=""/>
                            <input type="text" onChange={(event => {setUsername(event.target.value)})} placeholder="ชื่อผู้ใช้"/ >
                        </div>
                        <div className="login-inputBx">
                            <img src={lock} alt=""/>
                            <input type="password" onChange={(event => {setPassword(event.target.value)})} placeholder="รหัสผ่าน"/>
                        </div>
                        <div className="login-inputBx">
                            <input type="submit" value="เข้าสู่ระบบ" onClick={getLogin}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
