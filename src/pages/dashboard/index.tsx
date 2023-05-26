import { Grid } from "@mui/material";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { useSelector } from "react-redux";
import ApexChartWrapper from "src/@core/styles/libs/react-apexcharts";
import { AppDispatch } from "src/store";
import  { fetchNames, reset } from "src/store/apps/dashboard/components/searchNames";
import SearchField from "src/views/forms/dashboard/SearchField";
import NameCards from "src/views/pages/dashboard/NameCards";
import SentimentTrendChart from "src/views/pages/dashboard/SentimentTrendChart";
import TopNamesBySentimentChart from "src/views/pages/dashboard/TopNamesBySentiment";
import TopNamesChart from "src/views/pages/dashboard/TopNamesChart";
import WordcloudCard from "src/views/pages/dashboard/WordcloudCard";





const Dashboard = () => {
    const [searchValue, setSearchValue] = useState('');
    const dispatch = useDispatch<AppDispatch>()

    const {names  } = useSelector((state: any) => state.dashboard.searchNames);

    useEffect(() => {
        if (searchValue.length > 2) {
            dispatch(fetchNames(searchValue));
        }else{
            dispatch(reset())
        }
    }, [searchValue, dispatch]);

    return(
        <ApexChartWrapper>
            <Grid container spacing={6}>
                <Grid item xs={12}  >
                    <SearchField 
                    inputValue={searchValue}
                    setInputValue={setSearchValue}
                    />
                    </Grid>
                    <Grid item xs={12}>
          <AnimatePresence>
            {names && names.length > 0 && <NameCards names={names} />}
          </AnimatePresence>
        </Grid>
                <Grid item xs={12} md={6} >
                    <TopNamesChart />
                    </Grid>
                    <Grid item xs={12} md={6} >
                    <TopNamesBySentimentChart />
                    </Grid>
                    <Grid item xs={12}  >
                        <WordcloudCard />
                        </Grid>
                        <Grid item xs={12}  >
                            <SentimentTrendChart />
                            </Grid>
            </Grid>
        </ApexChartWrapper>
    )

};


export default Dashboard;