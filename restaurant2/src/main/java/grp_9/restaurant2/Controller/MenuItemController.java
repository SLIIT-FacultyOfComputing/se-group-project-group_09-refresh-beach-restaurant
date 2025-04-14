package grp_9.restaurant2.Controller;

import grp_9.restaurant2.entity.MenuItem;
import grp_9.restaurant2.service.MenuItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/menu")
@CrossOrigin(origins = "http://localhost:5174") // Allow frontend to access API
public class MenuItemController {
    @Autowired
    private MenuItemService menuItemService;

    // ✅ Fetch all menu items
    @GetMapping
    public List<MenuItem> getAllMenuItems() {
        return menuItemService.getAllMenuItems();
    }

    // ✅ Fetch a single menu item by ID
    @GetMapping("/{id}")
    public MenuItem getMenuItemById(@PathVariable Long id) {
        return menuItemService.getMenuItemById(id);
    }

    // ✅ Add a new menu item and save it in the database
    @PostMapping
    public MenuItem createMenuItem(@RequestBody MenuItem menuItem) {
        return menuItemService.saveMenuItem(menuItem);
    }

    // ✅ Update an existing menu item
    @PutMapping("/{id}")
    public MenuItem updateMenuItem(@PathVariable Long id, @RequestBody MenuItem menuItem) {
        return menuItemService.updateMenuItem(id, menuItem);
    }

    // ✅ Delete a menu item
    @DeleteMapping("/{id}")
    public void deleteMenuItem(@PathVariable Long id) {
        menuItemService.deleteMenuItem(id);
    }
}

