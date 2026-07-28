package com.nejragutic.tasktracker.repository;

import com.nejragutic.tasktracker.model.Task;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class TaskRepository {

    public List<Task> findAll() {
        Task task1 = new Task(1, "Learn Spring Boot", "TODO");
        Task task2 = new Task(2, "Finish CV", "DONE");

        return List.of(task1, task2);
    }
}