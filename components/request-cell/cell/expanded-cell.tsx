import { firestore } from "./../../../services/clientApp";
import { doc, DocumentData, deleteDoc } from "firebase/firestore";
import { Dispatch, SetStateAction } from "react";
import moment from "moment";
import JsZip from "jszip";
import FileSaver from "file-saver";
interface Props {
	request: DocumentData;
	setExpand: Dispatch<SetStateAction<boolean>>;
}

// const zip = async (urls: any[]) => {
//     var zip = new JSZip();

//     urls.forEach(async x => {
//         let response = await fetch(x.fileUrl);
//         let data = await response.blob();
//         zip.file(x.fileName, data);
//     });

//     zip.generateAsync({type: "blob"}).then(content => {
//         saveAs(content, "example.zip");
//       });
// }

const FilesList = ({ request, setExpand }: Props) => {
	if (request.contentFileUrls?.length < 1) {
		return <div className=" text-m">No files added.</div>;
	}

	const download = (url: string) => {
		return fetch(url, { method: "GET" }).then((resp) => {
			console.log(resp);
			return resp.blob();
		});
	};

	const downloadMany = (urls: string[]) => {
		return Promise.all(urls.map((url) => download(url)));
	};

	const exportZip = (blobs: any) => {
		const zip = JsZip();
		blobs.forEach((blob: any, i: number) => {
			zip.file(request.contentFileUrls[i].fileName, blob);
		});
		zip.generateAsync({ type: "blob" }).then((zipFile) => {
			const currentDate = new Date().getTime();
			const fileName = `combined-${currentDate}.zip`;
			return FileSaver.saveAs(zipFile, fileName);
		});
	};

	const downloadAndZip = (urls: string[]) => {
		var bl = download(urls[0]);
		bl.then((x) => console.log(x.size));
		return downloadMany(urls).then(exportZip);
	};

	return (
		<div style={{ display: "flex", flexDirection: "column" }}>
			<p className="text-s text-gray-500">
				Content files ({request.contentFileUrls?.length} total)
			</p>
			<button
				onClick={() => {
					downloadAndZip(
						request.contentFileUrls?.map(
							(x: any, i: number) => x.fileUrl
						)
					);
				}}
			>
				Download all
			</button>
			<div
				className=" text-m"
				style={{ display: "flex", flexDirection: "column" }}
			>
				{request.contentFileUrls?.map((x: any, i: number) => (
					<a key={x.fileUrl} href={x.fileUrl}>
						{i + 1}: {x.fileName}
					</a>
				))}
			</div>
		</div>
	);
};

export const ExpandedCell = ({ request, setExpand }: Props) => {
	const deleteMe = () => {
		const docRef = doc(firestore, "requests/" + request.id);
		deleteDoc(docRef);
	};

	return (
		<div className="bg-gray-50 hover:bg-gray-100 rounded-2xl shadow-md p-10 space-y-2 w-full">
			<button
				onClick={(e) => {
					e.preventDefault();
					deleteMe();
				}}
			>
				Delete
			</button>
			<div>{`${moment(request.dateCreated).format()}`}</div>
			<div>{`${request.name}, ${request.companyName} - ${request?.country} - ${request.phone} - ${request.email} `}</div>
			<div className="text-gray-700">
				{request.projectType}, {request.projectType} from{" "}
				{request.fromLanguage} to {request.ToLanguages.join(", ")}
			</div>
			<p className="text-s text-gray-500">Brief</p>
			<div>{request.brief}</div>
			<p className="text-s text-gray-500">Brief files</p>
			<div className=" text-m">
				{request.fileUrls.map((x: any) => (
					<a key={x.fileUrl} href={x.fileUrl}>
						{x.fileName}
					</a>
				))}
			</div>
			<p className="text-s text-gray-500">Content Type</p>
			<div>{request.contentType}</div>
			<p className="text-s text-gray-500">Content Texts</p>
			<div>{request.contentTexts}</div>
			<FilesList request={request} setExpand={setExpand} />
			<button
				onClick={(e) => {
					e.preventDefault();
					setExpand(false);
				}}
			>
				Close
			</button>
		</div>
	);
};
