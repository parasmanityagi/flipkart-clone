import React, { useState } from 'react'
import { Box, Button, styled } from '@mui/material';
import { ShoppingCart as Cart, FlashOn as Flash } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../redux/actions/cartActions.js'
import { payUsingPaytm } from '../../service/api.js'
import { post } from '../../utils/paytm.js';

const LeftContainer = styled(Box)(({ theme }) => ({
    minWidth: '40%',
    padding: '40px 0 0 80px',
    [theme.breakpoints.down('lg')]: {
        padding: '20px 40px'
    }
}))

const Image = styled('img')({
    padding: '15px',
    width: '95%'
});

const StyledButton = styled(Button)(({ theme }) => ({
    width: '46%',
    borderRadius: '2px',
    height: '50px',
    color: '#FFF',
    [theme.breakpoints.down('lg')]:{
        width: '44%'
    },
    [theme.breakpoints.down('sm')]:{
        width: '98%'
    }
}))

const ActionItem = ({ product }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const[quantity, setQuantity] = useState(1);
    const {_id} = product;

    const addItemToCart = () => {
        dispatch(addToCart({_id, quantity}))
        navigate('/cart')
    }

    const buyNow =async () => {
        try {
            const response = await payUsingPaytm({ amount: 500, email: 'test.website@gmail.com' });
            const information = {
                action: 'https://securegw-stage.paytm.in/order/process',
                params: response,
            };
            post(information);
        } catch (error) {
            console.error(`Error while calling payment API: ${error.message}`);
        }
    }

    return (
        <LeftContainer>
            <Box style={{ padding: '15px 20px', border: '1px solid #f0f0f0' }}>
                <Image src={product.detailUrl} alt="product-image" />
            </Box>
            <StyledButton variant='contained' onClick={()=> addItemToCart()} style={{ marginRight: 10, background: '#ff9f00' }}><Cart />Add to Cart</StyledButton>
            <StyledButton variant='contained' style={{ background: '#fb541b' }} onClick={()=> buyNow()}><Flash />Buy Now</StyledButton>
        </LeftContainer>
    )
}

export default ActionItem