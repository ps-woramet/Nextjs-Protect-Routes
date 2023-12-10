'use client'
import { sessionStatus } from "@/utils/session"
import {redirect} from 'next/navigation'
import { useEffect } from "react"

const withAuth = (Component) => {
    return function WithAuth(props){
        const session = sessionStatus
        useEffect(()=>{
            if (!session){
                redirect('/')
            }
        }, [])

        if(!session){
            return null
        }
        return <Component {...props} />
    };
}
 
export default withAuth;