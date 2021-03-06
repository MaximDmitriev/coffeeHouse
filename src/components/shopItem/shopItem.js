import React from 'react';
import styled from "styled-components";
import { Link } from 'react-router-dom';

const Item = styled.div`
    width: 225px;
    min-height: 240px;
    margin: 60px 40px 0 40px;
    padding: 22px 24px;
    background: rgba(255, 255, 255, 0.65);
    border-radius: 8px;
    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.25);
    transition: 0.3s all;
    cursor: pointer;
    :hover{
        box-shadow: 5px 5px 30px rgba(0, 0, 0, 0.25);
    }
    img{
        display: block;
        margin: 0 auto;
        width: 151px;
        height: 130px;
        object-fit: cover;
    }
    .item-title, .item-price, .item-country{
        font-size: 14px;
        margin-top: 10px;
        text-align: right;
    }
`

const ShopItem = ({url, name, price, country, link}) => {

    const content = link ? <ViewLink
                                url={url}
                                name={name}
                                country={country}
                                price={price}/> :
                            <View
                                url={url}
                                name={name}
                                country={country}
                                price={price}/>

    return(
        <>
            {content}
        </>
    )

}

const View = ({url, name, country, price}) => {

    return(
        <Item>
            <img src={url} alt="coffee" />
            <div className="item-title">{name}</div>
            <div className="item-country">{country}</div>
            <div className="item-price">{price}</div>
        </Item>
    )
}

const ViewLink = ({url, name, country, price}) => {

    const urlId = "/items/" + name.toLowerCase().split(" ")[0];

    return(
        <Link to={urlId}>
            <Item>
                <img src={url} alt="coffee" />
                <div className="item-title">{name}</div>
                <div className="item-country">{country}</div>
                <div className="item-price">{price}</div>
            </Item>
        </Link>
    )
}

export default ShopItem;