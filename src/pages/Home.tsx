import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react'
import { JobBoard } from '../components/jobadder/board/data-table';
import { columns } from '../components/jobadder/board/columns';
import { z } from 'zod';
import { jobBoardSchema } from '../components/jobadder/board/schema';
import { createContext, useEffect, useState } from 'react';
import Loading from './Loading';

export const filterContext = createContext(null)

export const Home = () => {
    const [filters, setFilters] = useState({});
    const [jobAds, setJobAds] = useState([])
    const [isloading, setIsLoading] = useState(true)
    
    useEffect(() => {
        (async function()  {
            const data = await fetch(`http://127.0.0.1:7071/api/jobAdderAds`)
            let response = await data.text()
            const jobAds = response && JSON.parse(response)
            setFilters({companies: jobAds.companies, locations: jobAds.locations})
            setJobAds(z.array(jobBoardSchema).parse(jobAds.jobBoard))
            jobAds.length !== 0 && setIsLoading(false)
        }())
    }, [isloading])
    console.log(jobAds)
    console.log(filters)

    return (
        <>
            <AuthenticatedTemplate>
                <filterContext.Provider value={filters}>
                    <div>You are signed-in. Select profile to call Microsoft Graph.</div>
                    {!isloading ? <JobBoard data={jobAds} columns={columns} /> : <Loading/>}
                </filterContext.Provider>
            </AuthenticatedTemplate>

            <UnauthenticatedTemplate>
                <div>Please sign-in to see your profile information.</div>
            </UnauthenticatedTemplate>
        </>
    );
}