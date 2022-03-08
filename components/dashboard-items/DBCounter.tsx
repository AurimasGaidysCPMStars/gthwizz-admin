interface Props {
    name: string;
    desc: string;
    count: number;
}

export const BDCounter = ({ desc, name, count }: Props) => {
    return <div className="bg-gray-50  hover:bg-gray-100 rounded-2xl shadow-md p-10 space-y-2 w-64 h-64">
        <div>{name}</div>
        <div className="text-gray-500">{desc}</div>
        <div className=" text-2xl">{count}</div>
    </div>
}