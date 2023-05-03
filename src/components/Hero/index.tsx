import { FC, useState } from 'react'
// import { approve } from "@/hooks/useApprove"
import Input from '../Input'
import Button from '../Button'
import { useTokenContract } from '@/hooks/useTokenContract'
import { useMoralis, useWeb3Contract } from 'react-moralis'
import { ERC20_ABI } from '../../../constants/abis/erc20'
import { getAllowance } from '@/functions/getAllowance'
import { useApprove } from '@/hooks/useApprove'

const Hero: FC = () => {
  const [ tokenAddress, setTokenAddress ] = useState<string>("")
  const [ spenderAddress, setSpenderAddress ] = useState<string>("")
  const [ amount, setAmount ] = useState<string>("")
  const [ allowance, setAllowance ] = useState<any>()
  const [ isOpen, setIsOpen ] = useState(true)

  const { account, web3 } = useMoralis()

  const { runContractFunction: getTokenAllowance } = useWeb3Contract({
    contractAddress: tokenAddress,
    abi: ERC20_ABI,
    functionName: "allowance",
    params: { account, spenderAddress }
  })

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    // if(!tokenAddress || !spenderAddress || !amount) {
    //   alert("Please enter all the details...")
    //   return
    // }
    // // approve()
    // console.log("Form submitted")
    
    const token = useTokenContract(tokenAddress, web3!, account!)
    console.log(token)
    
    const allowance = await getTokenAllowance()
    // const [ approvalState, approve ] = useApprove(account!, tokenAddress, amount, spenderAddress, currentAllowance, web3)
  }

  return (
    <div className='w-full md:w-2/3 lg:w-1/2 border-1 border-neutral-900 p-7 rounded'>
      <form onSubmit={(e) => handleSubmit(e)}  className='flex flex-col gap-4'>
        <Input value={tokenAddress} placeholder={"Token Address"} onUserInput={setTokenAddress} />
        <Input value={spenderAddress} placeholder={"Spender Address"} onUserInput={setSpenderAddress} />
        <Input value={amount} placeholder={"Allowance Amount"} onUserInput={setAmount} />
        <Button tokenAddress={tokenAddress} spenderAddress={spenderAddress} amountToApprove={amount} onUserClick={(e) => handleSubmit(e)} />
      </form>
    </div>
  )
}

export default Hero