package com.app.backend.recipes.entities;

import jakarta.persistence.Embeddable;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Embeddable
@AllArgsConstructor
@Getter
public class RecipeIngredient {
    @ManyToOne(optional = false)
    private Ingredient ingredient;

    @Min(value = 1) @NotNull
    private short grams;
}
