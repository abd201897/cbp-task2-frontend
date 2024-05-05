import { Avatar, Button, Dropdown, Flex, Layout, Typography } from "antd";
import { IoMdArrowDropdown } from "react-icons/io";
import { useAuth } from "../../core/store/authContext";
import "./navbar.scss";

import {
  RiLogoutBoxRLine,
  RiMenuFoldFill,
  RiMenuUnfoldFill,
  RiSettings5Line,
  RiUser3Line,
} from "react-icons/ri";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
const { Header } = Layout;
const { Text } = Typography;
const menues = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "About Us",
    href: "/about",
  },
  {
    title: "Contact Us",
    href: "/contact",
  },
  {
    title: "Modules",
    href: "/courses",
  },
];

const Navbar = ({ menuState }) => {
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = menuState || [false, () => {}];
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const items = [
    {
      key: "1",
      type: "group",
      label: `Welcome ${user?.username}`,
      children: [
        {
          key: "1-1",
          label: "Profile",
          icon: <RiUser3Line color="#2255A6" size={20} />,
          onClick: () => {
            navigate("/profile");
          },
        },
        {
          type: "divider",
        },
        // {
        //   key: "1-4",
        //   label: "Settings",
        //   icon: <RiSettings5Line color="#2255A6" size={20} />,
        // },
        {
          key: "1-5",
          label: "Logout",
          icon: <RiLogoutBoxRLine color="red" size={20} />,
          danger: true,
          onClick: () => {
            logout();
            navigate("/login");
          },
        },
      ],
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Header id="header" className={isScrolled ? "scrolledNav" : ""}>
      {user ? (
        <Button
          type="text"
          icon={
            collapsed ? (
              <RiMenuUnfoldFill size={25} color="#fff" />
            ) : (
              <RiMenuFoldFill size={25} color="#fff" />
            )
          }
          onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: "16px",
            width: 64,
            height: 64,
          }}
        />
      ) : (
        <Flex className="logo">
          <Link to="/">Cloud Base Project</Link>
        </Flex>
      )}
      <Flex gap={20} wrap="wrap" id="menues">
        {menues.map((menu) => (
          <NavLink className="link" key={menu.title} to={menu.href}>
            {menu.title}
          </NavLink>
        ))}
      </Flex>
      {user ? (
        <Dropdown menu={{ items }} placement="bottomLeft" trigger={["click"]}>
          <Flex
            align="center"
            justify="center"
            wrap="wrap"
            gap={10}
            className="rightGroup"
          >
            <Avatar shape="square" size="large" icon={<RiUser3Line />} />
            <Text color="#fff" className="username">
              {user?.token?.username}
            </Text>
            <IoMdArrowDropdown size={20} />
          </Flex>
        </Dropdown>
      ) : (
        <div className="navBtns">
          <Button onClick={() => navigate("/login")}>
            <Link to="/login">Login</Link>
          </Button>
          <Button onClick={() => navigate("/register")}>
            <Link to="/register">Register</Link>
          </Button>
        </div>
      )}
    </Header>
  );
};

export default Navbar;
