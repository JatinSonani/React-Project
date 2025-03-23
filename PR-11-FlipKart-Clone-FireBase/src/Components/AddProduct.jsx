import { useState } from "react";
import { Button, TextField, Card, CardContent, Typography, Box, IconButton } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { addProduct } from "../service/api";

export default function AddProductPage() {
    const [product, setProduct] = useState({
        title: "",
        instructions: "",
        features: "",
        image: "",
        price: ""
    });
    const [imagePreview, setImagePreview] = useState(null);

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProduct({ ...product, image: reader.result });
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newProduct = await addProduct(product);
        if (newProduct) alert("Product added successfully!");
    };

    return (
        <Card sx={{ maxWidth: 500, mx: "auto", mt: 5, p: 3, boxShadow: 3 }}>
            <CardContent>
                <Typography variant="h5" component="div" gutterBottom align="center" fontWeight="bold">
                    Add Product
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField fullWidth label="Title" name="title" value={product.title} onChange={handleChange} margin="normal" required />
                    <TextField fullWidth label="Instructions" name="instructions" value={product.instructions} onChange={handleChange} margin="normal" required />
                    <TextField fullWidth label="Features" name="features" value={product.features} onChange={handleChange} margin="normal" required />
                    <TextField fullWidth label="Price" name="price" type="number" value={product.price} onChange={handleChange} margin="normal" required />

                    <Box mt={2} textAlign="center">
                        {imagePreview && (
                            <img src={imagePreview} alt="Preview" style={{ width: "100%", maxHeight: 200, borderRadius: 8, objectFit: "cover" }} />
                        )}
                        <Button
                            variant="contained"
                            component="label"
                            startIcon={<CloudUploadIcon />}
                            sx={{ mt: 2, width: "100%" }}
                        >
                            Upload Image
                            <input type="file" hidden accept="image/*" onChange={handleImageChange} />
                        </Button>
                    </Box>

                    <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3, py: 1.5 }}>
                        Add Product
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
