import { useContext, useEffect, useState } from "react";
import apiUrl from "../ApiEndpoint";
import MembershipContext from "./MembershipContext";
import UserContext from "./UserContext";
export default function MembershipProvider({ children }) {
    const [planAmount, setPlanAmount] = useState("")
    const [planTitle, setPlanTitle] = useState("")
    const [planDuration, setPlanDuration] = useState("")
    const [dailyLimit, setDailyLimit] = useState("")
    const [allMembers, setAllMembers] = useState([])
    const { signUser } = useContext(UserContext)
    const allMembersFn = async () => {
        const res = await fetch(`${apiUrl}/api/subscribe/allMembers`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await res.json()
        setAllMembers(data)
    }
    const statusUpdate = async () => {
        const res = await fetch(`${apiUrl}/api/subscribe/updateStatus`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ userId: signUser?._id })
        })
        const data = await res.json()
        setAllMembers(data)
    }

    useEffect(() => {
        if (signUser?._id) {
            allMembersFn();
            statusUpdate();
        }
    }, [signUser]);

    return (
        <MembershipContext.Provider value={{ allMembers, planAmount, setPlanAmount, dailyLimit, setDailyLimit, planDuration, setPlanDuration, planTitle, setPlanTitle, allMembersFn }}>
            {children}
        </MembershipContext.Provider>
    )
}