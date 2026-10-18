import {cookies} from "next/headers";

export async function getSession(){
    const token = await cookies();
    const cookie = token.get('session')?.value;

    if(!cookie){
        return null;
    }
    return {userId: token};
}