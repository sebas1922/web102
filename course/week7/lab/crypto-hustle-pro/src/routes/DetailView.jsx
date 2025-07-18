import { Component, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
const API_KEY = import.meta.env.VITE_APP_API_KEY



function DetailView() {
    const { symbol } = useParams()
    const [fullDetails, setFullDetails] = useState(null)
    return (
        <>
        
        </>
    )
}

export default DetailView