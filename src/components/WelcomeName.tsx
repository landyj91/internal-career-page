import { useMsal } from '@azure/msal-react';
import { useEffect, useState } from "react";

type AccountInfo = {
    username?: string
}

export const WelcomeName = () => {
    const { instance } = useMsal()
    const [username, setUsername] = useState<string>()
    useEffect(() => {
        const currentAccount = instance.getActiveAccount() as AccountInfo
        currentAccount && setUsername(currentAccount.username)
        // console.log(currentAccount)
    }, [instance])

    return <div>Welcome, {username}</div>;
};