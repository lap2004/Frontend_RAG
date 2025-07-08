"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { motion } from "framer-motion";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import { useUserSignup } from "@/src/services/hooks/hookAuth";

export default function RegisterPage() {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    role: "student",
    password: "",
  });
  const router = useRouter();
  const { postUserSignup } = useUserSignup();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await postUserSignup({
        email: form.email,
        full_name: form.full_name,
        role: form.role,
        password: form.password
      });
      toast.success("Đăng ký tài khoản thành công.");
      router.push("/login");
    } catch (err: any) {
      console.error(err);
      toast.error(
        err.response?.data?.detail || "Lỗi đăng ký. Vui lòng thử lại."
      );
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8, mb: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Paper elevation={3} sx={{ p: 4, mt: 6 }}>
          <Box component="form" onSubmit={handleSubmit} >
            <Typography variant="h5" gutterBottom>
              Đăng ký tài khoản
            </Typography>

            <TextField
              fullWidth
              label="Họ và tên"
              name="full_name"
              margin="normal"
              required
              value={form.full_name}
              onChange={handleChange}
            />

            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              margin="normal"
              required
              value={form.email}
              onChange={handleChange}
            />

            <TextField
              fullWidth
              label="Mật khẩu"
              name="password"
              type="password"
              margin="normal"
              required
              value={form.password}
              onChange={handleChange}
            />

            <Button fullWidth type="submit" variant="contained" sx={{ mt: 2 }} color="error">
              Đăng ký
            </Button>

            <Typography
              variant="body2"
              align="center"
              sx={{
                mt: 2,
                color: "primary.main",
                cursor: "pointer",
                transition: "all 0.3s ease",
                '&:hover': { color: '#1F2251' }
              }}
              onClick={() => router.push("/user/home")}
            >
              <ArrowLeftIcon fontSize="small" sx={{ verticalAlign: "middle" }} />
              Trang chủ
            </Typography>

          </Box>
        </Paper>
      </motion.div>
    </Container>
  );
}
