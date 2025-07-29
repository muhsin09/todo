package com.todo.backend.todo.query;

import com.todo.backend.user.model.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Pageable;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class GetTodosQuery {
    private User user;
    private Boolean completed;
    private Pageable pageable;
} 