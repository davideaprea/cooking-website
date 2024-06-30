package com.app.backend.recipes.repositories;

import org.springframework.data.repository.CrudRepository;

import com.app.backend.recipes.entities.Recipe;


public interface RecipeDAO extends CrudRepository<Recipe, Long>{
    boolean existsByName(String name);
}
