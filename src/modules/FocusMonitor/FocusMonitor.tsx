import React, { useEffect } from "react";
import { EventBus } from "../../eventBus/eventBus";
import { useDistraction } from "./useDistraction";

interface Props {
  busRef: React.MutableRefObject<Partial<EventBus>>;
}

const FocusMonitor: React.FC<Props> = ({ busRef }) => {
  const distraction = useDistraction();

  useEffect(() => {
    busRef.current.onDistractionChange?.(distraction);
  }, [distraction]);

  return null;
};

export default FocusMonitor;
