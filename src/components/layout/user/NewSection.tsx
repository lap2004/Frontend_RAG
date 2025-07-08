"use client";

import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { motion } from "framer-motion";
import Link from "next/link";

const MotionBox = motion(Box);

export default function NewSection() {
  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        overflow: "hidden",
        minHeight: { xs: 600, md: 680 },
        display: "flex",
        alignItems: "center",
      }}
    >
    
      {/* vid va backdrop */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: -2,
          pointerEvents: "none",
          overflow: "hidden",
        }}
      >
        <video
          src="testVideo.mp4"  
          autoPlay
          loop
          muted
          playsInline
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />

        <Box
          sx={{
            position: "absolute",
            inset: 0,
            bgcolor: alpha("#000", 0.4), 
          }}
        />
      </Box>

      {/* noi dung */}
      <Container maxWidth="lg">
        <Grid container alignItems="center">
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Box sx={{ mt: { xs: 8, md: 12 } }}>
              <Typography
                component="span"
                sx={{
                  display: "inline-block",
                  py: 1,
                  px: 3,
                  mb: 4,
                  borderRadius: 999,
                  fontWeight: 600,
                  bgcolor: "rgba(98,99,255,.20)",
                  color: "#6263FF",
                  fontSize: "0.95rem",
                }}
              >
                Ứng dụng quản lý thời gian thế hệ mới
              </Typography>

              <Typography
                variant="h2"
                sx={{
                  mb: 6,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  lineHeight: 1.2,
                  fontSize: { xs: "2rem", md: "3rem" },
                  backgroundImage: "linear-gradient(to right, #f5f5f5, #e2e2e2)",
                  color: "transparent",
                  WebkitBackgroundClip: "text",
                }}
              >
                Khát Vọng Tương Lai,
                <br />
                <Box component="span" sx={{ color: "#fff" }}>
                  Công Nghệ Dẫn Lối
                </Box>
              </Typography>

              <Typography
                sx={{
                  mb: 8,
                  fontSize: { xs: "1rem", md: "1.25rem" },
                  maxWidth: 480,
                  color: "#f0f0f0",
                }}
              >
                Tối ưu hoá thời gian và nâng cao hiệu suất với DO⁺, ứng dụng quản lý
                công việc thông minh tích hợp AI dành cho thế hệ Gen Z năng động.
              </Typography>

              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                <Button
                  component={Link}
                  href="/product"
                  variant="contained"
                  sx={{
                    bgcolor: "#6263FF",
                    px: 4,
                    py: 1.5,
                    borderRadius: 3,
                    fontWeight: 600,
                    textTransform: "none",
                    "&:hover": { bgcolor: "#4C50DE" },
                  }}
                >
                  Khám phá DO⁺
                </Button>
                <Button
                  component={Link}
                  href="/contact"
                  variant="outlined"
                  sx={{
                    borderColor: "#6263FF",
                    color: "#6263FF",
                    px: 4,
                    py: 1.5,
                    borderRadius: 3,
                    fontWeight: 600,
                    textTransform: "none",
                    "&:hover": {
                      bgcolor: "rgba(98,99,255,.1)",
                      borderColor: "#4C50DE",
                    },
                  }}
                >
                  Liên hệ với chúng tôi
                </Button>
              </Box>
            </Box>
          </MotionBox>
        </Grid>
      </Container>
    </Box>
  );
}
