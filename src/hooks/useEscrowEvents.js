import { useQuery } from "@tanstack/react-query";
import { getEscrowEvents } from "../utils/escrows";
import { ESCROW_STATUS } from "../utils/escrowStatus";

const POLL_STATUSES = new Set([ESCROW_STATUS.ACTIVE, ESCROW_STATUS.SUBMITTED]);

export const useEscrowEvents = (escrowId, escrowStatus) =>
  useQuery({
    queryKey: ["escrowEvents", escrowId],
    queryFn: () => getEscrowEvents(escrowId),
    enabled: !!escrowId,
    refetchInterval: POLL_STATUSES.has(escrowStatus) ? 30_000 : false,
  });
