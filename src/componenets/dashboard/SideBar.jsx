import { NavLink } from "react-router-dom";
import "../../styles/sidebar.css";
import dashboardIcon from "../../images/dashboard.svg";
import groupIcon from "../../images/group.svg";
import expensesIcon from "../../images/expenses.svg";
import activityIcon from "../../images/activity.svg";
import settingIcon from "../../images/setting.svg";
import logoutIcon from "../../images/logout.svg";

const links = [
  { to: "/dashboard", label: "Dashboard", icon: dashboardIcon, end: true },
  { to: "/groups", label: "Group", icon: groupIcon },
  { to: "/dashboard/expenses", label: "Expenses", icon: expensesIcon },
  { to: "/dashboard/activity", label: "Activity", icon: activityIcon },
  { to: "/dashboard/setting", label: "Setting", icon: settingIcon },
  { to: "/logout", label: "Logout", icon: logoutIcon, variant: "danger" },
];

export default function SideBar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-nav" aria-label="Dashboard navigation">
        {links.map((link) => (
          <NavLink
            className={({ isActive }) =>
              [
                "sidebar-link",
                isActive ? "sidebar-link-active" : "",
                link.variant ? `sidebar-link-${link.variant}` : "",
              ]
                .filter(Boolean)
                .join(" ")
            }
            to={link.to}
            end={link.end}
            key={link.to}
          >
            <span
              className="sidebar-icon"
              style={{ "--sidebar-icon": `url(${link.icon})` }}
              aria-hidden="true"
            />
            <span>{link.label}</span>
          </NavLink>
        ))}
      </div>
    </aside>
  );
}
