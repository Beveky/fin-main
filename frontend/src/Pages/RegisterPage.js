import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Link,
  TextField,
  Button,
  CssBaseline,
  Avatar,
  
} from "@mui/material/";
import { useDispatch } from "react-redux";
import { login, register } from "../Redux/userSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [formValue, setFormValue] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    dateNaissance:"",
    company:"",
    maladie:"",
  });
  const changeHandler = (e) => {
    e.preventDefault();
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };
  const { firstName, lastName, email, password, dateNaissance, company, maladie } = formValue;
  const dispatch = useDispatch();
  const registerHandler = (e) => {
    e.preventDefault();
    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      dateNaissance === "" ||
     company === "" ||
     maladie === "" ||
      password === ""
    ) {
      toast.warning("Please Enter all the fields");
    } else {
      dispatch(register(formValue));
    }
  };
  const navigate = useNavigate();
  const inscrip = (e) => {
    e.preventDefault();
    dispatch(login());
    navigate("/login");
  };
  return (
    <div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
        onSubmit={inscrip}
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{ mt: 3 }}
            onSubmit={registerHandler}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  onChange={changeHandler}
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  onChange={changeHandler}
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  onChange={changeHandler}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={changeHandler}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  onChange={changeHandler}
                  required
                  fullWidth
                  name="dateNaissance"
                  label="j/Naissance"
                  type="dateNaissance"
                  id="dateNaissance"
                  autoComplete="jour"
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  onChange={changeHandler}
                  required
                  fullWidth
                  name="dateNaissance"
                  label="m//Naissance"
                  type="dateNaissance"
                  id="dateNaissance"
                  autoComplete="mois"
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  onChange={changeHandler}
                  required
                  fullWidth
                  name="dateNaissance"
                  label="A/Naissance"
                  type="dateNaissance"
                  id="dateNaissance"
                  autoComplete="Anné"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={changeHandler}
                  required
                  fullWidth
                  id="company"
                  label="Fonction"
                  name="company"
                  autoComplete="company"
                />
              </Grid>
            
              <Grid item xxl={12} sm={40}>
                <TextField
                  onChange={changeHandler}
                  autoComplete="given-name"
                  name="maladie"
                  required
                  fullWidth
                  id="maladie"
                  label="Veuillez entrer votre maladie chronique"
                  autoFocus
                />
              </Grid>
             
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default RegisterPage;
