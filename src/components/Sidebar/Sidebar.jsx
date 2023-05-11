import React, { useEffect, useState } from "react";
import "../Sidebar/Sidebar.css";
import { SidebarData } from "../Data/Data";
import Logo from "../Images/logo.png";
import { useNavigate, Link } from "react-router-dom";
import { UilSignOutAlt, UilBars } from "@iconscout/react-unicons";
import { motion } from "framer-motion";
import axios from "axios";
import {BASE_URL} from '../../services/helper'

const Sidebar = () => {
  const [userRole, setUserRole] = useState("");
  const navigate = useNavigate();
  const [selected, setSelected] = useState();
  const [expanded, setExpanded] = useState(true);
  const sidebarVariants = {
    true: {
      left: "0",
    },
    false: {
      left: "-60%",
    },
  };

     
  useEffect(() => {
    // Fetch the user role from the backend API
    const fetchUserRole = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/v1/users/userRole`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setUserRole(response.data.role);
      } catch (error) {
        console.log(error.response.data);
        // TODO: Handle error
      }
    };

    fetchUserRole();
  }, []);

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  const LogoutButton = () => {
    const logout = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("userRole");
      localStorage.removeItem("userId");
      navigate("/");
    };
    return (
      <div className="menuItem" onClick={logout}>
        <UilSignOutAlt />
        <span>Signout</span>
      </div>
    );
  };
  return (
    <>
      <div
        className="bars"
        style={expanded ? { left: "60%" } : { left: "5%" }}
        onClick={() => setExpanded(!expanded)}
      >
        <UilBars />
      </div>
      <motion.div
        className="Sidebar"
        variants={sidebarVariants}
        animate={window.innerWidth <= 768 ? `${expanded}` : ""}
      >
        {/* logo */}
        <div className="logo">
          <img src={Logo} alt="" />
          <span>
            IC<span>T</span>AK
          </span>
        </div>
        {/* menu */}
        <div className="menu">
          {SidebarData.map((item, index) => {
            return (
              <div
                className={selected === index ? "menuItem active" : "menuItem"}
                key={index}
                onClick={() => setSelected(index)}
              >
                <item.icon />
                <Link to={item.file}>
                  <label className="menu_label">{item.heading}</label>
                </Link>
              </div>
            );
          })}
          <LogoutButton/>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
