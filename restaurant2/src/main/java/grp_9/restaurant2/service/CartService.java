package grp_9.restaurant2.service;

import grp_9.restaurant2.entity.CartItem;
import grp_9.restaurant2.entity.MenuItem;
import grp_9.restaurant2.repository.CartItemRepository;
import grp_9.restaurant2.repository.MenuItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class CartService {
    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private MenuItemRepository menuItemRepository;

    public List<CartItem> getAllCartItems() {
        return cartItemRepository.findAll();
    }

    public CartItem addToCart(Long menuItemId) {
        Optional<MenuItem> menuItemOptional = menuItemRepository.findById(menuItemId);
        if (menuItemOptional.isPresent()) {
            MenuItem menuItem = menuItemOptional.get();
            List<CartItem> existingItems = cartItemRepository.findByMenuItemId(menuItemId);
            if (!existingItems.isEmpty()) {
                CartItem existingCartItem = existingItems.get(0);
                existingCartItem.setQuantity(existingCartItem.getQuantity() + 1);
                return cartItemRepository.save(existingCartItem);
            } else {
                CartItem cartItem = new CartItem();
                cartItem.setMenuItem(menuItem);
                cartItem.setQuantity(1);
                return cartItemRepository.save(cartItem);
            }
        }
        throw new RuntimeException("Menu Item Not Found");
    }

    public void removeFromCart(Long cartItemId) {
        cartItemRepository.deleteById(cartItemId);
    }

    public void clearCart() {
        cartItemRepository.deleteAll();
    }
}

