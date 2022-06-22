import { DocumentData } from "firebase/firestore"
import { Dispatch, SetStateAction } from "react";
import moment from "moment";

interface Props {
    request: DocumentData;
    setExpand: Dispatch<SetStateAction<boolean>>
}

export const Cell = ({ request, setExpand }: Props) => {

    return <div onClick={e => { e.preventDefault(); setExpand(true) }} className="bg-gray-50 hover:bg-gray-100 rounded-2xl shadow-md p-10 space-y-2 w-full h-64">
        <div>{`${moment(request.dateCreated).format()}`}</div>
        <div>{`${request.name}, ${request.companyName} - ${request.phone} - ${request.email} `}</div>
        <div className="text-gray-500">{request.projectType}, {request.contentType} from {request.fromLanguage} to {request.ToLanguages.join(", ")}</div>
        <div className="text-gray-500">{request.wordCont}</div>
        <p className="text-s text-gray-500">Content files ({request.contentFileUrls?.length} total)</p>
    </div>
}