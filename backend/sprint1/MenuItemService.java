package grp_9.restaurant2.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import grp_9.restaurant2.entity.MenuItem;
import grp_9.restaurant2.repository.MenuItemRepository;

import java.util.List;
import java.util.Optional;

@Service
public class MenuItemService {
    @Autowired
    private MenuItemRepository menuItemRepository;

    public List<MenuItem> getAllMenuItems() {
        return menuItemRepository.findAll();
    }

    public MenuItem getMenuItemById(Long id) {
        return menuItemRepository.findById(id).orElse(null);
    }

    public MenuItem saveMenuItem(MenuItem menuItem) {
        return menuItemRepository.save(menuItem);
    }

    public MenuItem updateMenuItem(Long id, MenuItem updatedItem) {
        Optional<MenuItem> existingItem = menuItemRepository.findById(id);
        if (existingItem.isPresent()) {
            MenuItem menuItem = existingItem.get();
            menuItem.setName(updatedItem.getName());
            menuItem.setDescription(updatedItem.getDescription());
            menuItem.setPrice(updatedItem.getPrice());
            menuItem.setImageUrl(updatedItem.getImageUrl());
            return menuItemRepository.save(menuItem);
        }
        return null;
    }

    public void deleteMenuItem(Long id) {
        menuItemRepository.deleteById(id);
    }
}
