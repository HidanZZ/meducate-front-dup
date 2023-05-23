import { Grid } from "@mui/material";
import ApexChartWrapper from "src/@core/styles/libs/react-apexcharts";
import TopNamesChart from "src/views/pages/dashboard/TopNamesChart";





const Dashboard = () => {
    return(
        <ApexChartWrapper>
            <Grid container spacing={6}>
                <Grid item xs={12} md={6} >
                    <TopNamesChart />
                    </Grid>
            </Grid>
        </ApexChartWrapper>
    )

};


export default Dashboard;