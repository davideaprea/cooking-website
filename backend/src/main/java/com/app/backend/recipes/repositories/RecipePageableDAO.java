package com.app.backend.recipes.repositories;

import org.springframework.data.repository.PagingAndSortingRepository;

import com.app.backend.recipes.entities.Recipe;

public interface RecipePageableDAO extends PagingAndSortingRepository<Recipe, Long>{
    
}
