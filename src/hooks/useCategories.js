import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../axios";

export const useCategories = () =>
  useQuery({
    queryKey: ["categories"],
    queryFn: () => makeRequest.get("/categories").then((res) => res.data),
    staleTime: 1000 * 60 * 60,
  });
