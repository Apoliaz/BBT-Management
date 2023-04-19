import { React, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import '../assets/style/timesheet.css';
// import TimeSheetInfo from '../components/sheet/ta_info';
// import TimeSheetTable from '../components/sheet/ta_table';
// import UserTimeSheet from '../components/sheet/us_timesheet';
import Content from '../components/sheet/timesheet_content';
import IpContext from '../ipContext';


function TimeSheet() {

    const ip = useContext(IpContext);
    const [isTypeid, setTypeid] = useState('')

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.post("http://"+ ip +":5000/session", {
            token: token
        }, {crossdomain: true})
        .then(response => {
            if (response.data.user_id) {
                setTypeid(response.data.type_id)
            } 
            else {
                setTypeid(0)
                localStorage.removeItem('token')
                window.location.href ='/login'
            }
        });
    }, [ip]);


    if (isTypeid === 1) {
        return (
            <>
                <div className='container'>
                    <Content ip={ip} isTypeid={isTypeid}/>
                </div>
            </>
        )
    } else if (isTypeid === 0) {
        return (
            <>
                {
                    window.location.href ='/'
                }
            </>
        )
    }
}

export default TimeSheet;