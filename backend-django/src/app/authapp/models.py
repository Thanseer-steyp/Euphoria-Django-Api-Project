from django.db import models
from decimal import Decimal
from django.contrib.auth import get_user_model

class Category(models.Model):
    GENDER_CHOICES = [
        ('men', 'Men'),
        ('women', 'Women'),
    ]

    gender = models.CharField(max_length=10, choices=GENDER_CHOICES,default="men")
    name = models.CharField(max_length=100)
    image = models.ImageField(upload_to='category_images/')

    def __str__(self):
        return f"{self.name} - {self.gender.capitalize()}"


class Product(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='products')
    name = models.CharField(max_length=100)
    seller = models.CharField(max_length=100, default="Nike")
    price = models.DecimalField(max_digits=10, decimal_places=2, default=Decimal("99.00"))
    image = models.ImageField(upload_to='products-images/')
    rating = models.DecimalField(max_digits=5, decimal_places=1, default=Decimal("4.0"))
    sizes = models.ManyToManyField('Size')
    colors = models.ManyToManyField('Color')

    def __str__(self):
        return self.name


class Size(models.Model):
    name = models.CharField(max_length=30)
    value = models.CharField(max_length=5)

    def __str__(self):
        return self.name


class Color(models.Model):
    name = models.CharField(max_length=30)
    hex_code = models.CharField(max_length=7)

    def __str__(self):
        return self.name
    


User = get_user_model()

class Like(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey('Product', on_delete=models.CASCADE, related_name='likes')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'product')  # Prevent duplicate likes

    def __str__(self):
        return f"{self.user.username} liked {self.product.name}"


class Cart(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='carts')
    selected_size = models.CharField(max_length=20)
    selected_color = models.CharField(max_length=20)
    added_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ['user', 'product', 'selected_size', 'selected_color']


    def __str__(self):
        return f"{self.user.username} added to cart {self.product.name} ({self.selected_size}, {self.selected_color})"
