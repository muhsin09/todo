package com.todo.backend.todo.repository;

import com.todo.backend.todo.model.Todo;
import com.todo.backend.user.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {
    
    Page<Todo> findByUser(User user, Pageable pageable);
    
    List<Todo> findByUser(User user);
    
    @Query("SELECT t FROM Todo t WHERE t.user = :user AND (:completed IS NULL OR t.completed = :completed)")
    Page<Todo> findByUserAndCompleted(@Param("user") User user, @Param("completed") Boolean completed, Pageable pageable);
    
    @Query("SELECT t FROM Todo t WHERE t.user = :user ORDER BY " +
           "CASE WHEN t.priority = 'HIGH' THEN 1 " +
           "     WHEN t.priority = 'MEDIUM' THEN 2 " +
           "     WHEN t.priority = 'LOW' THEN 3 " +
           "     ELSE 4 END, " +
           "t.dueDate ASC, t.createdAt ASC")
    Page<Todo> findByUserOrderByPriorityAndDueDate(@Param("user") User user, Pageable pageable);
    
    Optional<Todo> findByIdAndUser(Long id, User user);
    
    boolean existsByIdAndUser(Long id, User user);
} 