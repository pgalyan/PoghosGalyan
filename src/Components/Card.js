function Card({title,text,img, imgAlt}){
    return(
        <div className='card'>
            <div className='card_img'><img src={img} alt={imgAlt}></img></div>
            <div className='card_tittle'>
                {title}
            </div>
            <div className='card_text'>
                {text}
            </div>
        </div>
    )

}

export default Card;