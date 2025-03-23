import { useState, useEffect } from "react";
import { styled, Box, Typography, Grid, CircularProgress } from "@mui/material";
import ProductDetail from "./ProductDetail";
import ActionItem from "./ActionItem";
import { useParams } from "react-router-dom";
import { getProductById } from "../../service/api"; // Import Firebase function

const Component = styled(Box)`
  margin-top: 55px;
  background: #f2f2f2;
`;

const Container = styled(Grid)(({ theme }) => ({
  background: "#FFFFFF",
  display: "flex",
  [theme.breakpoints.down("md")]: {
    margin: 0,
  },
}));

const RightContainer = styled(Grid)`
  margin-top: 50px;
  & > p {
    margin-top: 10px;
  }
`;

const DetailView = () => {
    const { id } = useParams(); // Get Product ID from URL
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            const data = await getProductById(id);
            if (data) {
                setProduct(data);
            }
            setLoading(false);
        };
        fetchProduct();
    }, [id]);

    console.log(product);

    if (loading) {
        return <Box textAlign="center" mt={5}><CircularProgress /></Box>;
    }

    if (!product) {
        return <Typography textAlign="center" mt={5} variant="h6">Product Not Found</Typography>;
    }

    return (
        <Component>
            <Container container>
                <Grid item lg={4} md={4} sm={8} xs={12}>
                    <ActionItem product={product} />
                </Grid>
                <RightContainer item lg={8} md={8} sm={8} xs={12}>
                    <Typography variant="h5" fontWeight="bold">{product.title}</Typography>
                    <Typography style={{ marginTop: 5, color: "#878787", fontSize: 14 }}>
                        8 Ratings & 1 Reviews
                    </Typography>
                    <Typography>
                        <span style={{ fontSize: 28, fontWeight: "bold" }}>₹{product.price}</span>
                    </Typography>
                    <ProductDetail product={product} />
                </RightContainer>
            </Container>
        </Component>
    );
};

export default DetailView;
