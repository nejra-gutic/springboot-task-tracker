package com.nejragutic.tasktracker.repository;

import com.nejragutic.tasktracker.model.Task;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.ArrayList;

@Repository
public class TaskRepository {

    private final List<Task> tasks = new ArrayList<>();

    public TaskRepository() {
        tasks.add(new Task(1, "Learn Spring Boot", "TODO"));
        tasks.add(new Task(2, "Finish CV", "DONE"));
    }

    public List<Task> findAll() {
        return tasks;
    }

    public Task save(Task task) {
        task.setId(tasks.size() + 1);
        tasks.add(task);

        return task;
    }
}