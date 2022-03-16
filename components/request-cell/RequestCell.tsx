import { doc, collection, DocumentData, QueryDocumentSnapshot, deleteDoc } from "firebase/firestore"
import moment from "moment";
import { useState } from "react";
import { firestore } from "./../../services/clientApp";

interface Props {
    id: number;
    data: DocumentData;
}
export const RequestCell = ({ id, data }: Props) => {
    const [expand, setExpand] = useState(false);

    if (!data) {
        return <div />
    }

    const request = data;

    const deleteMe = () => {
        const docRef = doc(firestore, 'requests/' + request.id);
        deleteDoc(docRef);
    }


    if (!expand) {
        return <div onClick={e => { e.preventDefault(); setExpand(!expand) }} className="bg-gray-50 hover:bg-gray-100 rounded-2xl shadow-md p-10 space-y-2 w-full h-64">
            <div>{`${moment(request.dateCreated).format()}`}</div>
            <div>{`${request.name}, ${request.companyName} - ${request.phone} - ${request.email} `}</div>
            <div className="text-gray-500">{request.projectType}, {request.contentType} from {request.fromLanguage} to {request.ToLanguages.join(", ")}</div>
            <div className="text-gray-500">{request.wordCont}</div>
        </div>
    }

    return <div className="bg-gray-50 hover:bg-gray-100 rounded-2xl shadow-md p-10 space-y-2 w-full">
        <button onClick={e => { e.preventDefault(); deleteMe(); }}>Delete</button>
        <div>{`${request.name}, ${request.companyName} - ${request.phone} - ${request.email} `}</div>
        <div className="text-gray-700">{request.projectType}, {request.projectType} from {request.fromLanguage} to {request.ToLanguages.join(", ")}</div>
        <p className="text-s text-gray-500">Brief</p>
        <div>{request.brief}</div>
        <p className="text-s text-gray-500">Brief files</p>
        <div className=" text-m">{request.fileUrls.map((x: any) => <a key={x.fileUrl} href={x.fileUrl}>{x.fileName}</a>)}</div>
        <p className="text-s text-gray-500">Content Type</p>
        <div>{request.contentType}</div>
        <p className="text-s text-gray-500">Content Texts</p>
        <div>{request.contentTexts}</div>
        <p className="text-s text-gray-500">Content files</p>
        <div className=" text-m">{request.contentFileUrls?.map((x: any) => <a key={x.fileUrl} href={x.fileUrl}>{x.fileName}</a>)}</div>
        <button onClick={e => { e.preventDefault(); setExpand(!expand) }}>Close</button>
    </div>
}
