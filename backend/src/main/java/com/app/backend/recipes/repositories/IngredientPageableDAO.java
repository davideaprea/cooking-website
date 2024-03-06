package com.app.backend.recipes.repositories;

import org.springframework.data.repository.PagingAndSortingRepository;

import com.app.backend.recipes.entities.Ingredient;

public interface IngredientPageableDAO extends PagingAndSortingRepository<Ingredient, Long>{
    
}
