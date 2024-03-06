package com.app.backend.recipes.repositories;

import org.springframework.data.repository.CrudRepository;

import com.app.backend.recipes.entities.Rating;

public interface RatingDAO extends CrudRepository<Rating, Long>{
    
}
