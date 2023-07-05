import { Grid } from "@mui/material";

import ApexChartWrapper from "src/@core/styles/libs/react-apexcharts";
import AutocompleteComponent from "src/views/pages/dashboard/AutoComplete";
import DistributionOfPediatricians from "src/views/pages/dashboard/DistributionOfPediatricians";
import Maps from "src/views/pages/dashboard/Maps";
import TableOfPediatricians from "src/views/pages/dashboard/TableOfPediatricians";
import Statistics from "src/views/pages/dashboard/Statistics";





const AnalyticsDashboard = () => {
   

    return(
        <ApexChartWrapper>
            {/* speace between search and the first component */}
            <Grid container spacing={6}>
                {/* the search's componenet */}
                <Grid item xs={12}  >
                    <AutocompleteComponent hidden={false}/>
                </Grid>
                <Grid item xs={12} md={6} >
                    <TableOfPediatricians />
                </Grid>
                {/* wight:md */}
                <Grid item xs={12} md={6} >
                    {/* topPositiveNames */}
                    <Maps />
                </Grid>
                <Grid item xs={12}  >
                    <Statistics />
                </Grid>
                <Grid item xs={12}  >
                    <DistributionOfPediatricians />
                </Grid>
                            
            </Grid>
        </ApexChartWrapper>
    )

};


export default AnalyticsDashboard;