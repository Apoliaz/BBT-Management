import { React, useState, useEffect } from 'react';
import axios from 'axios';
import sc from '../../assets/icon/sand-clock.png';
import cl from '../../assets/icon/checked.png';


function LeaveTable(props) {

    const ip = props.data[0];
    const upDate = props.data[1];
    const setUpdate = props.data[2];

    const [leavepen, setLeavepen] = useState([]);
    const [leaveapp, setLeaveapp] = useState([]);

    const getApi = async() => {
        await axios.get("http://"+ ip +":5000/leavepending", {crossdomain: true})
        .then(response => {
            setLeavepen(response.data);
        });

        await axios.get("http://"+ ip +":5000/leaveapprove", {crossdomain: true})
        .then(response => {
            setLeaveapp(response.data);
        });
    };

    useEffect(() => {
        getApi();
    }, [upDate]);

    const getApprove = async(event) => {
        const leaveId = event.target.id.split(" ");
        await axios.put("http://"+ ip +":5000/update_leave", 
        {   id: leaveId[0],
            date: leaveId[1],
            state: leaveId[4]
        }).then(
            setLeavepen(upValue => {
                return upValue.filter(leavepen => leavepen.emp_id !== leaveId[0] && leavepen.leave_date !== leaveId[1])
            })
        ).then(
            setUpdate(!upDate)
        );
    };

    const getCancel = async(event) => {
        const leaveId = event.target.id.split(" ");
        await axios.put("http://"+ ip +":5000/update_leave", 
        {   id: leaveId[0],
            date: leaveId[1],
            state: '0'
        }).then(
            setLeaveapp(upValue => {
                return upValue.filter(leaveapp => leaveapp.emp_id !== leaveId[0] && leaveapp.leave_date !== leaveId[1])
            })
        ).then(
            setUpdate(!upDate)
        );
    };


    return (
        <>
            <div className='box-body le-body'>
                <div className='le-box-header'>
                    <img src={sc} alt=''/>
                    <label>รอการอนุมัติ</label>
                </div>
                <div className='le-box-content'>
                    <div className='le-header'>
                        <p className='left'>รหัส</p>
                        <p className='center'>วันที่</p>
                        <p className='center'>ประเภท</p>
                        <p>เหตุผลการลา</p>
                        <p className='center'></p>
                        <p className='center'></p>
                    </div>
                    <div className='le-content'>
                        {
                            leavepen.map((item, index) => (
                                <div className='le-content-time' key={index}>
                                    <p className="left">{item.emp_id}</p>
                                    <p className="center">{item.leave_date}</p>
                                    <p className="center">{item.leave_type}</p>
                                    <p>{item.leave_description}</p>
                                    <div className="center">
                                        <button className='approve' 
                                                id={item.emp_id + " " + 
                                                    item.leave_date + " " +
                                                    item.leave_type + " " + 
                                                    item.leave_description + " " + 
                                                    "1"} 
                                                onClick={getApprove}>อนุมัติ
                                        </button>
                                    </div>
                                    <div className="center">
                                        <button className='cancel' 
                                                id={item.emp_id + " " + 
                                                    item.leave_date + " " +
                                                    item.leave_type + " " + 
                                                    item.leave_description + " " + 
                                                    "2"} 
                                                onClick={getApprove}>ไม่อนุมัติ
                                        </button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className='box-body le-body'>
                <div className='le-box-header'>
                    <img src={cl} alt=''/>
                    <label>ผลการอนุมัติ</label>
                </div>
                <div className='le-box-content'>
                    <div className='le-header'>
                        <p className='left'>รหัส</p>
                        <p className='center'>วันที่</p>
                        <p className='center'>ประเภท</p>
                        <p>เหตุผลการลา</p>
                        <p className='center'>สถานะ</p>
                        <p className='center'></p>
                    </div>
                    <div className='le-content'>
                        {
                         leaveapp.map((item, index) => (
                            <div className='le-content-time' key={index}>
                                <p className="left">{item.emp_id}</p>
                                <p className="center">{item.leave_date}</p>
                                <p className="center">{item.leave_type}</p>
                                <p>{item.leave_description}</p>
                                <p className="center">{item.leave_appove}</p>
                                <div className="center">
                                        <button className='cancel' 
                                                id={item.emp_id + " " + 
                                                    item.leave_date + " " +
                                                    item.leave_type + " " + 
                                                    item.leave_description
                                                }onClick={getCancel}>ยกเลิก
                                        </button>
                                    </div>
                            </div>
                        ))
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default LeaveTable;