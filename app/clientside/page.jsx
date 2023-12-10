'use client'

import {sessionStatus} from '@/utils/session'
import {redirect} from 'next/navigation'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'

const ClientSide = () => {
    useLayoutEffect(() => {
        const session = sessionStatus
        if(!session){
            redirect('/')
        }
    }, [])
    return <div>This page is protected route on client side</div>;
}
 
export default ClientSide;