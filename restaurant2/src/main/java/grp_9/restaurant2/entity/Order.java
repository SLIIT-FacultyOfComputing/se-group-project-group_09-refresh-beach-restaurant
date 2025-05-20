package grp_9.restaurant2.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "orders") // Optional: Customize table name
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String status;

    // Add other fields as needed, for example:
    // private String customerName;
    // private Double totalAmount;

    public Order() {
        // Default constructor
    }

    public Order(String status) {
        this.status = status;
    }

    // Getter and Setter for id
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    // Getter and Setter for status
    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    // Add getters and setters for any other fields you define
}
