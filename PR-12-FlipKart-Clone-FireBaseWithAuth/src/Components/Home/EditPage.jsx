import { useEffect, useState } from "react";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../../server/firebaseConfig";
import { Box, TextField, Button, Typography, Card, CardContent, CardMedia } from "@mui/material";

export default function EditProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingProduct, setEditingProduct] = useState(null);

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

    const handleEditClick = (product) => {
        setEditingProduct({ ...product });
    };

    const handleInputChange = (e) => {
        setEditingProduct({ ...editingProduct, [e.target.name]: e.target.value });
    };

    const handleSaveChanges = async () => {
        if (!editingProduct) return;
        try {
            const productRef = doc(db, "products", editingProduct.id);
            await updateDoc(productRef, {
                title: editingProduct.title,
                price: editingProduct.price,
                instructions: editingProduct.instructions,
                image: editingProduct.image
            });
            setProducts(products.map(p => (p.id === editingProduct.id ? editingProduct : p)));
            setEditingProduct(null);
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <Box sx={{ maxWidth: "1200px", mx: "auto", mt: 3, p: 2, background: "#fff", borderRadius: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                Edit Products
            </Typography>

            {editingProduct ? (
                <Box sx={{ p: 2, border: "1px solid #ddd", borderRadius: 2, mb: 3 }}>
                    <Typography variant="h6">Editing: {editingProduct.title}</Typography>
                    <TextField 
                        label="Title" 
                        name="title"
                        value={editingProduct.title} 
                        onChange={handleInputChange} 
                        fullWidth 
                        sx={{ mb: 2 }}
                    />
                    <TextField 
                        label="Price" 
                        name="price"
                        value={editingProduct.price} 
                        onChange={handleInputChange} 
                        fullWidth 
                        sx={{ mb: 2 }}
                    />
                    <TextField 
                        label="Description" 
                        name="instructions"
                        value={editingProduct.instructions} 
                        onChange={handleInputChange} 
                        fullWidth 
                        sx={{ mb: 2 }}
                    />
                    <TextField 
                        label="Image URL" 
                        name="image"
                        value={editingProduct.image} 
                        onChange={handleInputChange} 
                        fullWidth 
                        sx={{ mb: 2 }}
                    />
                    <Button variant="contained" color="primary" onClick={handleSaveChanges} sx={{ mr: 2 }}>
                        Save Changes
                    </Button>
                    <Button variant="outlined" color="secondary" onClick={() => setEditingProduct(null)}>
                        Cancel
                    </Button>
                </Box>
            ) : (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
                    {products.map((product) => (
                        <Card key={product.id} sx={{ width: "200px", textAlign: "center", borderRadius: 2 }}>
                            <CardMedia
                                component="img"
                                sx={{ height: "150px", objectFit: "contain", background: "#f8f8f8" }}
                                image={product.image || "/placeholder.png"}
                                alt={product.title}
                            />
                            <CardContent>
                                <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                                    {product.title}
                                </Typography>
                                <Typography variant="caption" sx={{ color: "#388e3c", fontWeight: "bold" }}>
                                    ₹{product.price}
                                </Typography>
                                <Typography variant="caption" sx={{ color: "gray", display: "block", mt: 0.5 }}>
                                    {product.instructions}
                                </Typography>
                                <Button variant="outlined" sx={{ mt: 1 }} onClick={() => handleEditClick(product)}>
                                    Edit
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            )}
        </Box>
    );
}
