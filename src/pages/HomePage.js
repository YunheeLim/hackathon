import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import EventIcon from "@mui/icons-material/Event";
import ListAltIcon from "@mui/icons-material/ListAlt";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const HomePage = () => {
  const navigate = useNavigate();

  const recentEvents = [
    {
      id: 1,
      title: "2024 기술 컨퍼런스",
      date: "2024-01-15",
      location: "서울 코엑스",
      status: "신청 가능",
    },
    {
      id: 2,
      title: "스타트업 네트워킹 데이",
      date: "2024-01-20",
      location: "강남구 스타트업 허브",
      status: "신청 마감",
    },
    {
      id: 3,
      title: "AI 워크샵",
      date: "2024-01-25",
      location: "판교 테크노밸리",
      status: "신청 가능",
    },
  ];

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      {/* Hero Section */}
      <Paper
        sx={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          py: 8,
          mb: 4,
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            align="center"
            sx={{ fontWeight: "bold" }}
          >
            행사신청 플랫폼에 오신 것을 환영합니다
          </Typography>
          <Typography variant="h5" align="center" sx={{ opacity: 0.9, mb: 4 }}>
            다양한 행사에 쉽고 빠르게 신청하세요
          </Typography>
          <Box sx={{ textAlign: "center" }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate("/events")}
              sx={{
                backgroundColor: "white",
                color: "#667eea",
                "&:hover": {
                  backgroundColor: "#f5f5f5",
                },
                px: 4,
                py: 1.5,
              }}
            >
              행사 둘러보기
            </Button>
          </Box>
        </Container>
      </Paper>

      <Container maxWidth="lg">
        {/* Recent Events Section */}
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          align="center"
          sx={{ mb: 4 }}
        >
          최근 행사
        </Typography>
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {recentEvents.map((event) => (
            <Grid item xs={12} md={4} key={event.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" component="h3" gutterBottom>
                    {event.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    📅 {event.date}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    📍 {event.location}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color:
                        event.status === "신청 가능"
                          ? "success.main"
                          : "error.main",
                      fontWeight: "bold",
                    }}
                  >
                    {event.status}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    onClick={() => navigate(`/events/${event.id}`)}
                    disabled={event.status === "신청 마감"}
                  >
                    자세히 보기
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* CTA Section */}
        <Box sx={{ textAlign: "center", py: 4 }}>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate("/events")}
            sx={{ px: 4, py: 1.5 }}
          >
            모든 행사 보기
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;
