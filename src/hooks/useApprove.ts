import { ethers } from "ethers"
import { useCallback, useMemo } from "react"
import { ERC20_ABI } from "../../constants/abis/erc20"
import { getContract } from "@/functions/getContract"

export enum ApprovalState {
    UNKNOWN = "UNKNOWN",
    NOT_APPROVED = "NOT_APPROVED",
    PENDING = "PENDING",
    APPROVED = "APPROVED",
}

export const useApprove = (account: string, tokenAddress: string, spender: string, amountToApprove: string, currentAllowance: any, web3: ethers.providers.Web3Provider) : [ ApprovalState, Promise<void> ] => {
    const contract = getContract(tokenAddress, ERC20_ABI, web3, account)

    const approvalState = useMemo(() => {
        if(!amountToApprove || !spender) return ApprovalState.UNKNOWN
        if(!currentAllowance) return ApprovalState.UNKNOWN

        return currentAllowance < amountToApprove
            ? ApprovalState.NOT_APPROVED
            : ApprovalState.APPROVED
    }, [amountToApprove, currentAllowance, spender])

    const approve = useCallback(async (): Promise<void> => {

    }, [approvalState, ])
    return [approvalState, allowance]
}