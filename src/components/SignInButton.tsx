import { useMsal } from '@azure/msal-react';
import { Button } from './ui/button';

export const SignInButton = () => {
    const {instance} = useMsal()

    const handleSignIn = () => {
        instance.loginRedirect({
            scopes: ['user.read']
        })
    }

    return (
        <Button variant="outline" onClick={handleSignIn}>Sign in</Button>
    )
};