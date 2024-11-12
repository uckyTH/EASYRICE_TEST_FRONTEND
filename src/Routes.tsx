import { lazy, Suspense } from "react";
import { Outlet, Navigate, useRoutes } from "react-router-dom";
import Box from "@mui/material/Box";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

// Lazy loading the pages
const HomePage = lazy(() => import("./views/History"));
const CreateInspectionPage = lazy(() => import("./views/CreateInspection"));
const EditResultPage = lazy(() => import("./views/EditResult"));
const ResultPage = lazy(() => import("./views/ViewInspection"));

// Fallback component for loading
const renderFallback = (
  <Box
    display="flex"
    alignItems="center"
    justifyContent="center"
    flex="1 1 auto"
  >
    <LinearProgress
      sx={{
        width: 1,
        maxWidth: 320,
        bgcolor: (theme) => theme.palette.action.hover,
        [`& .${linearProgressClasses.bar}`]: { bgcolor: "text.primary" },
      }}
    />
  </Box>
);

// Router setup
export function Router() {
  return useRoutes([
    {
      element: (
        <Suspense fallback={renderFallback}>
          <Outlet />
        </Suspense>
      ),
      children: [
        { path: "/", element: <HomePage />, index: true }, // Route to History (Home)
        { path: "/create-inspection", element: <CreateInspectionPage /> }, // Route to Create Inspection
        { path: "/edit-result/:id", element: <EditResultPage /> }, // Route to Edit Result by ID
        { path: "/result/:id", element: <ResultPage /> }, // Route to View Result by ID
      ],
    },
    {
      path: "*",
      element: <Navigate to="/" replace />,
    },
  ]);
}
