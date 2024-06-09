package com.app.backend.core.dto;

import com.app.backend.core.enums.SearchOperation;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class SearchFilterDto {
    String fieldName;
    Object value;
    SearchOperation operation;
}