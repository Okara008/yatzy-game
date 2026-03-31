function Btn_cell({image, content, boxFocus, totalp1, totalp2}) {
    
    return(
        <div>
            <div className="imgTooltip">
                <img src={image} alt="image" className="moveImg"/>
                <small>{content}</small>
            </div>
            <button className="yellowsquare pointBox" disabled onFocus={boxFocus}>{totalp1}</button>                
            <button className="greensquare pointBox" disabled onFocus={boxFocus}>{totalp2}</button>                
        </div>
    )
}

export default Btn_cell