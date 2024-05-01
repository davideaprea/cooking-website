package com.app.backend.recipes.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.app.backend.recipes.entities.Recipe;

public interface RecipePageableDAO extends PagingAndSortingRepository<Recipe, Long>{
    @Query("SELECT r FROM Recipe r WHERE r.user.username = :creatorUsername")
    public Page<Recipe> findByUser(String creatorUsername, Pageable pageable);
}
