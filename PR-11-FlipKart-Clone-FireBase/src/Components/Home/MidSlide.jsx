import { Box, styled } from '@mui/material';
import Slide from './Slide';

const Component = styled(Box)`
    display: flex;
`;

const LeftComponent = styled(Box)(({ theme }) => ({
    width: '83%',
    [theme.breakpoints.down('md')]: {
        width: '100%'
    }
}));

const RightComponent = styled(Box)(({ theme }) => ({
    marginTop: 10,
    background: '#FFFFFF',
    width: '17%',
    marginLeft: 10,
    padding: 5,
    textAlign: 'center',
    [theme.breakpoints.down('md')]: {
        display: 'none'
    }
}));

const AdImage = styled('img')({
    width: 217
});

const MidSlide = ({ products = [] }) => { // Default value to avoid errors
    const adURL = 'https://rukminim1.flixcart.com/flap/464/708/image/633789f7def60050.jpg?q=70';

    return (
        <Component>
            <LeftComponent>
                <Slide 
                    data={products} 
                    title='Deals of the Day'
                    timer={true} 
                    multi={true} 
                />
            </LeftComponent>
            <RightComponent>
                <AdImage src={adURL} alt="Advertisement" />
            </RightComponent>
        </Component>
    );
};

export default MidSlide;
