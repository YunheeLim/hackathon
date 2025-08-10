import React, { useState, useEffect, useRef } from "react";
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
// Toast UI Editor import (add this at the top)
import {
  Editor as ToastEditor,
  Viewer as ToastViewer,
} from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";

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
  const [pollOptions, setPollOptions] = useState([]);

  // Toast UI Editor ref
  const editorRef = useRef();

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
    // if (!validateForm()) {
    //   return;
    // }

    console.log(formData);
    setIsSubmitting(true);

    try {
      console.log("formData");
      // 성공 시 내 행사 관리 페이지로 이동
      // navigate("/my-events");
    } catch (error) {
      console.error("행사 저장 실패:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddPollOption = () => {
    setPollOptions((prev) => [...prev, ""]);
  };
  const handleRemovePollOption = (idx) => {
    setPollOptions((prev) => prev.filter((_, i) => i !== idx));
  };
  const handlePollOptionChange = (idx, value) => {
    setPollOptions((prev) => prev.map((opt, i) => (i === idx ? value : opt)));
  };

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom align="center">
          {isEditing ? "내 행사 수정" : "내 행사 등록"}
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          align="center"
          sx={{ mb: 4 }}
        >
          {isEditing
            ? "내가 등록한 행사 정보를 수정합니다."
            : "새로운 행사를 등록합니다."}
        </Typography>

        {/* 기본 정보 */}
        <Paper
          variant="outlined"
          sx={{ p: 3, mb: 3, borderRadius: 2, background: "#fafbfc" }}
        >
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            기본 정보
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
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
            <Grid item xs={12} sm={6}>
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
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="시간"
                type="time"
                value={formData.time}
                onChange={(e) => handleInputChange("time", e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
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
          </Grid>
        </Paper>

        {/* 행사 설명 */}

        <Paper
          variant="outlined"
          sx={{ p: 3, mb: 3, borderRadius: 2, background: "#f7f9fa" }}
        >
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            행사 설명
          </Typography>
          <ToastEditor
            initialValue={formData.description}
            previewStyle="vertical"
            height="320px"
            initialEditType="wysiwyg"
            useCommandShortcut={true}
            onChange={() => {
              const data = editorRef.current.getInstance().getMarkdown();
              handleInputChange("description", data);
            }}
            ref={editorRef}
            hooks={{
              addImageBlobHook: async (blob, callback) => {
                // 1. base64로 변환 (임시)
                const reader = new FileReader();
                reader.onloadend = () => {
                  callback(reader.result, "image");
                };
                reader.readAsDataURL(blob);
              },
            }}
          />
          {errors.description && (
            <FormHelperText error sx={{ mt: 1 }}>
              {errors.description}
            </FormHelperText>
          )}
        </Paper>

        {/* 액션 버튼 */}
        <Box
          sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 4 }}
        >
          <Button
            variant="outlined"
            onClick={() => navigate("/my-events")}
            startIcon={<CancelIcon />}
            sx={{ minWidth: 120, borderRadius: 2 }}
          >
            취소
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            startIcon={<SaveIcon />}
            sx={{ minWidth: 120, borderRadius: 2 }}
          >
            {"등록"}
          </Button>
        </Box>
      </Paper>

      <Paper>
        <ToastViewer
          initialValue={formData.description}
          key={formData.description} // force re-render on content change
          usageStatistics={false}
        />
      </Paper>
    </Container>
  );
};

export default MyEventFormPage;
