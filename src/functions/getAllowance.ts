import { useMoralis, useWeb3Contract } from "react-moralis";
import { ERC20_ABI } from "../../constants/abis/erc20";

export async function getAllowance(account: string, tokenAddress: string, spender: string) {
    // const { account } = useMoralis()

    const { runContractFunction: getTokenAllowance } = useWeb3Contract({
        contractAddress: tokenAddress,
        abi: ERC20_ABI,
        functionName: "allowance",
        params: { account, spender }
    })

    await getTokenAllowance()
}