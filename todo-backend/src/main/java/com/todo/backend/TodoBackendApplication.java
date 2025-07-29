package com.todo.backend;

import com.todo.backend.todo.model.Todo;
import com.todo.backend.todo.model.Todo.Priority;
import com.todo.backend.todo.repository.TodoRepository;
import com.todo.backend.user.model.User;
import com.todo.backend.user.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;

@SpringBootApplication
public class TodoBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(TodoBackendApplication.class, args);
	}

	@Bean
	CommandLineRunner mockData(UserRepository userRepository, TodoRepository todoRepository, PasswordEncoder passwordEncoder) {
		return args -> {
			if (userRepository.count() == 0) {
				User user = User.builder()
					.email("demo@todo.com")
					.password(passwordEncoder.encode("Demo1234!"))
					.build();
				userRepository.save(user);

				Todo todo1 = Todo.builder()
					.title("İlk Görev")
					.description("Bu bir örnek görevdir.")
					.dueDate(LocalDate.now().plusDays(3))
					.priority(Priority.MEDIUM)
					.completed(false)
					.user(user)
					.build();

				Todo todo2 = Todo.builder()
					.title("Alışveriş Yap")
					.description("Süt, ekmek, yumurta al.")
					.dueDate(LocalDate.now().plusDays(1))
					.priority(Priority.HIGH)
					.completed(false)
					.user(user)
					.build();

				Todo todo3 = Todo.builder()
					.title("Kitap Oku")
					.description("Her gün 20 sayfa oku.")
					.dueDate(LocalDate.now().plusDays(7))
					.priority(Priority.LOW)
					.completed(true)
					.user(user)
					.build();

				todoRepository.save(todo1);
				todoRepository.save(todo2);
				todoRepository.save(todo3);
			}
		};
	}
}
