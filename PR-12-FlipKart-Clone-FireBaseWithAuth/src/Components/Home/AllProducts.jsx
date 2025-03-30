import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { db } from "../../server/firebaseConfig";
import { Link } from "react-router-dom";

export default function ProductCarousel() {
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

    if (loading) return <p>Loading...</p>;

    // Function to truncate description to 10 words
    const truncateDescription = (text) => {
        if (!text) return "";
        const words = text.split(" ");
        return words.length > 10 ? words.slice(0, 10).join(" ") + "..." : text;
    };

    return (
        <Box sx={{ maxWidth: "1200px", mx: "auto", mt: 3, p: 2, background: "#fff", borderRadius: 2 }}>
            {/* Section Header */}
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                Best of Electronics
            </Typography>

            {/* Horizontal Scroll Container */}
            <Box sx={{
                display: "flex",
                overflowX: "auto",
                gap: 3,
                pb: 2,
                "&::-webkit-scrollbar": { display: "none" }, // Hide scrollbar
            }}>
                {products.map((product) => (
                    <Card
                        key={product.id}
                        component={Link}
                        to={`/product/${product.id}`}
                        sx={{
                            width: "160px",
                            textAlign: "center",
                            textDecoration: "none",
                            color: "inherit",
                            borderRadius: 2,
                            p: 1,
                            transition: "0.3s",
                            "&:hover": { boxShadow: 6, transform: "scale(1.05)" },
                        }}
                    >
                        <CardMedia
                            component="img"
                            sx={{ width: "100%", height: "120px", objectFit: "contain", background: "#f8f8f8" }}
                            image={product.image || "/placeholder.png"}
                            alt={product.title}
                        />
                        <CardContent sx={{ p: 0.5 }}>
                            <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                                {product.title}
                            </Typography>
                            <Typography variant="caption" sx={{ color: "#388e3c", fontWeight: "bold" }}>
                                ₹{product.price}
                            </Typography>
                            <Typography variant="caption" sx={{ color: "gray", display: "block", mt: 0.5 }}>
                                {truncateDescription(product.instructions || "Top brands")}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Box>
    );
}
