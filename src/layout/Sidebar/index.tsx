import clsx from 'clsx';
import { BiHome } from 'react-icons/bi';
import { NavLink, useLocation } from 'react-router-dom';
import * as Tooltip from '@radix-ui/react-tooltip';

export default function Sidebar({ menuAberto }: { menuAberto: boolean }) {
  const menuItems = [
    { icon: <BiHome className="w-5 h-5" />, label: 'Dashboard', path: '/' },
  ];
  const location = useLocation();

  return (
    <ul className="menu p-0.5 gap-1 w-full">
      {menuItems.map((item, index) => {
        const isActive = location.pathname === item.path;
        return (
          <li key={index}>
            <Tooltip.Provider>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <NavLink
                    to={item.path}
                    className={clsx(
                      'flex transition-all duration-300 rounded-md hover:bg-base-300 items-center',
                      menuAberto
                        ? 'px-3 py-2 gap-3 justify-start'
                        : 'px-0 py-3 gap-0 justify-center',
                      isActive && 'bg-base-300 font-semibold'
                    )}
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
                </Tooltip.Trigger>

                {!menuAberto && (
                  <Tooltip.Portal>
                    <Tooltip.Content
                      side="right"
                      align="center"
                      className="px-2 py-1 rounded bg-gray-700 text-white text-xs shadow-lg"
                    >
                      {item.label}
                      <Tooltip.Arrow className="fill-gray-700" />
                    </Tooltip.Content>
                  </Tooltip.Portal>
                )}
              </Tooltip.Root>
            </Tooltip.Provider>
          </li>
        );
      })}
    </ul>
  );
}
