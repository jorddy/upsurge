import toast from "react-hot-toast";
import { useEffect } from "react";
import { useIsFetching } from "react-query";

export const useRefetching = () => {
  const isRefetching = useIsFetching();

  useEffect(() => {
    if (isRefetching) {
      toast.loading("Refreshing data...");
    } else {
      toast.dismiss();
    }

    return () => toast.remove();
  }, [isRefetching]);
};
