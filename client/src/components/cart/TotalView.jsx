import React, { useState, useEffect } from 'react'
import { Box, Divider, Typography, styled } from '@mui/material'

const Header = styled(Box)`
    padding: 15px 24px;
    background: #fff;
    borderBottom: 1px solid #f0f0f0;
`;

const Heading = styled(Typography)`
    color: #878787;
`;

const Container = styled(Box)`
    padding: 15px 24px;
    background: #fff;
    & > p {
        margin-bottom: 20px;
        font-size: 14px;
    },
    & > h6{
      margin-bottom: 20px;
  }
`;

const Price = styled(Box)`
    float: right;
`;

const TotalAmount = styled(Typography)`
    font-size: 18px;
    font-weight: 600;
    border-top: 1px dashed #e0e0e0;
    padding: 20px 0;
    border-bottom: 1px dashed #e0e0e0;
`;

const Discount = styled(Typography)`
    font-size: 16px; 
    color: green;
    font-weight: 500;
`

const TotalView = ({ cartItems }) => {
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    totalAmount();
  }, [cartItems]);

  const totalAmount = () => {
    let price = 0;
    let discount = 0;
    cartItems.map(item => {
      price += item.price.mrp;
      discount += (item.price.mrp - item.price.cost);
    });
    setPrice(price);
    setDiscount(discount);
  }
  return (
    <Box>
      <Header>
        <Heading>PRICE DETAILS</Heading>
      </Header>

      <Container>
        <Typography>Price ({cartItems?.length} item) <Price component="span">₹{price}</Price></Typography>
        <Typography>Discount <Price component="span">-₹{discount}</Price></Typography>
        <Typography>Delivary Charges<Price component="span">₹40</Price></Typography>
        <Divider />
        <TotalAmount>Total Amount<Price component="span">₹{price - discount + 40}</Price></TotalAmount>
        <Discount>You Will Save ₹{discount - 40} on this order</Discount>
      </Container>
    </Box>
  )
}

export default TotalView