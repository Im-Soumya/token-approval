import { FC, useEffect, useState } from 'react'
import { ethers, BigNumber } from "ethers"
import { Menu, Transition } from '@headlessui/react'

import { ArrowIcon } from '../Icons'
import { useWeb3Contract } from 'react-moralis'
import { ERC20_ABI } from '../../../constants/abis/erc20'

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
}

interface IInputProps {
  tokenAddress: string,
  spenderAddress: string,
  amountToApprove: string
}

const Dropdown: FC<IInputProps> = ({ tokenAddress, spenderAddress, amountToApprove }) => {
  const [ amount, setAmount ] = useState<BigNumber>()

  useEffect(() => {
    if(amountToApprove) {
      const amount = ethers.utils.parseEther(amountToApprove)
      setAmount(amount)
    }
  }, [amountToApprove])
  
  const maxAmount = ethers.constants.MaxUint256

  const { runContractFunction: approveOnce } = useWeb3Contract({
    contractAddress: tokenAddress,
    abi: ERC20_ABI,
    functionName: "approve",
    params: { spenderAddress, amount }
  })

  const { runContractFunction: approveUnlimited } = useWeb3Contract({
    contractAddress: tokenAddress,
    abi: ERC20_ABI,
    functionName: "approve",
    params: { spenderAddress, maxAmount }
  })

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
                onClick={async () => await approveOnce()}
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
                onClick={async () => await approveUnlimited()}
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

