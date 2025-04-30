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

    // ✅ Fetch all menu items
    public List<MenuItem> getAllMenuItems() {
        return menuItemRepository.findAll();
    }

    // ✅ Fetch a menu item by ID, throw an error if not found
    public MenuItem getMenuItemById(Long id) {
        return menuItemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Menu item not found with id: " + id));
    }

    // ✅ Save a new menu item to the database
    public MenuItem saveMenuItem(MenuItem menuItem) {
        return menuItemRepository.save(menuItem);
    }

    // ✅ Update an existing menu item
    public MenuItem updateMenuItem(Long id, MenuItem updatedItem) {
        return menuItemRepository.findById(id).map(menuItem -> {
            menuItem.setName(updatedItem.getName());
            menuItem.setDescription(updatedItem.getDescription());
            menuItem.setPrice(updatedItem.getPrice());
            menuItem.setImageUrl(updatedItem.getImageUrl());
            return menuItemRepository.save(menuItem);
        }).orElseThrow(() -> new RuntimeException("Menu item not found with id: " + id));
    }

    // ✅ Delete a menu item
    public void deleteMenuItem(Long id) {
        if (!menuItemRepository.existsById(id)) {
            throw new RuntimeException("Menu item not found with id: " + id);
        }
        menuItemRepository.deleteById(id);
    }
}
