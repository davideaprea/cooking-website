package com.app.backend.security.service;

import com.app.backend.security.entity.User;
import com.app.backend.security.payload.LoginDto;
import com.app.backend.security.payload.RegisterDto;

public interface AuthService {
    
	String login(LoginDto loginDto);
    User register(RegisterDto registerDto);
    
}
