import React from 'react'
import { Link } from 'react-router-dom'
import {AlignRightOutlined,CloseOutlined,PieChartOutlined,PoweroffOutlined,InboxOutlined,LayoutOutlined,UserOutlined,FileOutlined,SettingOutlined} from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux';
import { doLogout, getCurrentUser } from 'store/slices/authSlice';

import {
    StyledButton,
  } from 'styles/overrides';
export default function Nav() {
    const dispatch = useDispatch();
    const currentUser = useSelector(getCurrentUser);

    function handleClickMenu() {
        document.querySelector('.navbar').style.display ="block" 
    }
    function handleClickMenuClose() {
        document.querySelector('.navbar').style.display ="none" 
    } 
    
  return (

    <nav >
    <div >
        <AlignRightOutlined id='iconMenuOpen' style={{ fontSize: '30px' }} onClick={handleClickMenu}/>
      <div class="navbar">
        
        <ul >
            <CloseOutlined id='iconMenuClose' style={{ fontSize: '25px' }} onClick={handleClickMenuClose}/>
            
            <li class="nav-item">
                <Link to='/dashboard'><PieChartOutlined /> Dashboard</Link>
            </li>
            <li class="nav-item">
                <Link to='/orders'><InboxOutlined /> Orders</Link>
            </li>
            <li class="nav-item">
                <Link to='/products'><LayoutOutlined /> Products</Link>
            </li>
            <li>
                <Link to='/users'><UserOutlined /> Users</Link>
            </li>
            <li>
                <Link to='/logs'><FileOutlined /> Logs</Link>
            </li>
            <li>
                <Link to='/settings'><SettingOutlined /> Settings</Link>
            </li>
            <li>
                <StyledButton
                    id='logout'
                    type="text"
                    style={{ fontSize: 16, fontWeight: 400, color: 'black' ,display:'flex',margin:'auto',marginLeft:'42px'}}
                    onClick={() => dispatch(doLogout())}
                    icon={<PoweroffOutlined />}
                >
                    Logout
                </StyledButton>
                
            </li>
        </ul>
      </div>
    </div>
    </nav>
  )
}
