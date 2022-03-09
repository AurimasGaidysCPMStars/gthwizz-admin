import { Fragment, useState } from 'react';
import { TrashIcon } from "@heroicons/react/solid";
import { getFirestore, collection, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { firestore } from "./../services/clientApp"
import { LanguageData } from '../models/languages';
import { Layout } from '../components/Layout';
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
        return <div key={ld.id} className="bg-gray-50 hover:bg-gray-100 rounded-2xl shadow-md p-2 space-y-2 w-full flex justify-between items-center">
            <div className='flex justify-between items-center'>
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
                <p className='p-2'>
                    {
                        ld.name
                    }
                </p>
            </div>
            <button onClick={() => {
                const langRef = doc(firestore, "languages", ld.id);
                deleteDoc(langRef);
            }} className="px-2 rounded-full text-sky-500/100 hover:font-bold cursor-pointer">
                <TrashIcon className={`m-2 mr-2 h-8 w-8 p-1 text-gray-400 z-50`} />
            </button>
        </div>
    }

    return (
        <Layout>
            <div className='lex flex-col w-full h-screen bg-slate-500 p-4 overflow-scroll space-y-4'>
                <div className="bg-gray-50 hover:bg-gray-100 rounded-2xl shadow-md p-10 w-full flex justify-between">
                    <h1 className="w-full flex">Add New Language</h1>
                    <div className="w-full flex" >
                        <input className="w-full p-2 px-4 border" type="Name" value={name} onChange={handleChange} />
                        <button className='border rounded-md px-4' onClick={submitLanguage}>Add</button>
                    </div>
                </div>
                <p className='px-4 text-white font-bold'>Top Languages</p>
                <p>
                    {error && <strong>Error: {JSON.stringify(error)}</strong>}
                    {loading && <span>Collection: Loading...</span>}
                    {value && (
                        <div className='flex flex-col p-2 space-y-4'>
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
                        </div>
                    )}
                </p>
                <p>
                    <p className='px-4 text-white font-bold'> Languages ({value?.size}) </p>
                    {error && <strong>Error: {JSON.stringify(error)}</strong>}
                    {loading && <span>Collection: Loading...</span>}
                    {value && (
                        <div className='flex flex-col p-2 space-y-4'>
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
                        </div>
                    )}
                </p>

            </div>
        </Layout>

    );
}

export default Languages;

