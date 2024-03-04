package com.app.backend.security.runner;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import com.app.backend.security.entity.ERole;
import com.app.backend.security.entity.Role;
import com.app.backend.security.repository.RoleRepository;

@Component
public class AuthRunner implements ApplicationRunner {
	
	@Autowired RoleRepository roleRepository;
	
	@Override
	public void run(ApplicationArguments args) throws Exception {
		System.out.println("Run...");
		setRoleDefault();
	}
	
	private void setRoleDefault() {

		if(roleRepository.findByRoleName(ERole.ROLE_ADMIN).isEmpty()){
			Role admin = new Role();
			admin.setRoleName(ERole.ROLE_ADMIN);
			roleRepository.save(admin);
		}
		
		if(roleRepository.findByRoleName(ERole.ROLE_USER).isEmpty()){
			Role user = new Role();
			user.setRoleName(ERole.ROLE_USER);
			roleRepository.save(user);
		}
		
		if(roleRepository.findByRoleName(ERole.ROLE_MODERATOR).isEmpty()){
			Role moderator = new Role();
			moderator.setRoleName(ERole.ROLE_MODERATOR);
			roleRepository.save(moderator);
		}
	}

}
