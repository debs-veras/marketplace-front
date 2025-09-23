import clsx from 'clsx';
import { BiHome } from 'react-icons/bi';
import { NavLink } from 'react-router-dom';

export default function Sidebar({ menuAberto }: { menuAberto: boolean }) {
  const menuItems = [
    { icon: <BiHome className="w-5 h-5" />, label: 'Dashboard', path: '/' },
  ];

  return (
    <ul className="menu p-0.5 gap-1 w-full">
      {menuItems.map((item, index) => (
        <li key={index}>
          <NavLink
            to={item.path}
            className={({ isActive }) =>
              clsx(
                'flex transition-all duration-300 rounded-md hover:bg-base-300 items-center',
                menuAberto
                  ? 'px-3 py-2 gap-3 justify-start'
                  : 'px-0 py-3 gap-0 justify-center',
                isActive && 'bg-base-300 font-semibold'
              )
            }
          >
            <div className="flex-shrink-0">{item.icon}</div>
            <span
              className={clsx(
                'whitespace-nowrap transition-all duration-300',
                menuAberto
                  ? 'opacity-100 w-auto ml-1'
                  : 'opacity-0 w-0 h-0 overflow-hidden'
              )}
            >
              {item.label}
            </span>
          </NavLink>
        </li>
      ))}
    </ul>
  );
}
