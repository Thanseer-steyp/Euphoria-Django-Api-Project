from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Category,Product,Like,Cart
User = get_user_model()

class SignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()




class ProductNameWithSerialSerializer(serializers.Serializer):
    serial_no = serializers.IntegerField()
    name = serializers.CharField()

class CategorySerializer(serializers.ModelSerializer):
    image = serializers.ImageField(read_only=True)
    products = serializers.SerializerMethodField()
    no_of_products = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = ['id', 'name','gender', 'image', 'no_of_products', 'products']

    def get_products(self, obj):
        products = obj.products.all()
        return [f"{i + 1}. {product.name}" for i, product in enumerate(products)]

    def get_no_of_products(self, obj):
        return obj.products.count()


class ProductSerializer(serializers.ModelSerializer):
    category = serializers.CharField(source='category.name')
    likes_count = serializers.IntegerField(source='likes.count', read_only=True)
    carted_count = serializers.IntegerField(source='carts.count', read_only=True)
    sizes = serializers.SerializerMethodField()
    colors = serializers.SerializerMethodField()
    gender = serializers.CharField(source='category.gender', read_only=True)
    number = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            'number','id', 'name', 'category', 'gender', 'seller', 'price', 'rating',
            'image', 'likes_count', 'carted_count', 'sizes', 'colors'
        ]
    
    def get_sizes(self, obj):
        return [size.value for size in obj.sizes.all()]

    def get_colors(self, obj):
        return [color.name for color in obj.colors.all()]

    def get_number(self, obj):
        number_map = self.context.get('number_map', {})
        return number_map.get(obj.id)
        





class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = ['id', 'user', 'product']



class CartSerializer(serializers.ModelSerializer):
    product = ProductSerializer()  # Nested product data

    class Meta:
        model = Cart
        fields = ['id', 'product', 'selected_size', 'selected_color']








# serializers.py

class CategoryWithProductsSerializer(serializers.ModelSerializer):
    no_of_products = serializers.SerializerMethodField()
    products = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = ['id', 'name', 'no_of_products', 'products']

    def get_no_of_products(self, obj):
        return obj.products.count()

    def get_products(self, obj):
        products = obj.products.all()
        # Create serial number mapping: {product.id: serial_no}
        number_map = {product.id: index + 1 for index, product in enumerate(products)}
        serializer = ProductSerializer(products, many=True, context={'number_map': number_map})
        return serializer.data



class GenderCategoryProductSerializer(serializers.Serializer):
    gender = serializers.CharField()
    categories = CategoryWithProductsSerializer(many=True)
