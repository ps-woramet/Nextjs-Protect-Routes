0. utils > session.js

    export const sessionStatus = false;

การ protect routes มี 4 แบบ (ClientSide, ClientSideHoc, ServerSide, MiddlewareSide)

    1. client side

        -app > clientside > page.jsx

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

    2. client side with hoc(Higher-Order Component)

        -components > withAuth.jsx

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

        -app > clientsidehoc > page.jsx

            'use client'

            import withAuth from "@/components/withAuth";

            const ClientSideHoc = () => {
                return <div>This page is protected route on client side Hoc</div>;
            }
            
            export default withAuth(ClientSideHoc);

    3. server side

        -app > serverside > page.jsx

            import React from "react";
            import {sessionStatus} from '@/utils/session'
            import {redirect} from 'next/navigation'

            const ServerSide = () => {
                const session = sessionStatus;
                if(!session){
                    redirect('/')
                }
                return <div>This is a server component</div>;
            }
            
            export default ServerSide;

    4. middleware side

        -middleware.js

            import { sessionStatus } from "./utils/session";
            import { NextRequest, NextResponse } from "next/server";

            const protectedRoutes = ["/middlewareside"]

            export default function middleware(req){
                if(!sessionStatus && protectedRoutes.includes(req.nextUrl.pathname)){
                    const absoluteURL = new URL("/", req.nextUrl.origin);
                    return NextResponse.redirect(absoluteURL.toString())
                }
            }

        -app > middlewareside > page.jsx

            import React from 'react'

            const MiddlewareSide = () => {
                return <div>This is middleware component.</div>;
            }
            
            export default MiddlewareSide;