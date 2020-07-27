import { useTreatments, SplitContext } from "@splitsoftware/splitio-react"
import { useContext } from "react";

const SPLIT_ID = 'my-feature-split';

export default function A() {
  const treatments = useTreatments([SPLIT_ID]);
  const { isReady, isTimedout } = useContext(SplitContext);

  if (isReady && !isTimedout && treatments[SPLIT_ID].treatment === 'on') {
    return <div>Split is active!</div>
  }

  return <div>Split is not active, yet</div>
}
