'use client'

import {useSearchParams} from 'next/navigation'

export default function Messages() {
    const searchParams = useSearchParams()
    const error = searchParams.get('error')
    const message = searchParams.get('message')
    return <>
        {error && <p className="mt-2 border border-red-400 bg-red-100 rounded-lg p-2">{error}</p>}
        {message && <p className="mt-2 border border-blue-400 bg-blue-100 rounded-lg p-2">{message}</p>}
    </>
}
