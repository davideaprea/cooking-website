package com.app.backend.recipes.repositories;

import org.springframework.data.repository.CrudRepository;

import com.app.backend.recipes.entities.Ingredient;

public interface IngredientDAO extends CrudRepository<Ingredient, Long>{
    
}
