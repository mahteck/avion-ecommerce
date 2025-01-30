
'use server'
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function LogOutAction() {
    // cookies().set("token","",{expires:new Date(0)})

    localStorage.removeItem('userId');
    localStorage.removeItem('token');

    cookies().delete("token");
    cookies().delete("userid");

    redirect("/signin")
}

