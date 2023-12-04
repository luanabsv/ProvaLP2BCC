import Menu from "./Menu.jsx"


export default function Pagina(props) {
    return (
        <>
            
             <Menu /> 
            <div>
                {props.children}
            </div>
        </>
    )
}