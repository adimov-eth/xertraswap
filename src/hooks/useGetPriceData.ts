import { useEffect, useState } from 'react'

type ApiResponse = {

  [key: string]: {
    usd: string
  }
  
}


const coinId = 'stratis';
const api = `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd`

const useGetPriceData = () => {
  const [data, setData] = useState<ApiResponse | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(api)
        const res: ApiResponse = await response.json()

        setData(res)
      } catch (error) {
        console.error('Unable to fetch price data:', error)
      }
    }

    fetchData()
  }, [setData])

  return data
}

export default useGetPriceData
