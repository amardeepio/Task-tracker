import Button from "./Button"
const Header = ({title,onAdd,showAdd}) => {

  
    return (
        <header className="header">
            <h1>Task Tracker</h1>
            <Button color={showAdd ? 'red' : 'Green'} text={showAdd ? 'close' : 'Add'} onClick = {onAdd}></Button>
            
        </header>

    )
}

export default Header

// CSS in jS
// const headingStyle = {
//     color: 'red',
//     backgroundColor: 'black',
// }