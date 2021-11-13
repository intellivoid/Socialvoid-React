import { useEffect } from 'react'

import { useRouter } from 'next/router'

import Loader from '../components/Loader'

export default function SignUp() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/tos')
  })

  return <Loader />
}
