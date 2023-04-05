import { React, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import SideBar from './sidebar';
import logo from '../assets/icon/time-management.png';
import IpContext from '../ipContext';


function NavBar() {

    const ip = useContext(IpContext);
    const [isWidth, setWidth] = useState({width: 0});
    const [isResponsive, setResponsive] = useState(0);
    const [isTypeid, setTypeid] = useState(0)
    const [isUserName, setUsername] = useState('')
    const [isUsertype, setUsertype] = useState('')

    useEffect(() => {

        switch(isWidth.width) {
            case 10:
                setResponsive(0);
                break;
            case 8:
                setResponsive(1);
                break;
            case 4:
                setResponsive(2);
                break;
            default:
          }

      }, [isWidth]);

    useEffect(() => {

        function handleResize() {
            setWidth({width: Math.round(window.innerWidth / 100)});
        }
    
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
      }, []);

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.post("http://"+ ip +":5000/session", {
            token: token
        })
        .then(response => {
            if (response.data.user_id) {
                setTypeid(response.data.type_id)
                setUsername(response.data.user_name)
                setUsertype(response.data.user_type)
            }
        });
    }, []);

    console.log('Nav ' + isResponsive)

    return (
        <>  
            {
                isTypeid === 0 ? '' :
            [<nav className='navbar' key='1'>
                <div className='nav-container'>
                    <div className='left-box'>
                        {/* <img src={logo} alt=''></img>
                        <label className='home-menu'>BBTE Management</label> */}
                    </div>
                    <div className='right-box'>
                        <label style={isResponsive > 0 ? {display: 'none'} : {display: 'flex'}}>
                            <p>{isUserName}</p>
                            <p>{isUsertype}</p>
                        </label>
                    </div>
                </div>
            </nav>,
            <SideBar key='2' data={[isTypeid, isResponsive]}/>]
            }

            {/* <div className='container'>
            {
                isTypeid === 0 ? 
                '' :
                <div><SideBar isTypeid={isTypeid}/></div> 
            }
                <div className='content'>
                    <div className='main-content' key=''>{children}</div>
                </div>
            </div>
            <footer></footer> */}
        </>
    );
};

export default NavBar;