package com.app.backend.recipes.services;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import org.springframework.util.StringUtils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.app.backend.core.classes.SpecCreator;
import com.app.backend.recipes.dto.RecipeDto;
import com.app.backend.recipes.dto.RecipeSearchDto;
import com.app.backend.recipes.entities.Recipe;
import com.app.backend.recipes.entities.RecipeIngredient;
import com.app.backend.recipes.repositories.RecipeDAO;
import com.app.backend.recipes.repositories.RecipePageableDAO;
import com.app.backend.security.service.CustomUserDetailsService;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;

@Service
public class RecipeService {
    @Autowired private RecipeDAO recipeDao;
    @Autowired private RecipePageableDAO recipePageableDAO;
    @Autowired private CustomUserDetailsService userDetailsService;
    @Autowired private ObjectMapper objectMapper;

    public Recipe save(RecipeDto recipeDto) {
        if(recipeDao.existsByName(recipeDto.getName())) {
            throw new EntityExistsException("This recipe's already been created.");
        }

        try {
            final String baseImageUrl = "http://localhost:8080/recipes/thumbnails/";

            Set<RecipeIngredient> ingredients = objectMapper.readValue(recipeDto.getIngredients(), new TypeReference<Set<RecipeIngredient>>() {});
            List<String> steps = objectMapper.readValue(recipeDto.getPreparationSteps(), new TypeReference<List<String>>() {});

            Recipe recipe = new Recipe(
                userDetailsService.getAuthenticatedUser(),
                recipeDto.getName(),
                recipeDto.getCourse(),
                baseImageUrl+saveFileOnFolder(recipeDto.getThumbnailImage()),
                recipeDto.getDifficulty(),
                recipeDto.getPreparationTime(),
                recipeDto.getCookingTime(),
                recipeDto.getServings(),
                recipeDto.getCaloriesPerServing(),
                recipeDto.getCountry(),
                ingredients,
                steps,
                recipeDto.getStorage(),
                recipeDto.getTips(),
                recipeDto.getRecipeType(),
                recipeDto.isDairyFree(),
                recipeDto.isGlutenFree()
            );

            return recipeDao.save(recipe);
        } catch (IOException e) {
            throw new DataIntegrityViolationException("Failed to upload cover image.");
        }
    }

    public Page<Recipe> getPage(Pageable pageable, String creatorUsername){
        if(creatorUsername != null) return recipePageableDAO.findByUser(creatorUsername, pageable);
        return recipePageableDAO.findAll(pageable);
    }

    private String saveFileOnFolder(MultipartFile file) throws IOException {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename().replace(" ", ""));
        String path = System.getProperty("user.home") + "/Desktop/Programming/Recipe covers";
        String coverImageName = UUID.randomUUID().toString() + "_" + fileName;
        Path coverImagePath = Path.of(path, coverImageName);
        if (!Files.exists(coverImagePath.getParent())) Files.createDirectories(coverImagePath.getParent());
        Files.copy(file.getInputStream(), coverImagePath);
        return coverImageName;
    }

    public Recipe findById(long id) {
        if(!recipeDao.existsById(id)) throw new EntityNotFoundException("Couldn't find recipe.");

        return recipeDao.findById(id).get();
    }

    public Page<Recipe> findByFilters(RecipeSearchDto filters, Pageable pageable) {
        List<Specification<Recipe>> specs = new ArrayList<Specification<Recipe>>();
        System.out.println(filters.isGlutenFree());

        specs.add((SpecCreator.equals("isDairyFree", filters.isDairyFree())));
        specs.add((SpecCreator.equals("isGlutenFree", filters.isGlutenFree())));
        if(filters.getCookingTime() != null) specs.add((SpecCreator.numberLessThan("cookingTime", filters.getCookingTime().toMillis())));
        if(filters.getPreparationTime() != null) specs.add((SpecCreator.numberLessThan("preparationTime", filters.getPreparationTime().toMillis())));
        if(filters.getCountry() != null) specs.add((SpecCreator.equals("country", filters.getCountry())));
        if(filters.getName() != null) specs.add((SpecCreator.containsString("name", filters.getName())));
        if(filters.getDifficulty() != null) specs.add((SpecCreator.equals("difficulty", filters.getDifficulty())));
        if(filters.getRecipeType() != null) specs.add((SpecCreator.equals("recipeType", filters.getRecipeType())));
        if(filters.getCourse() != null) specs.add((SpecCreator.equals("course", filters.getCourse())));

        Specification<Recipe> finalSpec;

        if(specs.size() == 0) finalSpec = Specification.where(null);
        else {
            finalSpec = Specification.where(specs.get(0));

            for(int i = 1; i < specs.size(); i++) {
                finalSpec = finalSpec.and(specs.get(i));
            }
        }

        return recipePageableDAO.findAll(finalSpec, pageable);
    }
}
