import { FC } from 'react'
import Dropdown from '../Dropdown'
import { ApprovalState, useApprove } from '@/hooks/useApprove'

interface IInputProps {
    tokenAddress?: string,
    spenderAddress?: string,
    amountToApprove?: string,
}

const Button: FC<IInputProps> = ({ tokenAddress, spenderAddress, amountToApprove }) => {
  const [ isApproved ] = useApprove(tokenAddress, spenderAddress, amountToApprove)

    if(isApproved) {
        return (
            <>
                <div
                    className="w-full p-2 text-center duration-200 rounded bg-green-700"
                >   
                    Approved
                </div>
            </>
        )
    } else {
        return (
            <>
                <Dropdown tokenAddress={tokenAddress!} spenderAddress={spenderAddress!} amountToApprove={amountToApprove!} />
            </>
        )
    }

    return (
        <></>
    )
}

export default Button