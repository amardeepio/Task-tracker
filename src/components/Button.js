import propTypes from 'prop-types';
import PropTypes from 'prop-types';
const Button = ({color,text,onClick}) => {

    return (
        <button onClick={onClick} style={{backgroundColor: color}} className="btn">{text}</button>
        
    )
}


Button.defaultProps = {
    color: 'steelblue',
}

Button.prototype = {
    Text: propTypes.string,
    color: propTypes.string,
    onClick : propTypes.func
}

export default Button
