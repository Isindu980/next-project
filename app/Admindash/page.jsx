"use client";

import { useState, useEffect } from "react";
import { Card, CardMedia, CardContent, CardActions, Typography, Grid, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { addProduct, updateProduct, deleteProduct } from "../../store/productSlice";

export default function AdminDashboard() {
  const [form, setForm] = useState({
    id: "",
    name: "",
    price: "",
    imageUrl: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const products = useSelector((state) => state.products);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    } else {
      router.push("/");
    }
  }, [token, router]);

  if (!isLoggedIn) {
    return null;
  }

  // this is the function that will be called when the user clicks the "Add" button in the dialog
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // this is the function that will be called when the user selects an image file
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  // this is the function that will be called when the user clicks the "Add" button in the dialog and this function will add the product to the redux store
  const handleAddProduct = () => {
    if (form.name && form.price && imageFile) {
      const newProduct = {
        ...form,
        id: Date.now(),
        imageUrl: URL.createObjectURL(imageFile),
      };
      dispatch(addProduct(newProduct));
      resetForm();
      setIsDialogOpen(false);
    }
  };

  // this is the function that will be called when the user clicks the "Edit" button on a product card
  const handleEditProduct = (product) => {
    setForm(product);
    setImagePreview(product.imageUrl);
    setIsEditMode(true);
    setIsDialogOpen(true);
  };

  // this is the function that will be called when the user clicks the "Update" button in the dialog and this function will update the product in the redux store
  const handleUpdateProduct = () => {
    const updatedProduct = {
      ...form,
      imageUrl: imageFile ? URL.createObjectURL(imageFile) : form.imageUrl,
    };
    dispatch(updateProduct(updatedProduct));
    resetForm();
    setIsEditMode(false);
    setIsDialogOpen(false);
  };

  // this is the function that will be called when the user clicks the "Delete" button on a product card and this function will delete the product from the redux store
  const handleDeleteProduct = (id) => {
    dispatch(deleteProduct(id));
  };

  // this is the function that will be called to reset the form fields and image preview
  const resetForm = () => {
    setForm({ id: "", name: "", price: "", imageUrl: "" });
    setImageFile(null);
    setImagePreview(null);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center", marginTop: "80px", fontSize: "2rem", fontWeight: "bold" }}>
        Admin Dashboard
      </h1>

      <h2>Products</h2>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <Card
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "318px",
              cursor: "pointer",
            }}
            onClick={() => {
              resetForm();
              setIsEditMode(false);
              setIsDialogOpen(true);
            }}
          >
            <AddIcon style={{ fontSize: "50px", color: "#3B82F6" }} />
          </Card>
        </Grid>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card>
              <CardMedia
                component="img"
                height="194"
                image={product.imageUrl}
                alt={product.name}
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary" align="center">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" align="center">
                  Available for LKR {product.price}.
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <Button onClick={() => handleEditProduct(product)} style={{ marginRight: "10px" }}>
                  Edit
                </Button>
                <Button onClick={() => handleDeleteProduct(product.id)}>Delete</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>{isEditMode ? "Edit Product" : "Add Product"}</DialogTitle>
        <DialogContent>
          <TextField
            name="name"
            label="Product Name"
            fullWidth
            value={form.name}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            name="price"
            label="Price"
            type="number"
            fullWidth
            value={form.price}
            onChange={handleInputChange}
            margin="normal"
          />
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            required={!isEditMode}
            style={{ marginTop: "16px" }}
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              style={{ marginTop: "16px", maxWidth: "100px", borderRadius: "0.375rem" }}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={isEditMode ? handleUpdateProduct : handleAddProduct}
            color="primary"
          >
            {isEditMode ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}