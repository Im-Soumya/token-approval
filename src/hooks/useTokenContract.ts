import { ethers, Contract } from "ethers"

import { getContract } from "@/functions/getContract";
import { ERC20_ABI } from "../../constants/abis/erc20";

export function useTokenContract(tokenAddress: string, web3: ethers.providers.Web3Provider, account: string) : Contract | null {
    try {
        return getContract(tokenAddress, ERC20_ABI, web3, account)
    } catch(e) {
        console.log("Failed to get the contract", e)
        return null
    }
}