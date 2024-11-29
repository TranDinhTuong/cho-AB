package com.example.choAB.service.job;

import com.example.choAB.model.Job;
import java.util.List;

public interface IJobService {
    Job saveJob(Job job);            
    List<Job> getAllJobs();          
    Job getJobById(Long id);         
    void deleteJob(Long id);         
}
