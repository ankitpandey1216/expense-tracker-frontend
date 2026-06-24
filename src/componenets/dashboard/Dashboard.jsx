import Overview from "./Overview";
import GroupBalance from "./GroupBalance";
import RecentExpense from "./RecentExpense";
import "../../styles/dashboard.css";
import { useEffect, useState } from "react";
import { dashBoardApi } from "../../services/dashboardSerive";

export default function Dashboard() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [dashboardData, setDashboardData] = useState(null);


    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await dashBoardApi();
                console.log("Inside dashboard comp response : ",response);
                setDashboardData(response?.data);
            } catch (error) {
                setError(error);
            } finally{
                setLoading(false);
            }
        }
        fetchDashboardData();
    },[])

    const netBalance = dashboardData?.owedAmount - dashboardData?.totalYouOwe;
    return (
        <section className="dashboard">
            <div className="dashboard-header">
                <div>
                    <p className="dashboard-eyebrow">Expense overview</p>
                    <h1>Dashboard</h1>
                    <p className="dashboard-subtitle">A quick look at your groups, spending, and balances.</p>
                </div>
                <div className="dashboard-net-card">
                    <span>Net balance</span>
                    <strong>{netBalance >= 0 ? `+INR ${netBalance.toFixed(2)}` : `-INR ${Math.abs(netBalance).toFixed(2)}`}</strong>
                </div>
            </div>

            <Overview totalGroups={dashboardData?.totalGroups} totalExpense={dashboardData?.totalExpense} owedToYou={dashboardData?.owedAmount} youOwe={dashboardData?.totalYouOwe}/>

            <div className="dashboard-grid">
                <RecentExpense recentExpenses={dashboardData?.recentExpenses}/>
                <GroupBalance groupBalances={dashboardData?.groupBalances}/>
            </div>
        </section>
    )
}
