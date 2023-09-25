import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { login as loginApi } from "../../services/apiAuth";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      //  ["user"] dari useUser.js queryKey
      queryClient.setQueriesData(["user"], user.user);
      navigate("/dashboard", { replace: true });
      toast.success("Welcome");
    },
    onError: (err) => {
      console.log("ERROR", err);
      toast.error("Provided email or password incorrect");
    },
  });

  return { login, isLoading };
}
