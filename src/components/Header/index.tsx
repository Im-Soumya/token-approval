import { FC, useEffect } from 'react'
import { useMoralis } from 'react-moralis'
import Spinner from '../Spinner'

const Header: FC = () => {
  const { enableWeb3, account, Moralis, deactivateWeb3, isWeb3Enabled, isWeb3EnableLoading } = useMoralis()

  const collectWallet = () => {
    enableWeb3()
    if(typeof window !== undefined) {
      window.localStorage.setItem("connected", "metamask")
    }
  }

  useEffect(() => {
    if(!isWeb3Enabled && typeof window !== undefined && window.localStorage.getItem("connected")) {
      enableWeb3()
    }
  }, [isWeb3Enabled])

  useEffect(() => {
    Moralis.onAccountChanged((account) => {
      console.log(`Account changed to ${account}`)
      if(account == null) {
        window.localStorage.removeItem("connected")
        deactivateWeb3()
      }
    })
  }, [])

  return (
    <div className='w-full px-5 md:px-14 py-3 fixed top-0 flex justify-end'>
      {account
        ? (
          <div className='bg-indigo-600 text-neutral-200 py-1 px-3 rounded-full'>
            <span>
              {account.slice(0, 6)}...{account.slice(account.length - 4)}
            </span>
          </div>
        )
        : (
          <button
            className='bg-indigo-500 px-3 py-1 rounded hover:bg-indigo-700 duration-200'
            onClick={collectWallet}
            disabled={isWeb3EnableLoading}
          >
            {isWeb3EnableLoading
              ? <Spinner />
              : <span>Connect wallet</span>
            }
          </button>
        )
      }
    </div>
  )
}

export default Header