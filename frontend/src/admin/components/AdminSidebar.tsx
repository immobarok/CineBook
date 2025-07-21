import { BadgePlus, LayoutDashboard, ListCollapse, ListFilterPlus } from "lucide-react";
import { NavLink } from "react-router";
import { images } from "../../assets/assets";

const AdminSidebar = () => {
  const user = {
    firstName: "Admin",
    lastName: "User",
    imageUrl: images.popcorn,
  };
  const adminLinks = [
    { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
    { name: "Add Show", path: "/admin/addShow", icon: BadgePlus }, // ✅ fixed
    {
      name: "List Show",
      path: "/admin/listShow", // ✅ fixed
      icon: ListCollapse,
    },
    {
      name: "List Booking",
      path: "/admin/listBooking", // ⚠️ Make sure this route exists in your router config
      icon: ListFilterPlus,
    },
  ];

  return (
    <div className="h-[calc(100vh-64px) md:flex flex-col items-center pt-8 max-w-13 md:max-w-64 w-full border-r border-gray-300/20 text-sm">
      <img
        src={user.imageUrl}
        alt=""
        className="h-9 md:h-14 w-9 md:w-14 rounded-full mx-auto"
      />
      <p className="mt-2 text-base max-md:hidden">
        {user.firstName} {user.lastName}
      </p>
      <div className="w-full">
        {adminLinks.map((link, idx) => (
          <NavLink to={link.path}
            key={idx}
            end
            className={({ isActive }) =>
              `relative flex items-center max-md:justify-center gap-2 w-full py-2.5 min-md:pl-10 first:mt-6 text-gray-400 ${isActive} && ' bg-primary/10 text-primary group`
            }
          >
            {({ isActive }) => (
              <>
                <link.icon className="w-5 h-5" />
                <p className="max-md:hidden">{link.name}</p>
                <span
                  className={`w-1.5 h-10 rounded-1 right-0 absolute ${
                    isActive && "bg-primary"
                  }`}
                ></span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default AdminSidebar;
