import { SideMenu } from "./menu/SideMenu"

interface Props {
    children: any;
}

export const Layout = (props: Props) => {
    return (
        <div className={""}>
            {/* <OrderDataContext /> */}
            <main className={"flex flex-1 min-h-screen justify-between items-center flex-col md:flex-row"}>
                <SideMenu />
                {props.children}
            </main>
        </div>
    )
}
