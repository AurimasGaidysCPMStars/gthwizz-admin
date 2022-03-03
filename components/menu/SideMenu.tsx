import { useRouter } from "next/router"

export const SideMenu = () => {
    const menuItems: MenuItemData[] = [
        {
            title: "Dashboard",
            link: "/"
        },
        {
            title: "Requests",
            link: "request"
        },
        {
            title: "Languages",
            link: "languages"
        },
    ]

    return <div className="bg-black h-screen space-y-2">
        <img className="p-4" src={"https://gthtranslation.com/wp-content/uploads/2022/02/footer_logo6.webp"}></img>
        <div className="h-1" />
        {menuItems.map(x => <div key={x.link}><MenuItem title={x.title} link={x.link} /></div>)}
    </div>
}

interface MenuItemData {
    title: string;
    link: string;
}

export const MenuItem = ({ title, link }: MenuItemData) => {
    const router = useRouter()

    const handleClick = (e: any) => {
        e.preventDefault()
        router.push(link);
    }

    return <button onClick={handleClick} className='flex flex-col md:flex-row items-center space-x-2 hover:font-bold cursor-pointer border-l-8'>
        <div className="text-white p-2">
            {title}
        </div>
    </button>

}