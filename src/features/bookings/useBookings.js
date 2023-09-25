import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getBookings } from "../../services/apiBookings";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // FILTER
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };
  // { field: "totalPrice", value: 5000, method: "gte" };

  // SORTING
  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  // PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
  // ALURNYA DARI DATA DIAMBIL DARI APIBOOKING.JS KE USEBOOKING.JS
  const {
    isLoading,
    // data: bookings,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page], // setiap filter berganti/berubah data maka akan terjadi render
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  // PRE-FETCHING (TUJUANNYA KETIKA DI NEXT PAGINATIONNYA TIDAK LOADING DULU)
  const pageCount = Math.ceil(count / PAGE_SIZE); // KETIKA SUDAH DI AKHIR PAGE PAGINATION, TIDAK PERLU LOAD LAGI

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1], // setiap filter berganti/berubah data maka akan terjadi render
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1], // setiap filter berganti/berubah data maka akan terjadi render
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });

  return { bookings, isLoading, error, count };
}
