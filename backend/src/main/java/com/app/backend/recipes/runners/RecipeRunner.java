package com.app.backend.recipes.runners;

import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Random;
import java.util.Set;

import java.time.Duration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import com.app.backend.recipes.entities.Recipe;
import com.app.backend.recipes.entities.RecipeIngredient;
import com.app.backend.recipes.enums.Country;
import com.app.backend.recipes.enums.Course;
import com.app.backend.recipes.enums.Difficulty;
import com.app.backend.recipes.enums.RecipeType;
import com.app.backend.recipes.repositories.RecipeDAO;
import com.app.backend.security.service.CustomUserDetailsService;
import com.github.javafaker.Faker;

@Component
public class RecipeRunner implements ApplicationRunner{

    @Autowired private RecipeDAO recipeDao;
    @Autowired private CustomUserDetailsService userDetailsService;
    private Faker faker = new Faker();

    @Override
    public void run(ApplicationArguments args) throws Exception {
        long recipesNumber = recipeDao.count();
        
        for(long i = recipesNumber; i < 100; i++) {
            Set<RecipeIngredient> ingredients = new HashSet<RecipeIngredient>();
            List<String> preparationSteps = new LinkedList<String>();
            
            for(int j = 0; j < faker.number().numberBetween(5, 14); j++) {
                ingredients.add(new RecipeIngredient(
                    faker.food().ingredient(),
                    (short) faker.number().numberBetween(1, 800)
                    ));
                }
                
            for(int j = 0; j < faker.number().numberBetween(4, 10); j++) {
                preparationSteps.add(getRandomSentence(50, 400));
            }


            Recipe recipe = new Recipe(
                userDetailsService.getUserByUsername("daviaprea"),
                faker.name().title(),
                getRandomEnumValue(Course.class),
                "http://localhost:8080/recipes/thumbnails/b0e464b8-15cc-4228-af48-7c091df312d7_risottomilanese.avif",
                getRandomEnumValue(Difficulty.class),
                Duration.ofMinutes(faker.number().numberBetween(10, 180)),
                Duration.ofMinutes(faker.number().numberBetween(10, 500)),
                (byte) faker.number().numberBetween(2, 8),
                faker.number().randomDouble(2, 5, 2000),
                getRandomEnumValue(Country.class),
                ingredients,
                preparationSteps,
                getRandomSentence(50, 255),
                getRandomSentence(50, 255),
                getRandomEnumValue(RecipeType.class),
                faker.bool().bool(),
                faker.bool().bool()
            );

            recipeDao.save(recipe);
        }
    }

    private String getRandomSentence(int min, int max) {
        StringBuilder sb = new StringBuilder();
        int wordNumber = faker.number().numberBetween(min, max);
                    
        while(sb.length() < wordNumber) {
            String sentence = faker.lorem().sentence(1);
            sb.append(sentence).append(" ");
        }

        if (sb.length() > wordNumber) sb.setLength(wordNumber);

        return sb.toString();
    }
    
    private <T extends Enum<?>> T getRandomEnumValue(Class<T> enumClass) {
        Random random = new Random();
        T[] enumValues = enumClass.getEnumConstants();
        return enumValues[random.nextInt(enumValues.length)];
    }
}
