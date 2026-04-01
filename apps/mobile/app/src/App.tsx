import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import OnboardingPage from "./pages/OnboardingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import PreRidePage from "./pages/PreRidePage";
import LiveTrackingPage from "./pages/LiveTrackingPage";
import TripSummaryPage from "./pages/TripSummaryPage";
import HistoryPage from "./pages/HistoryPage";
import TripDetailPage from "./pages/TripDetailPage";
import ProfilePage from "./pages/ProfilePage";
import BikeDetailPage from "./pages/BikeDetailPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<OnboardingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/ride" element={<PreRidePage />} />
          <Route path="/ride/live" element={<LiveTrackingPage />} />
          <Route path="/ride/summary" element={<TripSummaryPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/history/trip-detail" element={<TripDetailPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/bike-detail" element={<BikeDetailPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
