import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EventIcon from "@mui/icons-material/Event";
import SchoolIcon from "@mui/icons-material/School";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import TableChartIcon from "@mui/icons-material/TableChart";

const EventsListPage = () => {
  const navigate = useNavigate();
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("latest");
  const [stateFilter, setStateFilter] = useState("all");
  const [yeokrangFilter, setYeokrangFilter] = useState("all");

  const events = [
    {
      id: 1,
      title: "2026 기술 컨퍼런스",
      date: "2026-01-15",
      location: "서울 코엑스",
      category: "컨퍼런스",
      description: "최신 기술 트렌드를 공유하는 연례 기술 컨퍼런스입니다.",
      capacity: 500,
      registered: 320,
      developmentTime: "Y",
      applyStart: "2026-01-01T09:00:00",
      applyEnd: "2026-01-10T18:00:00",
      state: "open",
    },
    {
      id: 2,
      title: "스타트업 네트워킹 데이",
      date: "2025-08-20",
      location: "강남구 스타트업 허브",
      category: "네트워킹",
      description:
        "스타트업 창업자들과 투자자들이 만나는 네트워킹 이벤트입니다.",
      capacity: 100,
      registered: 40,
      developmentTime: "N",
      applyStart: "2025-08-05T09:00:00",
      applyEnd: "2025-08-15T18:00:00",
      state: "open",
    },
    {
      id: 3,
      title: "AI 워크샵",
      date: "2026-01-25",
      location: "판교 테크노밸리",
      category: "워크샵",
      description: "AI 기술을 직접 체험하고 학습할 수 있는 워크샵입니다.",
      capacity: 50,
      registered: 50,
      developmentTime: "Y",
      applyStart: "2026-01-20T09:00:00",
      applyEnd: "2026-01-22T18:00:00",
      state: "open",
    },
    {
      id: 4,
      title: "UX/UI 디자인 컨퍼런스",
      date: "2026-02-01",
      location: "서울 디자인 센터",
      category: "컨퍼런스",
      description: "UX/UI 디자인 트렌드와 베스트 프랙티스를 공유합니다.",
      capacity: 200,
      registered: 80,
      developmentTime: "Y",
      applyStart: "2026-01-10T09:00:00",
      applyEnd: "2026-01-25T18:00:00",
      state: "close",
    },
    {
      id: 5,
      title: "블록체인 개발자 밋업",
      date: "2026-02-05",
      location: "강남구 개발자 공간",
      category: "밋업",
      description: "블록체인 개발자들이 모여 기술을 공유하는 밋업입니다.",
      capacity: 80,
      registered: 45,
      developmentTime: "N",
      applyStart: "2026-01-15T09:00:00",
      applyEnd: "2026-01-20T18:00:00",
      state: "open",
    },
    {
      id: 6,
      title: "데이터 사이언스 심포지엄",
      date: "2024-02-10",
      location: "서울대학교",
      category: "컨퍼런스",
      description: "데이터 사이언스 분야의 최신 연구 결과를 공유합니다.",
      capacity: 300,
      registered: 150,
      developmentTime: "Y",
      applyStart: "2024-02-01T09:00:00",
      applyEnd: "2024-02-05T18:00:00",
      state: "before",
    },
  ];

  const categories = ["all", "컨퍼런스", "워크샵", "네트워킹", "밋업"];
  const sortOptions = [
    { value: "latest", label: "최신순" },
    { value: "deadline", label: "마감일자순" },
    { value: "popularity", label: "신청현황순" },
    { value: "name", label: "행사명순" },
  ];
  const stateOptions = [
    { value: "all", label: "전체" },
    { value: "before", label: "신청 전" },
    { value: "open", label: "신청 중" },
    { value: "close", label: "마감" },
  ];
  const yeokrangOptions = [
    { value: "all", label: "전체" },
    { value: "Y", label: "부여" },
    { value: "N", label: "미부여" },
  ];

  const filteredAndSortedEvents = events
    .filter((event) => {
      const matchesCategory =
        categoryFilter === "all" || event.category === categoryFilter;
      return matchesCategory;
    })
    .filter((event) => {
      const matchesState = stateFilter === "all" || event.state === stateFilter;
      return matchesState;
    })
    .filter((event) => {
      const matchesYeokrang =
        yeokrangFilter === "all" || event.developmentTime === yeokrangFilter;
      return matchesYeokrang;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "latest":
          // 최신순 (날짜 오름차순)
          return new Date(a.date) - new Date(b.date);
        case "deadline":
          // 마감일자순 (날짜 내림차순)
          return new Date(b.date) - new Date(a.date);
        case "popularity":
          // 신청현황순 (등록률 내림차순)
          const aRate = a.registered / a.capacity;
          const bRate = b.registered / b.capacity;
          return bRate - aRate;
        case "name":
          // 행사명순 (가나다순)
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

  const getCategoryColor = (category) => {
    const colors = {
      컨퍼런스: "primary",
      워크샵: "secondary",
      네트워킹: "info",
      밋업: "warning",
    };
    return colors[category] || "default";
  };

  const getDevelopmentTimeColor = (developmentTime) => {
    return developmentTime ? "info" : "default";
  };

  // 현재 시간 기준으로 이벤트 상태를 동적으로 반환
  const getEventStatus = (event) => {
    const now = new Date();
    const start = new Date(event.applyStart);
    const end = new Date(event.applyEnd);
    return event.state;
  };

  const TableView = () => (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>행사명</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>일시</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>장소</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>카테고리</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>역량개발시간</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>신청현황</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>작업</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredAndSortedEvents.map((event) => (
            <TableRow key={event.id}>
              <TableCell>
                <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                  {event.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {event.description}
                </Typography>
              </TableCell>
              <TableCell>{event.date}</TableCell>
              <TableCell>{event.location}</TableCell>
              <TableCell>
                <Chip
                  label={event.category}
                  color={getCategoryColor(event.category)}
                  size="small"
                />
              </TableCell>
              <TableCell>
                <Chip
                  label={event.developmentTime}
                  color={event.developmentTime === "Y" ? "primary" : "default"}
                  size="small"
                  icon={<SchoolIcon />}
                />
              </TableCell>
              <TableCell>
                <Typography variant="body2">
                  {event.registered}/{event.capacity}명
                </Typography>
                <Box
                  sx={{
                    width: "100%",
                    bgcolor: "grey.200",
                    borderRadius: 1,
                    height: 4,
                    mt: 0.5,
                  }}
                >
                  <Box
                    sx={{
                      width: `${(event.registered / event.capacity) * 100}%`,
                      bgcolor:
                        event.registered === event.capacity
                          ? "error.main"
                          : "success.main",
                      height: "100%",
                      borderRadius: 1,
                    }}
                  />
                </Box>
              </TableCell>
              <TableCell>
                <Button
                  size="small"
                  variant="outlined"
                  disabled={getEventStatus(event) !== "open"}
                  onClick={() => navigate(`/events/${event.id}`)}
                >
                  {getEventStatus(event)}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

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
          행사 목록
        </Typography>

        {/* Filters and View Toggle */}
        <Box sx={{ mb: 4 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>카테고리</InputLabel>
                <Select
                  value={categoryFilter}
                  label="카테고리"
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category === "all" ? "전체" : category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>정렬</InputLabel>
                <Select
                  value={sortBy}
                  label="정렬"
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  {sortOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>상태</InputLabel>
                <Select
                  value={stateFilter}
                  label="상태"
                  onChange={(e) => setStateFilter(e.target.value)}
                >
                  {stateOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>역량</InputLabel>
                <Select
                  value={yeokrangFilter}
                  label="역량"
                  onChange={(e) => setYeokrangFilter(e.target.value)}
                >
                  {yeokrangOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>

        {/* Content */}
        <TableView />
      </Container>
    </Box>
  );
};

export default EventsListPage;
