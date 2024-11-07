import { createBrowserRouter } from "react-router-dom";
import {
    MainPage, HomePage, BackstagePage, BackstageDetailPage, PerformanceDetailsPage, RepertoirePage,RepertoireDetailPage, AboutPage
} from "../pages";


const router = createBrowserRouter([
    {
        path: "performances",
        element: <MainPage />,
        children: [
            {
                path: ":id", 
                element: <PerformanceDetailsPage />
            },
            {
                path: "backstages",
                element: <BackstagePage />,
            },
            {
                path: "backstages/:id",
                element: <BackstageDetailPage />,
            },
            {
                path: "repertoire",
                element: <RepertoirePage />,
            },
            {
                path: "repertoire/:id",
                element: <RepertoireDetailPage />,
            },
        ]
    },
    {
        path: "/",
        element: <MainPage />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: "about",
                element: <AboutPage />,
            },
        ]
    },
]);

export default router;
