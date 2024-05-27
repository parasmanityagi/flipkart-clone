import React from 'react'
import { Box, Button, Card, Typography, styled } from '@mui/material'
import { addElipsis } from '../../utils/common-utils';
import { removeFromCart } from '../../redux/actions/cartActions'
import { useDispatch } from 'react-redux';
import GroupedButton from './ButtonGroup';

const Component = styled(Card)`
    border-top: 1px solid #f0f0f0;
    border-radius: 0px;
    display: flex;
    background: #fff;
`;

const LeftComponent = styled(Box)`
    margin: 20px; 
    display: flex;
    flex-direction: column;
`;

const SmallText = styled(Typography)`
    color: #878787;
    font-size: 14px;
    margin-top: 10px;
`;

const Cost = styled(Typography)`
    font-size: 18px;
    font-weight: 600;
`;

const MRP = styled(Typography)`
    color: #878787;
`;

const Discount = styled(Typography)`
    color: #388E3C;
`;

const Remove = styled(Button)`
    margin-top: 20px;
    font-size: 16px;
`;

const CartItem = ({ item }) => {
    const fassured = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png';
    
    const dispatch = useDispatch()
    
    const removeItemFromCart = (_id) => {
        dispatch(removeFromCart(_id));
    }
   
    return (
        <>
            <Component>
                <LeftComponent>
                    <img src={item.url} alt="product" style={{height: 110, width:110}}/>
                    <GroupedButton/>
                </LeftComponent>

                <Box style={{margin: 20}}>
                    <Typography>{addElipsis(item.title.longTitle)}</Typography>
                    <SmallText>Seller: RetailNet
                        <Box component="span"><img src={fassured} alt="flipkart" style={{ width: 50, marginLeft: 10 }} /></Box>
                    </SmallText>
                    <Typography style={{margin: '20px 0'}}>
                        <Box component="span" style={{ fontWeight: 600, fontSize: 18 }}>₹{item.price.cost}</Box>&nbsp;
                        <Box component="span" style={{ color: '#878787' }}><strike>{item.price.mrp}</strike></Box>&nbsp;
                        <Box component="span" style={{ color: '#388e3c' }}>{item.price.discount} off</Box>
                    </Typography>

                    <Remove onClick={() => removeItemFromCart(item._id)}>Remove</Remove>
                </Box>
            </Component>
        </>
    )
}

export default CartItem