import { useState, useEffect, useMemo } from 'react'
import { ethers } from 'ethers'
import { ERC20_ABI } from '../../constants/abis/erc20'

export enum ApprovalState {
    NOT_APPROVED = 'NOT_APPROVED',
    APPROVED = 'APPROVED',
}

export function useApprove(tokenAddress: string | undefined, spenderAddress: string | undefined, amountToApprove: string | undefined) {
  const [ currentAllowance, setCurrentAllowance ] = useState<string>("")
  const [ isApproved, setIsApproved ] = useState<boolean>()

  useEffect(() => {
    const fetchAllowance = async () => {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const tokenContract = new ethers.Contract(tokenAddress!, ERC20_ABI, signer)

        const allowance = await tokenContract.allowance(await signer.getAddress(), spenderAddress)
        setCurrentAllowance(allowance.toString())
      } catch (error) {
        console.error(error)
        setCurrentAllowance("")
      }
    }

    if (tokenAddress && spenderAddress) {
      fetchAllowance()
      if(currentAllowance < amountToApprove!) {
        setIsApproved(false)
      } else {
        setIsApproved(true)
      }
    } else {
      setCurrentAllowance("")
    }
  }, [tokenAddress, spenderAddress])


  
  return [ isApproved, currentAllowance ]
}