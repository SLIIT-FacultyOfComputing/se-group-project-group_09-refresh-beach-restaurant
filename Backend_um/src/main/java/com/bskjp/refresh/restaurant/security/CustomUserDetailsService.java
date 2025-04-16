package com.bskjp.refresh.restaurant.security;

import com.bskjp.refresh.restaurant.exception.ResourceNotFoundException;
import com.bskjp.refresh.restaurant.model.User;
import com.bskjp.refresh.restaurant.repository.UserRepository;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<?> optionalUser = userRepository.findByEmail(email);
        if (!optionalUser.isPresent()) {
            throw new UsernameNotFoundException("User not found with email: " + email);
        }

        Object userObj = optionalUser.get();
        if (!(userObj instanceof User)) {
            throw new ClassCastException("Expected User object but got " + userObj.getClass().getName());
        }

        User user = (User) userObj;
        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                user.isEnabled(),
                true,
                true,
                true,
                getAuthorities(user)
        );
    }

    private Collection<? extends GrantedAuthority> getAuthorities(User user) {
        List<SimpleGrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority("ROLE_" + user.getRole().name()));
        return authorities;
    }

    public User getUserByEmail(String email) {
        Optional<?> optionalUser = userRepository.findByEmail(email);
        if (!optionalUser.isPresent()) {
            throw new ResourceNotFoundException("User", "email", email);
        }

        Object userObj = optionalUser.get();
        if (!(userObj instanceof User)) {
            throw new ClassCastException("Expected User object but got " + userObj.getClass().getName());
        }

        return (User) userObj;
    }
}