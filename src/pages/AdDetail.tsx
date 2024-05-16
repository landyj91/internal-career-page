import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { JobBoard } from "../components/jobadder/board/schema"
import PageNotFound from "./PageNotFound"
import Loading from "./Loading"

export const AdDetail = () => {
    const { adId } = useParams()
    const [jobAd, setJobAd] = useState<JobBoard>()
    const [isloading, setIsLoading] = useState(true)
    const [isRightId, setIsRightId] = useState(true)
    
    useEffect(() => {
        (async function()  {
            const data = await fetch(`http://127.0.0.1:7071/api/jobAdderAd?id=${ adId }`)
            let response = await data.text()
            const jobAd = response && JSON.parse(response)
            setJobAd(jobAd)
            jobAd && setIsLoading(false)
            jobAd?.title === "Not Found" && setIsRightId(false)
        }())
    }, [adId, isloading])
    console.log(jobAd)

    return !isloading ? 
        isRightId ? (
            <div className="container mx-auto px-4">
                <h2>{jobAd.title}</h2>
                <p>{jobAd.location}</p>
                <p>{jobAd.company}</p>
                <div dangerouslySetInnerHTML={{ __html: jobAd.description }} />
            </div>
        ) : <PageNotFound />
     : <Loading/>
}