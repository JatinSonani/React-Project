import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { Card, CardContent, CardMedia, Typography, Grid, CircularProgress } from "@mui/material";
import { db } from "../../server/firebaseConfig";
import { Link } from "react-router-dom";

export default function ProductListPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "products"));
                const productList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setProducts(productList);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    if (loading) return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 5 }} />;

    return (
        <Grid container spacing={4} sx={{ p: 3 }}> {/* Increased spacing */}
        {products.map((product) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            key={product.id}
            sx={{
              boxShadow: 3, 
              border: '3px solid #727272',
              gap: 2,
              borderRadius: 2,
              backgroundColor: '#fff',
              overflow: 'hidden', 
              transition: '0.3s',
              '&:hover': {
                boxShadow: 6, 
                transform: 'scale(1.02)', 
              },
            }}
          >
            <Card
              component={Link}
              to={`/product/${product.id}`}
              sx={{
                textDecoration: 'none',
                color: 'inherit',
                boxShadow: '#727272', 
                borderRadius: 2, 
              }}
            >
              <CardMedia
                component="img"
                sx={{ aspectRatio: 2 / 1, objectFit: 'contain' }}
                image={product.image}
                alt={product.title}
              />
              <CardContent>
                <Typography variant="h6">{product.title}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {product.instructions}
                </Typography>
                <Typography variant="subtitle1" sx={{ mt: 1, fontWeight: 'bold' }}>
                  ${product.price}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      
    );
}

{/* <Grid container spacing={5} sx={{ p: 3 }}>
            {products.map(product => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                    <Card component={Link} to={`/product/${product.id}`} sx={{ textDecoration: 'none', color: 'inherit' }}>
                        <CardMedia component="img"  sx={{aspectRatio: 2/1, objectFit:"contain"}} image={product.image} alt={product.title} />
                        <CardContent>
                            <Typography variant="h6">{product.title}</Typography>
                            <Typography variant="body2" color="textSecondary">{product.instructions}</Typography>
                            <Typography variant="subtitle1" sx={{ mt: 1, fontWeight: 'bold' }}>${product.price}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid> */}