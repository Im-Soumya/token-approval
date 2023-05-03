import { FC } from 'react'
import { Menu, Transition } from '@headlessui/react'

import { ArrowIcon } from '../Icons'

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
  }

interface IInputProps {
  onUserClick: (e: any) => void
}

const Dropdown: FC<IInputProps> = ({ onUserClick }) => {
  return (
    <Menu as="div">
      <Menu.Button as="button" className="w-full py-2 px-4 rounded bg-blue-600 hover:bg-blue-700 duration-200 flex items-center">Approve <ArrowIcon /></Menu.Button>
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-100 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Menu.Items className="flex flex-col bg-blue-600 rounded mt-3 ">
            <Menu.Item>
                {({ active }) => (
                    <a
                      className={classNames(
                        active ? 'bg-blue-700 rounded-t duration-200' : '',
                        'px-4 py-2 cursor-pointer'
                      )}
                      onClick={onUserClick}
                    >
                      Approve one-time
                    </a>
                )}
            </Menu.Item>
            <Menu.Item>
                {({ active }) => (
                <a
                  className={classNames(
                    active ? 'bg-blue-700 rounded-t duration-200' : '',
                    'px-4 py-2 cursor-pointer'
                  )}
                  onClick={onUserClick}
                >
                  Approve unlimited
                </a>
                )}
            </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default Dropdown

