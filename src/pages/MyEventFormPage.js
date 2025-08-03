import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  Paper,
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Card,
  CardContent,
} from "@mui/material";
import { Save as SaveIcon, Cancel as CancelIcon } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";

const MyEventFormPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    maxParticipants: "",
    status: "draft",
    category: "",
    organizer: "",
    contactEmail: "",
    contactPhone: "",
    requirements: "",
    imageUrl: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 편집 모드일 때 기존 데이터 로드
  useEffect(() => {
    if (isEditing) {
      // 실제로는 API에서 데이터를 가져와야 함
      setFormData({
        title: "내 첫 번째 행사",
        description: "내가 등록한 첫 번째 행사입니다.",
        date: "2024-03-25",
        time: "14:00",
        location: "서울 강남구",
        maxParticipants: "50",
        status: "upcoming",
        category: "seminar",
        organizer: "홍길동",
        contactEmail: "hong@example.com",
        contactPhone: "010-1234-5678",
        requirements: "노트북 지참 권장",
        imageUrl: "https://example.com/image.jpg",
      });
    }
  }, [isEditing, id]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // 에러 초기화
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "행사명을 입력해주세요.";
    }

    if (!formData.description.trim()) {
      newErrors.description = "행사 설명을 입력해주세요.";
    }

    if (!formData.date) {
      newErrors.date = "날짜를 선택해주세요.";
    }

    if (!formData.location.trim()) {
      newErrors.location = "장소를 입력해주세요.";
    }

    if (!formData.maxParticipants || formData.maxParticipants <= 0) {
      newErrors.maxParticipants = "유효한 참가자 수를 입력해주세요.";
    }

    if (!formData.contactEmail.trim()) {
      newErrors.contactEmail = "연락처 이메일을 입력해주세요.";
    } else if (!/\S+@\S+\.\S+/.test(formData.contactEmail)) {
      newErrors.contactEmail = "유효한 이메일 주소를 입력해주세요.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // 실제로는 API 호출
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // 성공 시 내 행사 관리 페이지로 이동
      navigate("/my-events");
    } catch (error) {
      console.error("행사 저장 실패:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {isEditing ? "내 행사 수정" : "내 행사 등록"}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {isEditing
            ? "내가 등록한 행사 정보를 수정합니다."
            : "새로운 행사를 등록합니다."}
        </Typography>
      </Box>

      <Paper sx={{ p: 3 }}>
        {/* 폼 내용 */}
        <Grid container spacing={3}>
          {/* 기본 정보 */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              기본 정보
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="행사명 *"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              error={Boolean(errors.title)}
              helperText={errors.title}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="행사 설명 *"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              error={Boolean(errors.description)}
              helperText={errors.description}
              multiline
              rows={4}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="날짜 *"
              type="date"
              value={formData.date}
              onChange={(e) => handleInputChange("date", e.target.value)}
              error={Boolean(errors.date)}
              helperText={errors.date}
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="시간"
              type="time"
              value={formData.time}
              onChange={(e) => handleInputChange("time", e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="장소 *"
              value={formData.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
              error={Boolean(errors.location)}
              helperText={errors.location}
              required
            />
          </Grid>

          {/* 상세 정보 */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              상세 정보
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="최대 참가자 수 *"
              type="number"
              value={formData.maxParticipants}
              onChange={(e) =>
                handleInputChange("maxParticipants", e.target.value)
              }
              error={Boolean(errors.maxParticipants)}
              helperText={errors.maxParticipants}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>카테고리</InputLabel>
              <Select
                value={formData.category}
                label="카테고리"
                onChange={(e) => handleInputChange("category", e.target.value)}
              >
                <MenuItem value="conference">컨퍼런스</MenuItem>
                <MenuItem value="workshop">워크샵</MenuItem>
                <MenuItem value="networking">네트워킹</MenuItem>
                <MenuItem value="seminar">세미나</MenuItem>
                <MenuItem value="other">기타</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="주최자"
              value={formData.organizer}
              onChange={(e) => handleInputChange("organizer", e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="이미지 URL"
              value={formData.imageUrl}
              onChange={(e) => handleInputChange("imageUrl", e.target.value)}
              helperText="행사 이미지의 URL을 입력하세요"
            />
          </Grid>

          {/* 연락처 및 요구사항 */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              연락처 및 요구사항
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="연락처 이메일 *"
              type="email"
              value={formData.contactEmail}
              onChange={(e) =>
                handleInputChange("contactEmail", e.target.value)
              }
              error={Boolean(errors.contactEmail)}
              helperText={errors.contactEmail}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="연락처 전화번호"
              value={formData.contactPhone}
              onChange={(e) =>
                handleInputChange("contactPhone", e.target.value)
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="참가 요구사항"
              value={formData.requirements}
              onChange={(e) =>
                handleInputChange("requirements", e.target.value)
              }
              multiline
              rows={3}
              helperText="참가자가 준비해야 할 사항을 입력하세요"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>상태</InputLabel>
              <Select
                value={formData.status}
                label="상태"
                onChange={(e) => handleInputChange("status", e.target.value)}
              >
                <MenuItem value="draft">임시저장</MenuItem>
                <MenuItem value="upcoming">예정</MenuItem>
                <MenuItem value="active">진행중</MenuItem>
                <MenuItem value="ended">종료</MenuItem>
              </Select>
              <FormHelperText>행사의 현재 상태를 선택하세요</FormHelperText>
            </FormControl>
          </Grid>
        </Grid>

        {/* 액션 버튼 */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
          <Box>
            <Button
              variant="outlined"
              onClick={() => navigate("/my-events")}
              startIcon={<CancelIcon />}
            >
              취소
            </Button>
          </Box>
          <Box>
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={isSubmitting}
              startIcon={<SaveIcon />}
            >
              {isSubmitting ? "저장 중..." : isEditing ? "수정" : "등록"}
            </Button>
          </Box>
        </Box>
      </Paper>

      {/* 미리보기 카드 */}
      {formData.title && (
        <Card sx={{ mt: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              미리보기
            </Typography>
            <Typography variant="subtitle1" fontWeight="bold">
              {formData.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {formData.description}
            </Typography>
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              {formData.date && (
                <Typography variant="body2">
                  📅 {formData.date} {formData.time && `(${formData.time})`}
                </Typography>
              )}
              {formData.location && (
                <Typography variant="body2">📍 {formData.location}</Typography>
              )}
              {formData.maxParticipants && (
                <Typography variant="body2">
                  👥 최대 {formData.maxParticipants}명
                </Typography>
              )}
            </Box>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default MyEventFormPage;
