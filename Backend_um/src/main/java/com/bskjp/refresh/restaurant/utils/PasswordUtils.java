package com.bskjp.refresh.restaurant.utils;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class PasswordUtils {

    // Password must contain at least one digit, one lowercase, one uppercase, one special character and be at least 8 characters long
    private static final String PASSWORD_PATTERN = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>\\/?]).{8,}$";
    private static final Pattern pattern = Pattern.compile(PASSWORD_PATTERN);

    public static boolean isStrongPassword(String password) {
        if (password == null) {
            return false;
        }

        Matcher matcher = pattern.matcher(password);
        return matcher.matches();
    }
}
