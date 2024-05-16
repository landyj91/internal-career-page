import { PageLayout } from "./components/PageLayout";
import { Routes, Route } from "react-router-dom";

import { Home } from "./pages/Home";
import { AdDetail } from "./pages/AdDetail";
import { MsalProvider, useMsal, useIsAuthenticated } from '@azure/msal-react'
import { useEffect } from "react";
import { InteractionRequiredAuthError } from '@azure/msal-common'

function App({msalInstancec}) {
    return (
        <MsalProvider instance={msalInstancec}>
            <PageLayout>
                <Pages />
            </PageLayout>
        </MsalProvider>
    );
}

const Pages = () => {
    const { instance } = useMsal()
    const isAuthenticated = useIsAuthenticated()
    useEffect(() => {
        if (!isAuthenticated) {
            instance.ssoSilent({
                scopes: ['user.read'],
                // loginHint: "landyj@brandbank.com.au"
            }).then(response => {
                instance.setActiveAccount(response.account)
            }).catch(error => {
                if (error instanceof InteractionRequiredAuthError) {
                    instance.loginRedirect({
                        scopes: ['user.read']
                    })
                    console.log(error)
                }
            })
        }
    }, [])
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:adId" element={<AdDetail />} />
        </Routes>
    );
}

export default App;
