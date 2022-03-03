import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore"
import { useState } from "react";
import { RequestData } from "../../models/request";

interface Props {
    id: number;
    data: QueryDocumentSnapshot<DocumentData>;
}
export const RequestCell = ({ id, data }: Props) => {
    if (!data.exists) {
        return <div />
    }

    const [expand, setExpand] = useState(false);

    const request = data.data() as RequestData;

    if (!expand) {
        return <div onClick={e => { e.preventDefault(); setExpand(!expand) }} className="bg-gray-50 hover:bg-gray-100 rounded-2xl shadow-md p-10 space-y-2 w-full h-64">
            <div>{`${request.name}, ${request.companyName} - ${request.phone} - ${request.email} `}</div>
            <div className="text-gray-500">{request.projectType}, {request.contentType} from {request.fromLanguage} to {request.ToLanguages.join(", ")}</div>
            <div className="text-gray-500">{request.wordCont}</div>
        </div>
    }

    return <div className="bg-gray-50 hover:bg-gray-100 rounded-2xl shadow-md p-10 space-y-2 w-full">
        <div>{`${request.name}, ${request.companyName} - ${request.phone} - ${request.email} `}</div>
        <div className="text-gray-700">{request.projectType}, {request.projectType} from {request.fromLanguage} to {request.ToLanguages.join(", ")}</div>
        <p  className="text-s text-gray-500">Brief</p>
        <div>{request.brief}</div>
        <p className="text-s text-gray-500">Brief files</p>
        <div className=" text-m">{request.fileUrls.map(x => <a href={x.fileUrl}>{x.fileName}</a>)}</div>
        <p className="text-s text-gray-500">Content Type</p>
        <div>{request.contentType}</div>
        <p className="text-s text-gray-500">Content Texts</p>
        <div>{request.contentTexts}</div>
        <p className="text-s text-gray-500">Content files</p>
        <div className=" text-m">{request.contentFileUrls?.map(x => <a href={x.fileUrl}>{x.fileName}</a>)}</div>
        <button onClick={e => { e.preventDefault(); setExpand(!expand) }}>Close</button>
    </div>
}
