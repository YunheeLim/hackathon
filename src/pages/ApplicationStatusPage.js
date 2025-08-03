import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import EventIcon from "@mui/icons-material/Event";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PersonIcon from "@mui/icons-material/Person";

const ApplicationStatusPage = () => {
  const navigate = useNavigate();

  // 실제로는 API에서 데이터를 가져와야 함
  const applications = [
    {
      id: 1,
      eventId: 1,
      eventTitle: "2024 기술 컨퍼런스",
      eventDate: "2024-01-15",
      eventLocation: "서울 코엑스",
      status: "신청됨",
      appliedAt: "2024-01-10",
      approvedAt: "2024-01-12",
      applicantInfo: {
        name: "홍길동",
        email: "hong@example.com",
        phone: "010-1234-5678",
        company: "ABC기업",
        position: "개발자",
        dietaryRestrictions: "없음",
        specialRequests: "없음",
      },
      notes: "참가자 등록이 완료되었습니다.",
    },
    {
      id: 2,
      eventId: 3,
      eventTitle: "AI 워크샵",
      eventDate: "2024-01-25",
      eventLocation: "판교 테크노밸리",
      status: "신청됨",
      appliedAt: "2024-01-15",
      approvedAt: "2024-01-17",
      applicantInfo: {
        name: "홍길동",
        email: "hong@example.com",
        phone: "010-1234-5678",
        company: "ABC기업",
        position: "개발자",
        dietaryRestrictions: "채식",
        specialRequests: "노트북 지참 예정",
      },
      notes: "참가자 등록이 완료되었습니다.",
    },
    {
      id: 3,
      eventId: 4,
      eventTitle: "UX/UI 디자인 컨퍼런스",
      eventDate: "2024-02-01",
      eventLocation: "서울 디자인 센터",
      status: "신청됨",
      appliedAt: "2024-01-20",
      approvedAt: "2024-01-22",
      applicantInfo: {
        name: "홍길동",
        email: "hong@example.com",
        phone: "010-1234-5678",
        company: "ABC기업",
        position: "개발자",
        dietaryRestrictions: "없음",
        specialRequests: "없음",
      },
      notes: "참가자 등록이 완료되었습니다.",
    },
  ];

  const getStatusColor = (status) => {
    return "success";
  };

  const getStatusIcon = (status) => {
    return <CheckCircleIcon />;
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f5f5f5", py: 4 }}>
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          align="center"
          sx={{ mb: 4 }}
        >
          신청 현황
        </Typography>

        {/* Applications List */}
        <Grid container spacing={3}>
          {applications.map((application) => (
            <Grid item xs={12} key={application.id}>
              <Card>
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      mb: 2,
                    }}
                  >
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6" gutterBottom>
                        {application.eventTitle}
                      </Typography>
                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 1 }}
                      >
                        <EventIcon
                          sx={{ fontSize: 16, mr: 1, color: "text.secondary" }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          {application.eventDate}
                        </Typography>
                      </Box>
                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 2 }}
                      >
                        <LocationOnIcon
                          sx={{ fontSize: 16, mr: 1, color: "text.secondary" }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          {application.eventLocation}
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ textAlign: "right" }}>
                      <Chip
                        icon={getStatusIcon(application.status)}
                        label={application.status}
                        color={getStatusColor(application.status)}
                        sx={{ mb: 1 }}
                      />
                      <Typography variant="body2" color="text.secondary">
                        신청일: {application.appliedAt}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => navigate(`/events/${application.eventId}`)}
                    >
                      행사 정보
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {applications.length === 0 && (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              신청한 행사가 없습니다.
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default ApplicationStatusPage;
