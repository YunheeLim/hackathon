import React, { useState, useEffect } from "react";
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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
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

  const [voteModalOpen, setVoteModalOpen] = useState(false);
  const [selectedVote, setSelectedVote] = useState("");
  const [votedAppIds, setVotedAppIds] = useState([]); // 투표 완료된 신청 id 목록
  const [currentVotingAppId, setCurrentVotingAppId] = useState(null); // 현재 투표 중인 신청 id

  const pollItems = [
    { value: "1", label: "제육볶음" },
    { value: "2", label: "돈까스" },
  ];

  const openModal = (appId) => {
    setCurrentVotingAppId(appId);
    setVoteModalOpen(true);
  };
  const closeModal = () => {
    setVoteModalOpen(false);
    setSelectedVote("");
    setCurrentVotingAppId(null);
  };
  const handleVote = () => {
    if (currentVotingAppId !== null) {
      setVotedAppIds((prev) => [...prev, currentVotingAppId]);
    }
    closeModal();
  };

  // Prevent back navigation
  useEffect(() => {
    const handlePopState = (e) => {
      window.history.pushState(null, "", window.location.pathname);
    };
    window.history.pushState(null, "", window.location.pathname);
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

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

        {/* Applications Table */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>행사명</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>일시</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>장소</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>상태</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>투표</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {applications.map((application) => {
                const voted = votedAppIds.includes(application.id);
                return (
                  <TableRow key={application.id}>
                    <TableCell>
                      <Button
                        size="small"
                        variant="none"
                        sx={{
                          textDecoration: "underline",
                          color: "primary.main",
                        }}
                        onClick={() =>
                          navigate(`/events/${application.eventId}`)
                        }
                      >
                        {application.eventTitle}
                      </Button>
                    </TableCell>
                    <TableCell>{application.eventDate}</TableCell>
                    <TableCell>{application.eventLocation}</TableCell>
                    <TableCell>
                      <Chip
                        icon={getStatusIcon(application.status)}
                        label={application.status}
                        color={getStatusColor(application.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      <Button
                        size="small"
                        variant={voted ? "contained" : "outlined"}
                        color={voted ? "success" : "primary"}
                        disabled={voted}
                        onClick={() => openModal(application.id)}
                      >
                        {voted ? "투표완료" : "투표하기"}
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

        {/* 투표 모달 */}
        <Dialog open={voteModalOpen} onClose={closeModal}>
          <DialogTitle>점심 메뉴를 골라주세요</DialogTitle>
          <DialogContent>
            <RadioGroup
              value={selectedVote}
              onChange={(e) => setSelectedVote(e.target.value)}
            >
              {pollItems.map((item) => (
                <FormControlLabel
                  key={item.value}
                  value={item.value}
                  control={<Radio />}
                  label={item.label}
                />
              ))}
            </RadioGroup>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeModal}>취소</Button>
            <Button
              onClick={handleVote}
              variant="contained"
              disabled={!selectedVote}
            >
              투표
            </Button>
          </DialogActions>
        </Dialog>

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
