package com.bskjp.refresh.restaurant.security;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component("userSecurity")
public class UserSecurity {

    private final JwtUtil jwtUtil;

    public UserSecurity(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    public boolean isCurrentUser(Long userId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null) {
            return false;
        }

        // Get the token from the Authentication object
        // Note: This implementation depends on how your token is stored in Authentication
        String token = extractTokenFromAuthentication(authentication);

        if (token == null) {
            return false;
        }

        // Extract the userId from the token
        String userIdFromToken = jwtUtil.getUserIdFromToken(token);

        return userIdFromToken != null && userIdFromToken.equals(userId.toString());
    }

    private String extractTokenFromAuthentication(Authentication authentication) {
        // This implementation depends on how your token is stored in Authentication
        // It might be in the credentials, principal, or in a custom authentication token
        // This is a simplified example - you'll need to adjust based on your security configuration
        try {
            // If using OAuth2AuthenticationToken or similar
            if (authentication.getCredentials() != null) {
                return authentication.getCredentials().toString();
            }

            // If the token is stored as a principal
            if (authentication.getPrincipal() instanceof String) {
                return (String) authentication.getPrincipal();
            }

            // If you're using a custom authentication token that contains the JWT
            if (authentication instanceof JwtAuthenticationToken) {
                return ((JwtAuthenticationToken) authentication).getToken();
            }

            return null;
        } catch (Exception e) {
            return null;
        }
    }

    // You might need to create this class if it doesn't exist
    private static class JwtAuthenticationToken extends org.springframework.security.authentication.AbstractAuthenticationToken {
        private final String token;

        public JwtAuthenticationToken(String token) {
            super(null);
            this.token = token;
        }

        public String getToken() {
            return token;
        }

        @Override
        public Object getCredentials() {
            return null;
        }

        @Override
        public Object getPrincipal() {
            return null;
        }
    }
}