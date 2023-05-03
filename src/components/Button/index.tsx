import { FC, useState } from 'react'
import { useApprove } from "@/hooks/useApprove"
import Dropdown from '../Dropdown'

interface IInputProps {
    tokenAddress: string,
    spenderAddress: string,
    amountToApprove: string,
    onUserClick: (e: any) => void
}

const Button: FC<IInputProps> = ({ tokenAddress, spenderAddress, amountToApprove, onUserClick }) => {
  const [ isApproved, setIsApproved ] = useState<boolean>(false)
//   const [ ApprovalState, approve ] = useApprove(amountToApprove, spenderAddress)

  return (
    <>
        {isApproved
            ? (
                <div
                    className="w-full p-2 text-center duration-200 rounded bg-green-700"
                >   
                    Approved
                </div>
            )
            : (
                <Dropdown onUserClick={onUserClick} />
            )
        }
    </>
  )
}

export default Button