import { Layout, Menu, Typography } from "antd";
import { MdOutlineDashboard, MdOutlinePhone } from "react-icons/md";
import { CiSquareInfo } from "react-icons/ci";
import { IoBookOutline } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import LogoSm from "../../../public/favicon-32x32.png";
import "./sidebar.scss";
import { BiBook, BiUser } from "react-icons/bi";
import { BsNewspaper } from "react-icons/bs";
const { Sider } = Layout;
const { Text } = Typography;
export default function SideBar({ collapsed }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = ({ key }) => {
    navigate(key);
  };

  return (
    <Sider
      theme="light"
      trigger={null}
      collapsible
      collapsed={collapsed}
      id="sidebarSider"
    >
      <div className="logo">
        <img src={LogoSm} />
      </div>

      <Menu
        id="menue"
        theme="dark"
        mode="inline"
        defaultSelectedKeys={[location.pathname]}
        onClick={handleNavigation}
        items={[
          {
            key: "/",
            icon: <MdOutlineDashboard size={20} />,
            label: "Dashboard",
          },
          {
            key: "/about",
            icon: <CiSquareInfo size={20} />,
            label: "About Us",
          },
          {
            key: "/contact",
            icon: <MdOutlinePhone size={20} />,
            label: "Contact Us",
          },
          {
            key: "/courses",
            icon: <IoBookOutline size={20} />,
            label: "Modules",
          },
          {
            key: "/profile",
            icon: <BiUser size={20} />,
            label: "Profile",
          },
          {
            key: "/registrations",
            icon: <BiBook size={20} />,
            label: "My Registrations",
          },
          // {
          //   key: "/news",
          //   icon: <BsNewspaper size={20} />,
          //   label: "News",
          // },
        ]}
      />
    </Sider>
  );
}
