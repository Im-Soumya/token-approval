import { FC, useState } from 'react'
import Input from '../Input'
import Button from '../Button'

const Hero: FC = () => {
  const [ tokenAddress, setTokenAddress ] = useState<string>("")
  const [ spenderAddress, setSpenderAddress ] = useState<string>("")
  const [ amount, setAmount ] = useState<string>("")

  const isFormValid = tokenAddress !== "" && spenderAddress !== "" && amount !== ""

  return (
    <div className='w-full md:w-2/3 lg:w-1/2 border-1 border-neutral-900 p-7 rounded'>
      <div className='flex flex-col gap-4'>
        <Input type="text" value={tokenAddress} placeholder={"Token Address"} onUserInput={setTokenAddress} />
        <Input type="text" value={spenderAddress} placeholder={"Spender Address"} onUserInput={setSpenderAddress} />
        <Input type="number" value={amount} placeholder={"Allowance Amount"} onUserInput={setAmount} />
        {isFormValid &&
          <Button tokenAddress={tokenAddress} spenderAddress={spenderAddress} amountToApprove={amount} />
        }
      </div>
    </div>
  )
}

export default Hero