import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { motion } from "framer-motion";
const majors = [
    { title: "THIẾT KẾ", icon: "https://ext.same-assets.com/3671364340/1546733673.png" },
    { title: "LUẬT - KINH DOANH & QUẢN LÝ", icon: "https://ext.same-assets.com/3671364340/240114473.png" },
    { title: "TRUYỀN THÔNG", icon: "https://ext.same-assets.com/3671364340/4240619985.png" },
    { title: "XÃ HỘI NHÂN VĂN - NGÔN NGỮ", icon: "https://ext.same-assets.com/3671364340/273649144.png" },
    { title: "CÔNG NGHỆ - KỸ THUẬT", icon: "https://ext.same-assets.com/3671364340/2940056520.png" },
    { title: "KIẾN TRÚC", icon: "https://ext.same-assets.com/3671364340/3458008392.png" },
    { title: "KHOA HỌC SỨC KHỎE", icon: "https://ext.same-assets.com/3671364340/709881049.png" },
    { title: "NGHỆ THUẬT", icon: "https://ext.same-assets.com/3671364340/352056085.png" },
    { title: "DU LỊCH", icon: "https://ext.same-assets.com/3671364340/2165468724.png" },
];

const Major = () => (
    <Grid
        container
        spacing={3}
        sx={{
            maxWidth: { md: 1440 },
            // mx: "auto",
            px: { xs: 2, md: 4 },
        }}
    >
        {majors.map((m, i) => (
            <Grid item xs={12} sm={6} md={4} key={m.title}>
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.45, delay: i * 0.05 }}
                >
                    <Card
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            borderRadius: 2,
                            transition: "transform .3s",
                            "&:hover": { transform: "translateY(-4px)", boxShadow: 4 },
                        }}
                    >
                        <CardMedia
                            component="img"
                            image={m.icon}
                            alt={m.title}
                            sx={{
                                width: { xs: 60, md: 80 },   
                                height: { xs: 60, md: 80 },
                                p: 2,
                            }}
                        />
                        <CardContent sx={{ textAlign: "center", py: { xs: 1, md: 2 } }}>
                            <Typography
                                fontWeight="bold"
                                sx={{ fontSize: { xs: "0.9rem", md: "1.1rem" } }}
                            >
                                {m.title}
                            </Typography>
                        </CardContent>
                    </Card>
                </motion.div>
            </Grid>
        ))}
    </Grid>
);

export default Major;
