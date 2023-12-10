'use client'

import withAuth from "@/components/withAuth";

const ClientSideHoc = () => {
    return <div>This page is protected route on client side Hoc</div>;
}
 
export default withAuth(ClientSideHoc);