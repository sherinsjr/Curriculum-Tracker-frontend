import React, { useEffect, useState, } from 'react'
import '../Sidebar/Sidebar.css'
import {SidebarData} from '../Data/Data'
import Logo from '../Images/logo.png'
import { useNavigate, Link } from 'react-router-dom'
import {UilSignOutAlt,UilBars } from '@iconscout/react-unicons'
import {motion} from 'framer-motion'
import axios from 'axios'

const Sidebar = () => {
    const navigate = useNavigate
    const [selected,setSelected] = useState();
    const [ expanded, setExpanded] = useState(true);
    const sidebarVariants = {
        true:{
            left:'0',
        },
        false:{
            left:'-60%'
        }
    }
    useEffect(()=>{
        var token = sessionStorage.getItem("")  //?!write tocken
        const TokenData = 
        {
            "token": token
        }
        axios.post('',
        TokenData
        ).then((response)=>{
            if (response.data.status === "Unauthorised user") {
                
            }
        })
    })

    const logout = () =>{
        localStorage.removeItem('');
        localStorage.removeItem('');
        localStorage.removeItem('');
        navigate('')
    }
  return (
    <>
            <div className='bars' style={expanded ? { left: '60%' } : { left: '5%' }}

                onClick={() => setExpanded(!expanded)}
            >
                <UilBars />
            </div>
            <motion.div className='Sidebar'
                variants={sidebarVariants}
                animate={window.innerWidth <= 768 ? `${expanded}` : ''}


            >

                {/* logo */}
                <div className='logo'>
                    <img src={Logo} alt='' />
                    <span>
                        IC<span>T</span>AK
                    </span>
                </div>
                {/* menu */}
                <div className='menu'>
                    {SidebarData.map((item, index) => {
                        return (

                            <div className={selected === index ? 'menuItem active' : 'menuItem'}
                                key={index}
                                onClick={() => setSelected(index)}
                            >
                                <item.icon />
                                <Link to={item.file}>
                                    <label className='menu_label'>
                                        {item.heading}

                                    </label></Link>
                            </div>
                        )
                    })}
                    <div className='menuItem' onClick={logout}>
                        <UilSignOutAlt />
                        <span >Signout</span>
                    </div>
                </div>
            </motion.div>
        </>
  )
}

export default Sidebar