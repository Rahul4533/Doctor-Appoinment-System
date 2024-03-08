import React from "react";
import '../style/LayOut.css';
import {Badge, message} from  'antd'
import {Link ,useNavigate,useLocation} from 'react-router-dom'
import { useSelector } from "react-redux";
import { AdminMenu, UserMenu } from "../DATA/data";
const LayOut = ({children}) => {
  const {user}=useSelector(state=>state.user);
  
  const navigate=useNavigate();
  const location=useLocation();

//doctor menus

const DoctorMenu = [
  {
    id: 1,
    name: "Home",
    path: "/",
    icon: "fa-solid fa-house",
  },
  {
    id: 2,
    name: "Appomient",
    path: "/doctor-appoinment",
    icon: "fa-solid fa-list",
  },
  
  {
    id: 3,
    name: "Profile",
    path: `/doctor/profile/${user?._id}`,
    icon: "fa-solid fa-user",
  },
  
];

  const ShowMenu=user?.isAdmin?AdminMenu:user?.isDoctor?DoctorMenu:UserMenu;
 
  
  const logout=()=>{
    localStorage.clear();
     message.success('LogOut Success');
     navigate('/login');
  }
  return <>
  <div className="main">
   <div className="layout">
    <div className="sidebar">
    <div className="logo"><h5>DOC APP</h5></div>
    <hr/>
   <div className="menu">
    {ShowMenu.map(menu=>{
      const isactive=location.pathname===menu.path;
     
     return (
      <>
      <div key={menu.id} className={`menu-item ${isactive && 'active'}`}>

        <i className={menu.icon} ></i>
        <Link to={menu.path} >{menu.name}</Link>

      </div>
      
      </>
     )
    })}

<div  className={`menu-item `} onClick={logout}>

<i className="fa-solid fa-right-from-bracket" ></i>
<Link to='/login' >Logout</Link>

</div>

   </div>
    </div>
   

   </div>
   <div className="content" >
   <div className="header" style={{backgroundColor:'#F5F5F5'}}>
    <div className="header-content" style={{cursor:'pointer'}}>
   
    <Badge count={ user?.notification.length} onClick={()=>{navigate('/notification')}}>
    <i className="fa-solid fa-bell" />
    </Badge>
   <Link to='/profile'>{user?.name}</Link>
    </div>
   
   </div>
   <div className="body" style={{backgroundColor:'#FFFACD'}}>{children}</div>

   </div>

  </div>
  </>;
};

export default LayOut;
