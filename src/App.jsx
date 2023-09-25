import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import GlobalStyles from "./styles/GlobalStyles";
import Account from "./pages/Account";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Settings from "./pages/Settings";
import Users from "./pages/Users";
import AppLayout from "./ui/AppLayout";
import { Toaster } from "react-hot-toast";
import Booking from "./pages/Booking";
import Checkin from "./pages/Checkin";
import ProtectedRoute from "./ui/ProtectedRoute";
import ProtectedLogin from "./ui/ProtectedLogin";
import { DarkModeProvider } from "./context/DarkModeContext";

// * Membuat objek queryClient untuk mengelola cache dan pengambilan data dengan React Query.
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // ? Konfigurasi opsi default untuk semua query.
      // ? staleTime adalah waktu dalam milidetik sebelum data dalam cache dianggap kadaluwarsa.
      // ? Dalam contoh ini, data dalam cache akan dianggap kadaluwarsa setelah 60 detik.
      // staleTime: 60 * 1000, // 60 detik * 1000 milidetik = 60.000 milidetik (1 menit)
      staleTime: 0, // 60 detik * 1000 milidetik = 60.000 milidetik (1 menit)
    },
  },
});

function App() {
  return (
    <>
      <DarkModeProvider>
        {/* QueryClientProvider ini REACT QUERY */}
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          {/* GlobalStyles ini CSS */}
          <GlobalStyles />
          {/* BrowserRouter ini ROUTES */}
          <BrowserRouter>
            <Routes>
              <Route
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                  // <AppLayout />
                }
              >
                <Route index element={<Navigate replace to="dashboard" />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="bookings" element={<Bookings />} />
                <Route path="bookings/:bookingId" element={<Booking />} />
                <Route path="checkin/:bookingId" element={<Checkin />} />
                <Route path="cabins" element={<Cabins />} />
                <Route path="users" element={<Users />} />
                <Route path="settings" element={<Settings />} />
                <Route path="account" element={<Account />} />
              </Route>

              {/* <Route path="login" element={<Login />} /> */}
              <Route
                path="login"
                element={
                  <ProtectedLogin>
                    <Login />
                  </ProtectedLogin>
                }
              />

              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </BrowserRouter>

          <Toaster
            position="top-center"
            gutter={12}
            containerStyle={{ margin: "8px" }}
            toastOptions={{
              success: { duration: 3000 },
              error: { duration: 5000 },
              loading: { duration: 3000 },
              style: {
                fontSize: "16px",
                maxWidth: "500px",
                padding: "16px 24px",
                backgroundColor: "var(--color-grey-0)",
                color: "var(--color-grey-700)",
              },
            }}
          />
        </QueryClientProvider>
      </DarkModeProvider>
    </>
  );
}

export default App;
