package restaurant2.demo2.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import restaurant2.demo2.entity.CartItem;
import restaurant2.demo2.service.CartService;

import java.util.List;

@RestController
@RequestMapping("/cart")
@CrossOrigin(origins = "*") // Allow frontend access
public class CartController {
    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    // Get all cart items
    @GetMapping
    public List<CartItem> getCartItems() {
        return cartService.getAllCartItems();
    }

    // Add item to cart
    @PostMapping
    public ResponseEntity<CartItem> addToCart(@RequestBody CartItem item) {
        return ResponseEntity.ok(cartService.addCartItem(item));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> removeFromCart(@PathVariable Long id) {
        cartService.removeCartItem(id);
        return ResponseEntity.ok("Item removed from cart.");
    }

    // Checkout (clear cart & notify frontend)
    @PostMapping("/checkout")
    public ResponseEntity<String> proceedToCheckout() {
        cartService.clearCart();
        return ResponseEntity.ok("Order placed successfully!");
    }
}


