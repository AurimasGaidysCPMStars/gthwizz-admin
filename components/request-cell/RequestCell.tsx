import { DocumentData } from "firebase/firestore"
import { useState } from "react";
import { Cell } from "./cell/cell";
import { ExpandedCell } from "./cell/expanded-cell";

interface Props {
    id: number;
    data: DocumentData;
}
export const RequestCell = ({ id, data }: Props) => {
    const [expand, setExpand] = useState(false);

    if (!data) {
        return <div />
    }

    if (!expand) {
        return <Cell request={data} setExpand={setExpand} />
    }

    return <ExpandedCell request={data} setExpand={setExpand} />
}
