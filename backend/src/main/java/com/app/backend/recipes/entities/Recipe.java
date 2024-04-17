package com.app.backend.recipes.entities;

import java.time.Duration;
import java.util.List;
import java.util.Set;

import com.app.backend.recipes.enums.Country;
import com.app.backend.recipes.enums.Course;
import com.app.backend.recipes.enums.Difficulty;
import com.app.backend.recipes.enums.RecipeType;
import com.app.backend.security.entity.User;

import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Entity
@Table(name = "recipes")
public class Recipe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    private User user;

    @NotBlank
    @Column(nullable = false, unique = true)
    private String name;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Course course;

    @NotBlank
    @Column(nullable = false)
    private String thumbnailImage;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Difficulty difficulty;

    @NotNull
    @Column(nullable = false)
    private Duration preparationTime;

    @NotNull
    @Column(nullable = false)
    private Duration cookingTime;

    @Min(value = 1)
    @Column(nullable = false)
    private byte servings;

    @OneToMany(mappedBy = "recipe")
    private List<Rating> ratings;

    @Min(value = 1)
    @Column(nullable = false)
    private Double caloriesPerServing;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Country country;

    @Size(min = 1)
    @ElementCollection
    private Set<RecipeIngredient> ingredients;

    @Size(min = 1)
    @ElementCollection
    @Column(nullable = false, length = 400)
    private List<String> preparationSteps;

    @NotBlank
    @Column(nullable = false)
    private String storage;
    
    private String tips;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private RecipeType recipeType = RecipeType.MEAT_OR_FISH_BASED;
    private boolean isDairyFree = false;
    private boolean isGlutenFree = false;
    
    public Recipe(User user, String name, Course course, String thumbnailImage, Difficulty difficulty, Duration preparationTime, Duration cookingTime, byte servings, Double caloriesPerServing, Country country, Set<RecipeIngredient> ingredients, List<String> preparationSteps, String storage, String tips, RecipeType recipeType, boolean isDairyFree, boolean isGlutenFree) {
        this.user = user;
        this.name = name;
        this.course = course;
        this.thumbnailImage = thumbnailImage;
        this.difficulty = difficulty;
        this.preparationTime = preparationTime;
        this.cookingTime = cookingTime;
        this.servings = servings;
        this.caloriesPerServing = caloriesPerServing;
        this.country = country;
        this.ingredients = ingredients;
        this.preparationSteps = preparationSteps;
        this.storage = storage;
        this.tips = tips;
        this.recipeType = recipeType;
        this.isDairyFree = isDairyFree;
        this.isGlutenFree = isGlutenFree;
    }
}
