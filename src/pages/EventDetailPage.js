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
  Divider,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import EventIcon from "@mui/icons-material/Event";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PeopleIcon from "@mui/icons-material/People";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonIcon from "@mui/icons-material/Person";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import InfoIcon from "@mui/icons-material/Info";
import WarningIcon from "@mui/icons-material/Warning";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const EventDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showResultDialog, setShowResultDialog] = useState(false);
  const [applicationSuccess, setApplicationSuccess] = useState(false);

  // 실제로는 API에서 데이터를 가져와야 함
  const event = {
    id: parseInt(id),
    title: "2024 기술 컨퍼런스",
    mainTopic: "AI와 클라우드 기술의 융합",
    purpose:
      "최신 기술 트렌드를 공유하고 업계 전문가들과의 네트워킹을 통해 혁신적인 아이디어를 창출합니다.",
    target: "IT 업계 종사자, 개발자, 기업 임원, 스타트업 창업자, 학생",
    date: "2024-01-15",
    time: "09:00 - 18:00",
    location: "서울 코엑스 그랜드볼룸",
    address: "서울특별시 강남구 삼성동 159",
    category: "컨퍼런스",
    status: "신청 가능",
    description:
      "최신 기술 트렌드를 공유하는 연례 기술 컨퍼런스입니다. AI, 블록체인, 클라우드 컴퓨팅 등 다양한 기술 분야의 전문가들이 모여 인사이트를 공유합니다.",
    capacity: 500,
    registered: 320,
    price: "무료",
    organizer: "기술 컨퍼런스 위원회",
    contact: {
      phone: "02-1234-5678",
      email: "contact@techconf.kr",
      website: "www.techconf.kr",
    },
    firstComeFirstServed:
      "선착순 500명까지 신청 가능합니다. 마감 시 대기자 명단에 등록됩니다.",
    benefits: [
      "네트워킹 기회 제공",
      "최신 기술 트렌드 정보 습득",
      "업계 전문가와의 1:1 멘토링",
      "참가자 전용 자료집 제공",
      "점심 및 다과 제공",
      "수료증 발급",
    ],
    sessions: [
      {
        time: "09:00-09:30",
        title: "등록 및 네트워킹",
        description: "참가자 등록 및 자유로운 네트워킹 시간",
        speaker: "전체 참가자",
        room: "로비",
      },
      {
        time: "09:30-10:30",
        title: "키노트 스피치: AI 기술의 미래",
        description: "AI 기술의 미래와 산업 적용 사례",
        speaker: "김철수 (AI 연구소장, 테크컴퍼니)",
        room: "그랜드볼룸 A",
      },
      {
        time: "10:30-11:30",
        title: "세션 A: 클라우드 네이티브 아키텍처",
        description: "클라우드 네이티브 아키텍처와 마이크로서비스",
        speaker: "이영희 (클라우드 아키텍트, 클라우드솔루션)",
        room: "세미나룸 1",
      },
      {
        time: "11:30-12:30",
        title: "세션 B: 블록체인 비즈니스 적용",
        description: "블록체인 기술의 실제 비즈니스 적용 사례",
        speaker: "박민수 (블록체인 전문가, 블록체인랩)",
        room: "세미나룸 2",
      },
      {
        time: "12:30-13:30",
        title: "점심 식사 및 네트워킹",
        description: "네트워킹을 위한 점심 식사 시간",
        speaker: "전체 참가자",
        room: "레스토랑",
      },
      {
        time: "13:30-15:00",
        title: "패널 토론: 기술 트렌드와 미래 전망",
        description: "기술 트렌드와 미래 전망에 대한 패널 토론",
        speaker: "패널: 김철수, 이영희, 박민수, 정수진",
        room: "그랜드볼룸 A",
      },
      {
        time: "15:00-16:00",
        title: "세션 C: 빅데이터 분석과 머신러닝",
        description: "빅데이터 분석과 머신러닝",
        speaker: "정수진 (데이터 사이언티스트, 데이터랩)",
        room: "세미나룸 1",
      },
      {
        time: "16:00-17:00",
        title: "세션 D: 사이버 보안과 개인정보 보호",
        description: "사이버 보안과 개인정보 보호",
        speaker: "최보안 (보안 전문가, 시큐리티랩)",
        room: "세미나룸 2",
      },
      {
        time: "17:00-18:00",
        title: "네트워킹 및 폐회",
        description: "자유로운 네트워킹과 폐회 인사",
        speaker: "전체 참가자",
        room: "로비",
      },
    ],
    participants: [
      {
        name: "홍길동",
        company: "ABC기업",
        position: "개발팀장",
        registeredAt: "2024-01-10",
      },
      {
        name: "김영수",
        company: "XYZ스타트업",
        position: "CEO",
        registeredAt: "2024-01-11",
      },
      {
        name: "이미영",
        company: "테크컴퍼니",
        position: "프로덕트 매니저",
        registeredAt: "2024-01-12",
      },
      {
        name: "박철수",
        company: "인터넷기업",
        position: "시니어 개발자",
        registeredAt: "2024-01-13",
      },
      {
        name: "정민수",
        company: "스타트업",
        position: "CTO",
        registeredAt: "2024-01-14",
      },
    ],
  };

  const handleSubmitApplication = () => {
    // 실제로는 API 호출
    console.log("행사 신청 완료");
    setApplicationSuccess(true);
    setShowResultDialog(true);
  };

  const getStatusColor = (status) => {
    return status === "신청 가능" ? "success" : "error";
  };

  const getCategoryColor = (category) => {
    const colors = {
      컨퍼런스: "primary",
      워크샵: "secondary",
      네트워킹: "info",
      밋업: "warning",
    };
    return colors[category] || "default";
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f5f5f5", py: 4 }}>
      <Container maxWidth="lg">
        {applicationSuccess && (
          <Alert severity="success" sx={{ mb: 3 }}>
            행사 신청이 완료되었습니다! 확인 이메일을 발송했습니다.
          </Alert>
        )}

        {/* Event Header */}
        <Card sx={{ mb: 4 }}>
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
                <Typography variant="h3" component="h1" gutterBottom>
                  {event.title}
                </Typography>
                <Typography variant="h5" color="primary" gutterBottom>
                  {event.mainTopic}
                </Typography>
              </Box>
              <Chip
                label={event.status}
                color={getStatusColor(event.status)}
                size="large"
              />
            </Box>

            <Grid container spacing={3} sx={{ mb: 3 }}>
              <Grid item xs={12} md={6}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <EventIcon sx={{ mr: 1, color: "text.secondary" }} />
                  <Typography variant="body1">
                    {event.date} {event.time}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <LocationOnIcon sx={{ mr: 1, color: "text.secondary" }} />
                  <Typography variant="body1">{event.location}</Typography>
                </Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ ml: 3 }}
                >
                  {event.address}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <PeopleIcon sx={{ mr: 1, color: "text.secondary" }} />
                  <Typography variant="body1">
                    {event.registered}/{event.capacity}명 참가
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ textAlign: "right" }}>
                  <Chip
                    label={event.category}
                    color={getCategoryColor(event.category)}
                    sx={{ mb: 1 }}
                  />
                  <Typography variant="h6" color="primary" gutterBottom>
                    참가비: {event.price}
                  </Typography>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={handleSubmitApplication}
                    sx={{ px: 4 }}
                  >
                    행사 신청하기
                  </Button>
                </Box>
              </Grid>
              <Typography color="error">
                (상품 투표 관련)현 컨플루언스 시스템 상으로 상품(Ex 아아, 라떼)
                투표는 없는 것 같은데 어케 도입할지 고려 필요
              </Typography>
            </Grid>

            <Divider sx={{ my: 2 }} />

            {/* 목적 */}
            <Typography variant="h6" gutterBottom>
              행사 목적
            </Typography>
            <Typography variant="body1" paragraph>
              {event.purpose}
            </Typography>

            {/* 대상 */}
            <Typography variant="h6" gutterBottom>
              참가 대상
            </Typography>
            <Typography variant="body1" paragraph>
              {event.target}
            </Typography>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="body2" color="text.secondary">
                주최: {event.organizer}
              </Typography>
              <Box sx={{ display: "flex", gap: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  📞 {event.contact.phone}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  📧 {event.contact.email}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>

        <Grid container spacing={4}>
          {/* 세션 구성 */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  세션 구성
                </Typography>
                <TableContainer component={Paper} sx={{ mt: 2 }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: "bold" }}>시간</TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>
                          주요 내용
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>
                          발표자
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>장소</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {event.sessions.map((session, index) => (
                        <TableRow key={index}>
                          <TableCell>{session.time}</TableCell>
                          <TableCell>
                            <Typography
                              variant="subtitle2"
                              sx={{ fontWeight: "bold" }}
                            >
                              {session.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {session.description}
                            </Typography>
                          </TableCell>
                          <TableCell>{session.speaker}</TableCell>
                          <TableCell>{session.room}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* 참석자 혜택 */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  참석자 혜택
                </Typography>
                <List>
                  {event.benefits.map((benefit, index) => (
                    <ListItem key={index} sx={{ px: 0 }}>
                      <ListItemText
                        primary={benefit}
                        primaryTypographyProps={{ variant: "body1" }}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* 참가신청명단 */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  참가신청명단 ({event.participants.length}명)
                </Typography>
                <TableContainer component={Paper} sx={{ mt: 2 }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: "bold" }}>소속</TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>직위</TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>성명</TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>
                          신청일
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {event.participants.map((participant, index) => (
                        <TableRow key={index}>
                          <TableCell>{participant.company}</TableCell>
                          <TableCell>{participant.position}</TableCell>
                          <TableCell>{participant.name}</TableCell>
                          <TableCell>{participant.registeredAt}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* 선착순 공지 */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Typography variant="h6">
                    추가 신청(얘는 신청 마감일 때에만 표시됨)
                  </Typography>
                </Box>
                <Typography variant="body1" color="text.secondary">
                  {event.firstComeFirstServed}
                  <CardContent>
                    <Typography variant="h5" gutterBottom>
                      대기명단 ({event.participants.length}명)
                    </Typography>
                    <TableContainer component={Paper} sx={{ mt: 2 }}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell sx={{ fontWeight: "bold" }}>
                              소속
                            </TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>
                              직위
                            </TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>
                              성명
                            </TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>
                              신청일
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {event.participants.map((participant, index) => (
                            <TableRow key={index}>
                              <TableCell>{participant.company}</TableCell>
                              <TableCell>{participant.position}</TableCell>
                              <TableCell>{participant.name}</TableCell>
                              <TableCell>{participant.registeredAt}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </CardContent>
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Q&A Section */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  댓글 및 답변
                </Typography>
                {/* Existing Comments */}
                <Box>
                  <Typography variant="subtitle1" gutterBottom>
                    사용자1:
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    행사 장소는 어디인가요?
                  </Typography>
                  <Box ml={2}>
                    <Typography variant="subtitle2" color="textSecondary">
                      답변:
                    </Typography>
                    <Typography variant="body2">
                      행사 장소는 서울 코엑스 그랜드볼룸입니다.
                    </Typography>
                  </Box>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box>
                  <Typography variant="subtitle1" gutterBottom>
                    사용자2:
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    참가비는 무료인가요?
                  </Typography>
                  <Box ml={2}>
                    <Typography variant="subtitle2" color="textSecondary">
                      답변:
                    </Typography>
                    <Typography variant="body2">
                      네, 이번 행사의 참가비는 무료입니다.
                    </Typography>
                  </Box>
                </Box>
                <Divider sx={{ my: 2 }} />
                {/* Comment Input */}
                <Box mt={2}>
                  <Typography variant="subtitle1" gutterBottom>
                    댓글 작성하기
                  </Typography>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    variant="outlined"
                    placeholder="댓글을 작성하세요..."
                  />
                  <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                    작성
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* 문의연락처 */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  문의연락처
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      <PhoneIcon sx={{ mr: 1, color: "primary.main" }} />
                      <Typography variant="body1">
                        {event.contact.phone}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      <EmailIcon sx={{ mr: 1, color: "primary.main" }} />
                      <Typography variant="body1">
                        {event.contact.email}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      <InfoIcon sx={{ mr: 1, color: "primary.main" }} />
                      <Typography variant="body1">
                        {event.contact.website}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Result Dialog */}
        <Dialog
          open={showResultDialog}
          onClose={() => setShowResultDialog(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle sx={{ textAlign: "center" }}>
            <CheckCircleIcon
              sx={{ color: "success.main", fontSize: 60, mb: 2 }}
            />
            <Typography variant="h5" component="div">
              신청 완료!
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Box sx={{ textAlign: "center", py: 2 }}>
              <Typography variant="h6" gutterBottom>
                {event.title}
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                행사 신청이 성공적으로 완료되었습니다.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                확인 이메일이 발송되었으니 확인해주세요.
              </Typography>
            </Box>
          </DialogContent>
          <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
            <Button
              variant="contained"
              onClick={() => {
                setShowResultDialog(false);
                navigate("/applications");
              }}
              sx={{ px: 4 }}
            >
              신청 현황 확인
            </Button>
            <Button
              variant="outlined"
              onClick={() => setShowResultDialog(false)}
            >
              닫기
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default EventDetailPage;
