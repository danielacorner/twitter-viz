import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { useNodes } from "../providers/store";
import { TAB_INDICES } from "utils/constants";
import qs from "query-string";

/** when the nodes change, update the url */
export default function useSyncStateToUrl(): [
  number,
  React.Dispatch<React.SetStateAction<number>>
] {
  const nodes = useNodes();
  const history = useHistory();
  const { pathname, search } = useLocation();
  const queryObj = qs.parse(search);

  const initialTabIndex = queryObj.tab
    ? Number(queryObj.tab)
    : TAB_INDICES.NETWORKGRAPH;

  const [tabIndex, setTabIndex] = useState(initialTabIndex);

  // TODO: not working when fetch nodes by id?
  useEffect(() => {
    // const queryObj = qs.parse(search);
    const newQueryObj = {
      ...queryObj,
      tab: tabIndex,
      nodes: nodes.map((t) => t.id_str).join(","),
    };

    const newSearch = "?" + qs.stringify(newQueryObj);

    const oldPathAndSearch = `${pathname}${search}`;
    const newPathAndSearch = `${pathname}${newSearch}`;

    if (newPathAndSearch !== oldPathAndSearch) {
      history.push(newPathAndSearch);
    }
  }, [pathname, history, nodes, tabIndex, search, queryObj]);
  return [tabIndex, setTabIndex];
}
