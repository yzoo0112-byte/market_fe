// src/components/ManageFileSetting.tsx

import { useEffect, useState } from 'react';
import { Box, TextField, Typography, Button } from '@mui/material';
import { getManageSettings, updateManageSettings } from '../api/ManageFileApi';

export default function ManageFileSetting() {
  const [fileExtension, setFileExtension] = useState('');
  const [fileMaxSize, setFileMaxSize] = useState('');
  const [fileCount, setFileCount] = useState('');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const settings = await getManageSettings();
        setFileExtension(settings.fileExtension);
        setFileMaxSize(convertBytesToSize(settings.fileMaxSize));
        setFileCount(settings.fileCount.toString());
      } catch (error) {
        console.error('설정 불러오기 실패:', error);
      }
    };

    fetchSettings();
  }, []);

  const handleSave = async () => {
    try {
      const sizeInBytes = parseSizeToBytes(fileMaxSize);

      await updateManageSettings({
        fileExtension: fileExtension.trim(),
        fileMaxSize: sizeInBytes,
        fileCount: parseInt(fileCount, 10),
      });

      alert('설정이 저장되었습니다.');
    } catch (error) {
      console.error('저장 실패:', error);
      alert('설정 저장 중 오류가 발생했습니다.');
    }
  };

  const parseSizeToBytes = (sizeStr: string): number => {
    const match = sizeStr.toUpperCase().match(/^(\d+)(MB|GB|KB)$/);
    if (!match) throw new Error('용량 형식 오류. 예: 500MB');

    const value = parseInt(match[1], 10);
    const unit = match[2];

    switch (unit) {
      case 'KB': return value * 1024;
      case 'MB': return value * 1024 * 1024;
      case 'GB': return value * 1024 * 1024 * 1024;
      default: throw new Error('지원하지 않는 단위');
    }
  };

  const convertBytesToSize = (bytes: number): string => {
    if (bytes >= 1024 * 1024 * 1024) return `${bytes / (1024 ** 3)}GB`;
    if (bytes >= 1024 * 1024) return `${bytes / (1024 ** 2)}MB`;
    if (bytes >= 1024) return `${bytes / 1024}KB`;
    return `${bytes}B`;
  };

  return (
    <Box
      sx={{
        border: '1px solid #ccc',
        borderRadius: 2,
        p: 4,
        maxWidth: 500,
        margin: '0 auto',
        bgcolor: 'background.paper',
      }}
    >
      <Typography variant="h6" gutterBottom>
        &lt;업로드 파일 세부 설정&gt;
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1">확장자 파일 설정</Typography>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="예: exe,png,jpg"
          value={fileExtension}
          onChange={(e) => setFileExtension(e.target.value)}
        />
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1">용량 설정</Typography>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="예: 500MB"
          value={fileMaxSize}
          onChange={(e) => setFileMaxSize(e.target.value)}
        />
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1">업로드 개수 설정</Typography>
        <TextField
          fullWidth
          type="number"
          variant="outlined"
          placeholder="예: 5"
          value={fileCount}
          onChange={(e) => setFileCount(e.target.value)}
        />
      </Box>

      <Box textAlign="right">
        <Button variant="contained" color="primary" onClick={handleSave}>
          저장
        </Button>
      </Box>
    </Box>
  );
}
