package com.todo.backend.shared.controller;

import com.todo.backend.shared.dto.AuthRequest;
import com.todo.backend.shared.dto.AuthResponse;
import com.todo.backend.shared.dto.RegisterRequest;
import com.todo.backend.shared.security.JwtService;
import com.todo.backend.user.command.AuthenticateUserCommand;
import com.todo.backend.user.command.CreateUserCommand;
import com.todo.backend.user.model.User;
import com.todo.backend.user.service.UserCommandService;
import com.todo.backend.user.service.UserQueryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Tag(name = "Authentication", description = "Authentication management APIs")
public class AuthController {

    private final UserCommandService userCommandService;
    private final UserQueryService userQueryService;
    private final JwtService jwtService;

    @PostMapping("/register")
    @Operation(summary = "Register a new user")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        // Validate password confirmation
        if (!request.getPassword().equals(request.getConfirmPassword())) {
            return ResponseEntity.badRequest()
                    .body(AuthResponse.builder()
                            .message("Passwords do not match")
                            .build());
        }

        CreateUserCommand command = CreateUserCommand.from(request);
        User user = userCommandService.createUser(command);
        
        String token = jwtService.generateToken(user);
        
        return ResponseEntity.ok(AuthResponse.builder()
                .token(token)
                .message("User registered successfully")
                .build());
    }

    @PostMapping("/login")
    @Operation(summary = "Authenticate user and get JWT token")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody AuthRequest request) {
        AuthenticateUserCommand command = AuthenticateUserCommand.from(request);
        userCommandService.authenticateUser(command);
        
        User user = userQueryService.getUserByEmail(
                com.todo.backend.user.query.GetUserByEmailQuery.builder()
                        .email(request.getEmail())
                        .build()
        ).orElseThrow();
        
        String token = jwtService.generateToken(user);
        
        return ResponseEntity.ok(AuthResponse.builder()
                .token(token)
                .message("Login successful")
                .build());
    }
} 