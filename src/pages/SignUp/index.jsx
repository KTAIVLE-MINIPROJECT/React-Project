import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { domain } from '../../const/http';
import {
    Container,
    Box,
    TextField,
    Button,
    Typography,
    Paper,
} from '@mui/material';

export default function SignUp() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        userid: '',
        password: '',
        nickname: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${domain}/api/v1/users/signup`, formData);
            alert('회원가입 성공!');
            navigate('/login');
        } catch (err) {
            alert('회원가입 실패: ' + err.response?.data?.message);
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ p: 4, mt: 6 }}>
                <Typography variant="h6" gutterBottom>
                    회원가입
                </Typography>

                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        fullWidth
                        name="userid"
                        label="아이디"
                        value={formData.userid}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        name="password"
                        type="password"
                        label="비밀번호"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        name="nickname"
                        label="닉네임"
                        value={formData.nickname}
                        onChange={handleChange}
                        required
                    />
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
                        회원가입
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
}
