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
  const [viewMode, setViewMode] = useState("card");

  const events = [
    {
      id: 1,
      title: "2024 기술 컨퍼런스",
      date: "2024-01-15",
      location: "서울 코엑스",
      category: "컨퍼런스",
      description: "최신 기술 트렌드를 공유하는 연례 기술 컨퍼런스입니다.",
      capacity: 500,
      registered: 320,
      developmentTime: true,
    },
    {
      id: 2,
      title: "스타트업 네트워킹 데이",
      date: "2024-01-20",
      location: "강남구 스타트업 허브",
      category: "네트워킹",
      description:
        "스타트업 창업자들과 투자자들이 만나는 네트워킹 이벤트입니다.",
      capacity: 100,
      registered: 100,
      developmentTime: false,
    },
    {
      id: 3,
      title: "AI 워크샵",
      date: "2024-01-25",
      location: "판교 테크노밸리",
      category: "워크샵",
      description: "AI 기술을 직접 체험하고 학습할 수 있는 워크샵입니다.",
      capacity: 50,
      registered: 25,
      developmentTime: true,
    },
    {
      id: 4,
      title: "UX/UI 디자인 컨퍼런스",
      date: "2024-02-01",
      location: "서울 디자인 센터",
      category: "컨퍼런스",
      description: "UX/UI 디자인 트렌드와 베스트 프랙티스를 공유합니다.",
      capacity: 200,
      registered: 80,
      developmentTime: true,
    },
    {
      id: 5,
      title: "블록체인 개발자 밋업",
      date: "2024-02-05",
      location: "강남구 개발자 공간",
      category: "밋업",
      description: "블록체인 개발자들이 모여 기술을 공유하는 밋업입니다.",
      capacity: 80,
      registered: 45,
      developmentTime: false,
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
      developmentTime: true,
    },
  ];

  const categories = ["all", "컨퍼런스", "워크샵", "네트워킹", "밋업"];
  const sortOptions = [
    { value: "latest", label: "최신순" },
    { value: "deadline", label: "마감일자순" },
    { value: "popularity", label: "신청현황순" },
    { value: "name", label: "행사명순" },
  ];

  const filteredAndSortedEvents = events
    .filter((event) => {
      const matchesCategory =
        categoryFilter === "all" || event.category === categoryFilter;
      return matchesCategory;
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

  const handleViewModeChange = (event, newViewMode) => {
    if (newViewMode !== null) {
      setViewMode(newViewMode);
    }
  };

  const CardView = () => (
    <Grid container spacing={3}>
      {filteredAndSortedEvents.map((event) => (
        <Grid item xs={12} md={6} lg={4} key={event.id}>
          <Card
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CardContent sx={{ flexGrow: 1 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  mb: 2,
                }}
              >
                <Typography
                  variant="h6"
                  component="h3"
                  gutterBottom
                  sx={{ flex: 1 }}
                >
                  {event.title}
                </Typography>
                <Chip
                  label={
                    event.developmentTime
                      ? "역량개발시간 부여"
                      : "역량개발시간 미부여"
                  }
                  color={getDevelopmentTimeColor(event.developmentTime)}
                  size="small"
                  icon={<SchoolIcon />}
                />
              </Box>

              <Typography variant="body2" color="text.secondary" paragraph>
                {event.description}
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <EventIcon
                  sx={{ fontSize: 16, mr: 1, color: "text.secondary" }}
                />
                <Typography variant="body2" color="text.secondary">
                  {event.date}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <LocationOnIcon
                  sx={{ fontSize: 16, mr: 1, color: "text.secondary" }}
                />
                <Typography variant="body2" color="text.secondary">
                  {event.location}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Chip
                  label={event.category}
                  color={getCategoryColor(event.category)}
                  size="small"
                />
                <Typography variant="body2" color="text.secondary">
                  {event.registered}/{event.capacity}명
                </Typography>
              </Box>

              <Box
                sx={{
                  width: "100%",
                  bgcolor: "grey.200",
                  borderRadius: 1,
                  height: 8,
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
            </CardContent>
            <CardActions>
              <Button
                size="small"
                onClick={() => navigate(`/events/${event.id}`)}
                fullWidth
              >
                자세히 보기
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );

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
                  label={
                    event.developmentTime
                      ? "역량개발시간 부여"
                      : "역량개발시간 미부여"
                  }
                  color={getDevelopmentTimeColor(event.developmentTime)}
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
                  onClick={() => navigate(`/events/${event.id}`)}
                >
                  자세히 보기
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
              <ToggleButtonGroup
                value={viewMode}
                exclusive
                onChange={handleViewModeChange}
                aria-label="view mode"
                sx={{ width: "100%" }}
              >
                <ToggleButton value="card" aria-label="card view">
                  <ViewModuleIcon />
                </ToggleButton>
                <ToggleButton value="table" aria-label="table view">
                  <TableChartIcon />
                </ToggleButton>
              </ToggleButtonGroup>
            </Grid>
          </Grid>
        </Box>

        {/* Content */}
        {viewMode === "card" ? <CardView /> : <TableView />}

        {filteredAndSortedEvents.length === 0 && (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              검색 조건에 맞는 행사가 없습니다.
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default EventsListPage;
