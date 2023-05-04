import { ethers } from "ethers"

export function getSigner(library: ethers.providers.Web3Provider, account?: string) : ethers.providers.JsonRpcSigner {
    return library.getSigner(account).connectUnchecked()
}

export function getProviderOrSigner(library: ethers.providers.Web3Provider, account?: string) : ethers.providers.Web3Provider | ethers.providers.JsonRpcSigner {
    return account ? getSigner(library, account) : library
}

export function getContract(address: string, ABI: any, library: ethers.providers.Web3Provider, account?: string) {
    if(!ethers.utils.isAddress(address) || address === ethers.constants.AddressZero) {
        throw Error(`Invalid 'address' parameter ${address}`)
    }
    return new ethers.Contract(address, ABI, getProviderOrSigner(library, account))
}