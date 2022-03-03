import { Fragment, useState } from 'react';
import { TrashIcon } from "@heroicons/react/solid";
import { getFirestore, collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { firestore } from "./../services/clientApp"
import { LanguageData } from '../models/languages';
function Languages() {
    const [name, setName] = useState<string>();
    const [value, loading, error] = useCollection(
        collection(firestore, 'languages'),
        {
            snapshotListenOptions: { includeMetadataChanges: true },
        }
    );

    const handleChange = (event: any) => {
        setName(event.target.value);
    }

    const compare = (a: LanguageData, b: LanguageData) => {
        if (a.name < b.name) {
            return -1;
        }
        if (a.name > b.name) {
            return 1;
        }
        return 0;
    }

    const submitLanguage = () => {
        const groceriesColRef = collection(firestore, 'languages')
        addDoc(groceriesColRef, {
            name: name?.trim(),
            top: false
        });
        setName("");
    }

    interface Props {
        ld: LanguageData
    }

    const RenderCell = ({ ld }: Props) => {
        return <div key={ld.id} style={{ display: "flex", alignItems: 'center' }}>
            <p>
                {
                    ld.name
                }
            </p>
            <input
                type="checkbox"
                checked={ld.top}
                onChange={() => {
                    const langRef = doc(firestore, "languages", ld.id);

                    // Set the "capital" field of the city 'DC'
                    updateDoc(langRef, {
                        top: !ld.top
                    });
                }}
            />
            <button onClick={() => { }} className="px-2 rounded-full text-sky-500/100 hover:font-bold cursor-pointer">
                <TrashIcon className={`m-2 mr-2 h-8 w-8 p-1 text-gray-400 z-50`} />
            </button>
        </div>
    }

    return (
        <div>
            <h1>Manage Languages</h1>
            <p>Add New</p>
            <input type="Name" value={name} onChange={handleChange} />
            <button onClick={submitLanguage}>Submit</button>
            <p>Top Languages</p>
            <p>
                {error && <strong>Error: {JSON.stringify(error)}</strong>}
                {loading && <span>Collection: Loading...</span>}
                {value && (
                    <span>
                        {value.docs.map((doc) => {
                            const data = doc.data() as LanguageData;
                            data.id = doc.id;
                            return data;
                        })
                            .sort(compare).map((data) => {
                                if (!data.top) {
                                    return null;
                                }
                                return <div key={data.id}><RenderCell ld={data} /></div>
                            })}
                    </span>
                )}
            </p>
            <p>Other Languages</p>
            <p>
                {error && <strong>Error: {JSON.stringify(error)}</strong>}
                {loading && <span>Collection: Loading...</span>}
                {value && (
                    <span>
                        {value.docs.map((doc) => {
                            const data = doc.data() as LanguageData;
                            data.id = doc.id;
                            return data;
                        })
                            .sort(compare).map((data) => {
                                if (data.top) {
                                    return null;
                                }
                                return <div key={data.id}><RenderCell ld={data} /></div>
                            })}
                    </span>
                )}
            </p>

        </div>
    );
}

export default Languages;

