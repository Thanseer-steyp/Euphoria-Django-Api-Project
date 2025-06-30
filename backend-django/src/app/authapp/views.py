from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from .serializers import SignupSerializer, LoginSerializer
from .serializers import CategorySerializer,ProductSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model
from rest_framework.permissions import AllowAny
from .models import Category,Product,Like,Cart
from django.db.models import Q
from django.shortcuts import get_object_or_404
from .serializers import LikeSerializer,CartSerializer
from .serializers import CategoryWithProductsSerializer


class SignupView(APIView):
    def post(self, request):
        serializer = SignupSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()

            # Generate tokens for the new user
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            refresh_token = str(refresh)

            return Response({
                "msg": "User created successfully",
                "first_name": user.first_name,
                "access": access_token,
                "refresh": refresh_token
            }, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    


class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = authenticate(
                username=serializer.validated_data['username'],
                password=serializer.validated_data['password']
            )
            if user:
                refresh = RefreshToken.for_user(user)
                return Response({
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                    'user': {
                        'first_name': user.first_name,
                        'last_name': user.last_name
                    }
                })
            return Response({'error': 'Invalid Credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


User = get_user_model()

class UserListView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        users = User.objects.all().values('id', 'first_name', 'username', 'email')
        user_data = []

        for user in users:
            user_id = user['id']

            # Liked products
            liked_products = Product.objects.filter(likes__user_id=user_id).select_related('category')
            liked_list = [
                f"{i + 1}. {product.name} in {product.category.name} Category for {product.category.gender.capitalize()}"
                for i, product in enumerate(liked_products)
            ]

            # Carted products
            carted_products = Product.objects.filter(carts__user_id=user_id).select_related('category')
            carted_list = [
                f"{i + 1}. {product.name} in {product.category.name} Category for {product.category.gender.capitalize()}"
                for i, product in enumerate(carted_products)
            ]

            # Combine data
            user['liked_products'] = liked_list
            user['carted_products'] = carted_list

            user_data.append(user)

        return Response(user_data)






class CategoryListView(APIView):
    permission_classes = [AllowAny]  
    def get(self, request):
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)





class ProductListByCategory(APIView):
    permission_classes = [AllowAny]

    def get(self, request, cat_id):
        try:
            category = Category.objects.get(id=cat_id)
        except Category.DoesNotExist:
            return Response({"error": "Category not found"}, status=404)

        products = Product.objects.filter(category=category)
        serializer = ProductSerializer(products, many=True)

        number_map = {product.id: idx + 1 for idx, product in enumerate(products)}

        serializer = ProductSerializer(products, many=True, context={'number_map': number_map})

        return Response({
            "category_name": category.name,
            "gender_of_category": category.gender.capitalize(),
            "products": serializer.data
        })






class ProductDetailView(APIView):
    permission_classes = [AllowAny]
    def get(self, request, pk):
        try:
            product = Product.objects.get(pk=pk)
            serializer = ProductSerializer(product)
            return Response(serializer.data)
        except Product.DoesNotExist:
            return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)









class ProductLikeStatus(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, product_id):
        liked = Like.objects.filter(user=request.user, product_id=product_id).exists()
        return Response({'liked': liked})







class LikedProductsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        liked_products = [like.product for like in Like.objects.filter(user=user)]
        serializer = ProductSerializer(liked_products, many=True)
        return Response(serializer.data)




class ToggleLikeView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, product_id):
        user = request.user

        # Safely get the product, return 404 if not found
        product = get_object_or_404(Product, pk=product_id)

        like, created = Like.objects.get_or_create(user=user, product=product)
        if not created:
            like.delete()
            return Response({'liked': False})
        return Response({'liked': True})





class ToggleCartView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, product_id):
        user = request.user
        product = get_object_or_404(Product, pk=product_id)
        selected_size = request.data.get('selected_size')
        selected_color = request.data.get('selected_color')

        if not selected_size or not selected_color:
            return Response({'error': 'Size and color are required.'}, status=400)

        cart_item = Cart.objects.filter(
            user=user,
            product=product,
            selected_size=selected_size,
            selected_color=selected_color
        ).first()

        if cart_item:
            cart_item.delete()
            return Response({'in_cart': False})

        Cart.objects.create(
            user=user,
            product=product,
            selected_size=selected_size,
            selected_color=selected_color
        )
        return Response({'in_cart': True})




class CartedProductsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        cart_items = Cart.objects.filter(user=request.user)
        serializer = CartSerializer(cart_items, many=True)
        return Response(serializer.data)


class CartStatusView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, product_id):
        in_cart = Cart.objects.filter(user=request.user, product_id=product_id).exists()
        return Response({'in_cart': in_cart})










# views.py
class GenderWiseProductView(APIView):
    permission_classes = [AllowAny]

    def get_view_name(self):
        return "Project Data Structure Api"

    def get(self, request):
        genders = Category.objects.values_list('gender', flat=True).distinct()
        response_data = []

        for gender in genders:
            categories = Category.objects.filter(gender=gender).prefetch_related('products')
            serializer = CategoryWithProductsSerializer(categories, many=True)
            response_data.append({
                "gender": gender.capitalize(),
                "categories": serializer.data
            })

        return Response(response_data)






class ProductSearchAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        query = request.GET.get('q', '')
        if query:
            products = Product.objects.filter(Q(name__icontains=query)).distinct()
        else:
            products = Product.objects.none()

        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)