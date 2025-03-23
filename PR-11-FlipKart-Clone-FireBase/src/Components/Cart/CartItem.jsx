import { Card, Box, Typography, Button, styled } from '@mui/material';
import GroupButton from './GroupButton';

const Component = styled(Card)`
    border-top: 1px solid #f0f0f0;
    border-radius: 0px;
    display: flex;
`;

const LeftComponent = styled(Box)`
    margin: 20px; 
    display: flex;
    flex-direction: column;
    align-items: center;
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
    text-decoration: line-through;
`;

const Discount = styled(Typography)`
    color: #388E3C;
    font-weight: 500;
`;

const Remove = styled(Button)`
    margin-top: 20px;
    font-size: 16px;
    color: red;
`;

const CartItem = ({ item, removeItemFromCart, userId }) => {
    const fassured = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png';

    // Calculate Discount
    const discount = item.price ? Math.round(((item.price - item.price) / item.price) * 100) : 0;

    return (
        <Component>
            <LeftComponent>
                <img src={item.image} alt={item.title} style={{ height: 110, width: 110 }} />
                <GroupButton />
            </LeftComponent>
            <Box style={{ margin: 20 }}>
                <Typography>{item.title}</Typography>
                <SmallText>
                    Seller: RetailNet
                    <span><img src={fassured} alt="Fassured" style={{ width: 50, marginLeft: 10 }} /></span>
                </SmallText>
                <Typography style={{ margin: '20px 0' }}>
                    <Cost component="span">₹{item.price}</Cost>&nbsp;&nbsp;&nbsp;
                    {item.price && <MRP component="span">₹{item.price}</MRP>}&nbsp;&nbsp;&nbsp;
                    {discount > 0 && <Discount component="span">{discount}% off</Discount>}
                </Typography>
                <Remove onClick={() => removeItemFromCart(item.id, userId)}>Remove</Remove>
            </Box>
        </Component>
    );
}

export default CartItem;
